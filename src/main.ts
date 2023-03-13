import Bullet from "./Bullet/Bullet";
import MachinGunBullet from "./Bullet/patterns/MachineGunBullet";
import EnemyController from "./Enemy/EnemyController";
import OwnFighter from "./OwnFighter/OwnFighter";

interface Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  enemyController: EnemyController;
  elements: any;
}
class Canvas implements Canvas {
  constructor() {
    this.canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.enemyController = new EnemyController(this);
    this.elements = {};
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    Object.keys(this.elements).forEach((key) => {
      this.elements[key].move();
      this.clear(this.elements[key]);
    });
  }
  clear(element: any) {
    if (element.remove()) delete this.elements[element.hash];
  }
  push(element: any) {
    this.elements[element.hash] = element;
  }
  run() {
    const MachinGun = new MachinGunBullet(this.canvas);
    this.push(MachinGun);
    this.enemyController.addEnemy();
    const ownFighter = new OwnFighter(20, -5, 20, 20, 200, this.canvas);
    this.elements[ownFighter.hash] = ownFighter;
    can.canvas.addEventListener(
      "mousemove",
      ownFighter.onMove.bind(ownFighter),
      false
    );
    // this.draw();
    setInterval(this.draw.bind(this), 10);
  }
}
const can = new Canvas();
console.log(can.ctx);
can.run();
