import Bullet from "../Bullet";

class MachinGunBullet extends Bullet {
  constructor(canvas) {
    const ballRadius = 10;
    const x = canvas.width / 2;
    const y = canvas.height - 30;
    super(x, y, ballRadius, "#000112", 5, 10, canvas);
  }
}

export default MachinGunBullet;
