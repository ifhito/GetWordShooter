import Bullet from "./Bullet/Bullet";
import MachinGunBullet from "./Bullet/patterns/MachineGunBullet";

interface Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  elements: any;
}
class Canvas implements Canvas {
  constructor() {
    this.canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.elements = {};
  }
  draw() {
    console.log(this.ctx);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log(this.ctx);
    Object.keys(this.elements).forEach((key) => {
      this.elements[key].move(this.ctx);
      this.clear(this.elements[key]);
    });
  }
  clear(element: any) {
    element.remove(this.elements);
  }
  push(element: any) {
    this.elements[element.hash] = element;
  }
  run() {
    const MachinGun = new MachinGunBullet(this.canvas);
    this.push(MachinGun);
    // this.draw();
    setInterval(this.draw.bind(this), 1);
  }
}
// const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
// const ctx = canvas.getContext("2d");
// const MachinGun = new MachinGunBullet(canvas);

// function draw() {
//   console.log(ctx);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   MachinGun.create(ctx);
//   MachinGun.move();
// }

const can = new Canvas();
console.log(can.ctx);
can.run();
