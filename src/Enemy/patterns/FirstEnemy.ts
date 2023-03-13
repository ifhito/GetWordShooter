import Enemy from "../Enemy";
class FirstEnemy extends Enemy {
  constructor(x, y, width, height, hp, canvas) {
    super(x, y, width, height, hp, canvas);
  }
  create() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
  }
  outOfRange() {
    if (this.canvas.width - this.width / 2 < this.x) return true;
    if (this.x < -this.width / 2) return true;
    if (this.canvas.height - this.height / 2 < this.y) return true;
    if (this.y < -this.height / 2) return true;
    return false;
  }
  // 動かす
  move() {
    this.create();
    this.y += 1;
  }
}

export default FirstEnemy;
