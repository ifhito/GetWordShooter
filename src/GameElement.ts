interface GameElement {
  hash: any;
}

class GameElement implements GameElement {
  constructor(hash) {
    this.hash = hash;
  }
}
export default GameElement;
