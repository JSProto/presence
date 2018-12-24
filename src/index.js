const robot = require("robotjs");

robot.setMouseDelay(2);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const job = ms => async function _(fn) {
    await fn();
    await delay(ms);
    _(fn);
}

const run = job(55 * 1000);
run(() => robot.mouseClick());


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

