export default class Score {
  constructor(gameWidth) {
    this.width = 100;
    this.height = 50;
    this.currentScore = 0;
    this.position = {
      x: gameWidth - this.width - gameWidth / 7,
      y: this.height
    };
  }

  draw(ctx) {
    ctx.font = "36px dank mono";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `Score: ${this.currentScore}`,
      this.position.x,
      this.position.y
    );
  }

  update(playerScore) {
    this.currentScore = playerScore;
  }
}
