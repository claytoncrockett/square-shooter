export default class Health {
  constructor(gameWidth, startingHealth, gameOver) {
    this.width = 100;
    this.height = 50;
    this.gameOver = gameOver;
    this.health = startingHealth;
    this.position = {
      x: gameWidth - this.width - gameWidth / 2,
      y: this.height
    };
  }

  draw(ctx) {
    ctx.font = "36px dank mono";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `Health: ${this.health}`,
      this.position.x,
      this.position.y
    );
  }

  update(playerHealth) {
    this.health = playerHealth;
  }

}
