interface GameElement {
  hash: any;
}

class GameElement implements GameElement {
  constructor(hash) {
    this.hash = hash;
  }
  outOfRange() {
    return true;
  }
  // 消す
  remove() {
    if (this.outOfRange()) return true;
    return false;
  }
}
export default GameElement;
