// @flow

const robot = require('robotjs');

let count = 1;
const delay = 55; // seconds
const between = (from, to) => {
    const hour = (new Date).getHours();
    const valid = hour > from && hour < to;
    console.log('timestamp[%d]: %s %s', ++count, valid, Date.now());
    return valid;
}


const wait = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const job = ms =>
    async function _(fn) {
        await fn();
        await wait(ms);
        _(fn);
    };

const run = job(delay * 1000);
run(() => between(10, 18) && robot.mouseClick());

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