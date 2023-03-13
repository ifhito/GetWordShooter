import GameElement from "../GameElement";
interface OwnFighter {
  x: number;
  y: number;
  width: number;
  height: number;
  hp: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}
class OwnFighter extends GameElement implements OwnFighter {
  constructor(x, y, width, height, hp, canvas) {
    super(Math.random());
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hp = hp;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }
  create() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
  }
  remove() {
    return false;
  }
  move() {
    this.create();
  }
  onMove(e) {
    const offsetX = this.canvas.getBoundingClientRect().left;
    const offsetY = this.canvas.getBoundingClientRect().top;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    this.x = x;
    this.y = y;
  }
}

export default OwnFighter;
