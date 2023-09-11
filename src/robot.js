/* eslint-disable no-return-assign */

const robot = require('robotjs');
const ioHook = require('iohook');

ioHook.start();

let lastUsageTime = Date.now();
ioHook.on('keydown', () => (lastUsageTime = Date.now()));
ioHook.on('mousemove', () => (lastUsageTime = Date.now()));

// ioHook.on('keydown', e => console.log(e));

const lastUsage = (min = 100, max = 900) => {
    const idleTime = (Date.now() - lastUsageTime) / 1000;
    const click = idleTime > min && idleTime < max;
    console.log('idle time:', idleTime, click);
    return click;
};

const betweenHours = (from, to) => {
    const hour = new Date().getHours();
    const valid = hour >= from && hour <= to;
    // console.log('timestamp: %s %s', valid, hour);
    return valid;
};

const wait = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const job = ms =>
    async function _(fn) {
        await fn();
        await wait(ms);
        _(fn);
    };

const run = job(55 * 1000);
run(() => betweenHours(9, 19) && lastUsage(55, 900 * 2) && robot.mouseClick());

const logger = job(10 * 1000);
logger(() => betweenHours(10, 16) && lastUsage(55, 900));

// class Mouse {
//     static async click(){
//         robot.mouseClick();
//     }
//     static async move(){

//         const {x, y} = robot.getMousePos();
//         const radius = 30; // радиус окружности

//         robot.mouseClick();

//         for (let angle = 0; angle < 6; angle += 0.1) {
//             let vx = Math.cos(angle) * radius;
//             let vy = Math.sin(angle) * radius;

//             robot.moveMouse(x + vx, y + vy);

//             await delay(5);
//         }
//     }
// }
