export default class Star {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.radius = Math.floor(Math.random() * 4);
    this.initialX = Math.floor(Math.random() * (gameWidth - this.radius));
    this.initialY = Math.floor(Math.random() * (gameHeight - this.radius));
    this.verticalVelocity = 2;

    this.position = {
      x: this.initialX,
      y: this.initialY
    };
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }

  update() {
    if (this.position.y < 0) {
      this.position.y = this.gameHeight;
    } else {
      this.position.y -= this.verticalVelocity;
    }
  }
}
