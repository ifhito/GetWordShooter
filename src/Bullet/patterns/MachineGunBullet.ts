import Bullet from "../Bullet";

class MachinGunBullet extends Bullet {
  constructor(canvas) {
    const ballRadius = 10;
    const x = canvas.width / 2;
    const y = canvas.height - 30;
    super(x, y, ballRadius, "#000112", 5, 10, canvas);
  }
  // 作成
  create() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    console.log(this.x);
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.fill();
    this.ctx.closePath();
  }
  outOfRange() {
    if (this.canvas.width - this.ballRadius < this.x) return true;
    if (this.x < -this.ballRadius) return true;
    if (this.canvas.height - this.ballRadius < this.y) return true;
    if (this.y < -this.ballRadius) return true;
    return false;
  }
  // 動かす
  move() {
    this.create();
    this.x += 1;
    this.y -= 1;
  }
}

export default MachinGunBullet;
