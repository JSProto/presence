// @flow

interface Robot {
  setMouseDelay: (delay: number) => void;
  mouseClick: (button?: string, double?: boolean) => void;

  setKeyboardDelay: (ms: number) => void;
  keyTap: (key: string, modifier?: string | string[]) => void;
  keyToggle: (key: string, down: string, modifier?: string | string[]) => void;
  typeString: (string: string) => void;
  typeStringDelayed: (string: string, cpm: number) => void;
  setMouseDelay: (delay: number) => void;
  moveMouse: (x: number, y: number) => void;
  moveMouseSmooth: (x: number, y: number) => void;
  mouseClick: (button?: string, double?: boolean) => void;
  mouseToggle: (down?: string, button?: string) => void;
  dragMouse: (x: number, y: number) => void;
  scrollMouse: (x: number, y: number) => void;
  getMousePos: () => { x: number, y: number };
  getPixelColor: (x: number, y: number) => string;
  getScreenSize: () => { width: number, height: number };
}

const robot: Robot = require('robotjs');

robot.setMouseDelay(2);

const delay = (ms?: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

const job = (ms?: number) =>
  async function _(fn: () => void) {
    await fn();
    await delay(ms);
    _(fn);
  };

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
