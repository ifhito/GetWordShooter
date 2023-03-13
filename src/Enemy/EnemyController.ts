import FirstEnemy from "./patterns/FirstEnemy";
interface EnemyController {
  canvas: any;
}
class EnemyController implements EnemyController {
  constructor(canvas) {
    this.canvas = canvas;
  }
  addEnemy() {
    const enemy = new FirstEnemy(20, -5, 20, 20, 200, this.canvas.canvas);
    this.canvas.push(enemy);
  }
}

export default EnemyController;
