export default class PowerUp {
  constructor(gameWidth) {
    this.radius = 20;

    this.initialX = Math.random() * (gameWidth - this.radius);
    this.initialY = -20;
    this.healthPoints = 3;

    this.velocity = 1;
    this.position = {
      x: this.initialX,
      y: this.initialY
    };
  }

  takeDamage() {
    this.healthPoints--;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff00a9";
    ctx.fill();
  }

  update() {
    this.position.y += this.velocity;
  }
}
