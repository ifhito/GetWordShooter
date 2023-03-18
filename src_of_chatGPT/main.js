// 既存のクラス定義（Player, Bullet, Enemy, Alphabet, Weapon, Game）

// DOMの準備ができたらゲームを初期化
document.addEventListener("DOMContentLoaded", init);


function init() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  const game = new Game(ctx);

  // キーイベントリスナーを追加
  window.addEventListener("keydown", game.handleKeyDown.bind(game));

  // ゲームループ開始
  requestAnimationFrame(game.gameLoop.bind(game));
}

class Renderer {
  constructor(canvasContext) {
    this.ctx = canvasContext;
  }

  clearCanvas(canvasWidth, canvasHeight) {
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  renderPlayer(player) {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(player.x, player.y, 10, 10);
  }

  renderBullets(bullets) {
    this.ctx.fillStyle = 'yellow';
    for (const bullet of bullets) {
      this.ctx.fillRect(bullet.x, bullet.y, 2, 5);
    }
  }

  renderEnemies(enemies) {
    this.ctx.fillStyle = 'red';
    for (const enemy of enemies) {
      this.ctx.fillRect(enemy.x, enemy.y, 20, 20);
    }
  }

  renderAlphabets(alphabets) {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    for (const alphabet of alphabets) {
      this.ctx.fillText(alphabet.char, alphabet.x, alphabet.y);
    }
  }

  renderCollectedAlphabets(collectedAlphabets) {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(collectedAlphabets, this.ctx.canvas.width - 10, this.ctx.canvas.height - 10);
  }

  renderPlayerHp(hp) {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`HP: ${hp}`, 10, this.ctx.canvas.height - 10);
  }

  renderCurrentWeapon(player) {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`Current Weapon: ${player.weapon ? player.weapon.name : "None"}`, 10, 30);
  }
}


class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.collectedAlphabets = "";
    this.weapon = new Weapon("Basic"); // デフォルトの武器を設定
    this.hp = 100000; // プレイヤーのHPを追加
  }

  move(direction) {
    this.x += direction;
  }

  shoot() {
    const bullet = new Bullet(this.x, this.y - 1);
    return bullet;
  }

  collectAlphabet(alphabet) {
    this.collectedAlphabets += alphabet.char; // 文字を追加
  }

  createWeapon(weaponName) {
    this.weapon = new Weapon(weaponName);
  }

  createWeapon(weaponFactory, weaponName) {
    this.weapon = weaponFactory.createWeapon(weaponName);
  }

  switchWeapon() {
    const collectedAlphabetsString = this.collectedAlphabets.join("").toUpperCase();
    if (collectedAlphabetsString.includes("R")) {
      this.createWeapon("Rapid Fire");
    } else if (collectedAlphabetsString.includes("G")) {
      this.createWeapon("Basic");
    } else if (collectedAlphabetsString.includes("L")) {
      this.createWeapon("Laser");
    }
  }

  removeWeapon() {
    this.weapon = null;
  }

  clearAlphabets() {
    this.collectedAlphabets = [];
  }

  removeLastAlphabet() {
    this.collectedAlphabets.pop();
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {
    this.y -= 1;
  }
}

class Enemy {
  constructor(x, y, health = 100) {
    this.x = x;
    this.y = y;
    this.health = health;
  }

  move() {
    this.y += 2;
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }

  destroy() {
    console.log("break!!")
  }
}

class Alphabet {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
  }

  move() {
    this.y += 1;
  }
}

class Weapon {
  constructor(name) {
    this.name = name;
    this.power = 10; // 仮の値
  }

  attack(enemy) {
    enemy.takeDamage(this.power);
  }
}
class RapidFireWeapon extends Weapon {
  constructor() {
    super("Rapid Fire", 5);
    this.fireRate = 0.1; // 連射速度 (秒ごとの発射間隔)
  }
  
  // 必要に応じて、連射速度などの固有のプロパティやメソッドを追加
}

class LaserWeapon extends Weapon {
  constructor() {
    super("Laser", 50);
    this.chargeTime = 3; // 充電時間 (秒)
  }
  
  // 必要に応じて、充電時間などの固有のプロパティやメソッドを追加
}
class WeaponFactory {
  constructor() {
    this.weaponMap = new Map();
  }

  register(weaponName, WeaponClass) {
    this.weaponMap.set(weaponName, WeaponClass);
  }

  createWeapon(weaponName) {
    const WeaponClass = this.weaponMap.get(weaponName) || Weapon;
    return new WeaponClass();
  }
}

class Game {
  constructor(canvasContext) {
    this.player = new Player(100, 500);
    this.renderer = new Renderer(canvasContext);
    this.bullets = [];
    this.enemies = [];
    this.alphabets = [];
    this.weaponFactory = new WeaponFactory();
    this.lastTimestamp = null;
    this.spawnEnemyTimer = 0; // タイマーの初期化
    this.spawnAlphabetTimer = 0; // タイマーの初期化
    this.enemySpawnInterval = 1000; // 1秒ごとに敵を生成
    this.alphabetSpawnInterval = 3000; // 3秒ごとにアルファベットを生成

    // 武器クラスを登録
    this.weaponFactory.register("Basic", Weapon);
    this.weaponFactory.register("Rapid Fire", RapidFireWeapon);
    this.weaponFactory.register("Laser", LaserWeapon);
  }

  spawnEnemy() {
    const x = Math.random() * (this.renderer.ctx.canvas.width - 20);
    const y = -20;
    const enemy = new Enemy(x, y);
    this.enemies.push(enemy);
  }

  spawnAlphabet() {
    const x = Math.random() * (this.renderer.ctx.canvas.width - 20);
    const y = -20;
    const char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const alphabet = new Alphabet(char, x, y);
    this.alphabets.push(alphabet);
  }

  update(deltaTime) {

    this.spawnEnemyTimer += deltaTime;
    this.spawnAlphabetTimer += deltaTime;
    if (this.spawnEnemyTimer >= this.enemySpawnInterval) {
      this.spawnEnemy();
      this.spawnEnemyTimer = 0;
    }

    if (this.spawnAlphabetTimer >= this.alphabetSpawnInterval) {
      this.spawnAlphabet();
      this.spawnAlphabetTimer = 0;
    }
    this.moveBullets();
    this.moveEnemies();
    this.moveAlphabets();
    this.checkCollisions();
  }

  moveBullets() {
    for (const bullet of this.bullets) {
      bullet.move();
    }
  }

  moveEnemies() {
    for (const enemy of this.enemies) {
      enemy.move();
    }
  }

  moveAlphabets() {
    for (const alphabet of this.alphabets) {
      alphabet.move();
    }
  }
  render() {
    const canvasWidth = this.renderer.ctx.canvas.width;
    const canvasHeight = this.renderer.ctx.canvas.height;

    this.renderer.clearCanvas(canvasWidth, canvasHeight);
    this.renderer.renderPlayer(this.player);
    this.renderer.renderBullets(this.bullets);
    this.renderer.renderEnemies(this.enemies);
    this.renderer.renderAlphabets(this.alphabets);
    this.renderer.renderCollectedAlphabets(this.player.collectedAlphabets); // 取得したアルファベットを描画
    this.renderer.renderPlayerHp(this.player.hp); // プレイヤーのHPを描画
    this.renderer.renderCurrentWeapon(this.player);
  }
  checkCollisions() {
    // 弾と敵の衝突判定を行い、衝突した場合は対象を配列から削除する
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const enemy = this.enemies[j];
        if (this.isColliding(bullet, enemy)) {
          this.player.weapon.attack(enemy);
          if (enemy.health <= 0) {
            this.enemies.splice(j, 1);
          }
          this.bullets.splice(i, 1);
          break;
        }
      }
    }

    // プレイヤーとアルファベットの衝突判定を行い、衝突した場合は対象を配列から削除しプレイヤーがアルファベットを収集する
    for (let i = this.alphabets.length - 1; i >= 0; i--) {
      const alphabet = this.alphabets[i];
      if (this.isColliding(this.player, alphabet)) {
        this.player.collectAlphabet(alphabet);
        this.alphabets.splice(i, 1);
      }
    }
  }

  isColliding(obj1, obj2) {
    // オブジェクト間の衝突判定を行うロジックを実装
    // 例えば、矩形の衝突判定を行う場合:
    const rect1 = { x: obj1.x, y: obj1.y, width: 10, height: 10 };
    const rect2 = { x: obj2.x, y: obj2.y, width: 10, height: 10 };

    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }
  gameLoop(timestamp) {
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
      requestAnimationFrame(this.gameLoop.bind(this));
      return;
    }

    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.gameLoop.bind(this));
  }
  createWeapon(weaponFactory, weaponName) {
    this.weapon = weaponFactory.createWeapon(weaponName);
  }
  handleKeyDown(e) {
    switch (e.key) {
      case "ArrowLeft":
        this.player.move(-5);
        break;
      case "ArrowRight":
        this.player.move(5);
        break;
      case " ":
        const bullet = this.player.shoot();
        this.bullets.push(bullet);
        break;
    }
  }
}
