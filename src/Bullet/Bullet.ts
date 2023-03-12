interface Bullet {
  width: number;
  height: number;
  ballRadius: number;
  fillStyle: string;
  speed: number;
  damage: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}
import GameElement from "../GameElement";
class Bullet extends GameElement implements Bullet {
  constructor(width, height, ballRadius, fillStyle, speed, damage, canvas) {
    super(Math.random());
    this.width = width;
    this.height = height;
    this.ballRadius = ballRadius;
    this.fillStyle = fillStyle;
    this.speed = speed;
    this.damage = damage;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }
  // 作成
  create() {
    this.ctx.beginPath();
    this.ctx.arc(this.width, this.height, this.ballRadius, 0, Math.PI * 2);
    console.log(this.width);
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fill();
    this.ctx.closePath();
  }
  // 動かす
  move() {
    this.create();
    this.width += 1;
    this.height -= 1;
  }
  outOfRange() {
    if (this.canvas.width - this.ballRadius < this.width) return true;
    if (this.width < -this.ballRadius) return true;
    if (this.canvas.height - this.ballRadius < this.height) return true;
    if (this.height < -this.ballRadius) return true;
    return false;
  }
  // 消す
  remove(elements) {
    if (this.outOfRange()) delete elements[this.hash];
  }
  // 当たる
  hit(ctx, canvas) {}
}

export default Bullet;
