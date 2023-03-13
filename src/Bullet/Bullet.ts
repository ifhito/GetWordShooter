interface Bullet {
  x: number;
  y: number;
  ballRadius: number;
  fillStyle: string;
  speed: number;
  damage: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}
import GameElement from "../GameElement";
class Bullet extends GameElement implements Bullet {
  constructor(x, y, ballRadius, fillStyle, speed, damage, canvas) {
    super(Math.random());
    this.x = x;
    this.y = y;
    this.ballRadius = ballRadius;
    this.fillStyle = fillStyle;
    this.speed = speed;
    this.damage = damage;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }
  // 作成
  create() {}
  // 動かす
  move() {}
  // 当たる
  hit() {}
}

export default Bullet;
