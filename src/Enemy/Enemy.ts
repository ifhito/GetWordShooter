import GameElement from "../GameElement";
interface Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  hp: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

class Enemy extends GameElement implements Enemy {
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
  // 作成
  create() {}
  // 動かす
  move() {}
  // 当たる
  hit() {}
}

export default Enemy;
