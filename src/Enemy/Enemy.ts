interface Enemy {
  width: number;
  height: number;
  hp: number;
}

class Enemy implements Enemy {
  constructor(width, height, hp) {
    this.width = width;
    this.height = height;
    this.hp = hp;
  }
  // 作成
  create(ctx, canvas) {}
  // 動かす
  move(ctx, canvas) {}
  // 消す
  clear(ctx, canvas) {}
  // 当たる
  hit(ctx, canvas) {}
}
