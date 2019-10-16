export default class Enemy {
  constructor(gameWidth, gameHeight) {
    this.width = 60;
    this.height = 60;
    // spawn enemy in random x position above the screen
    this.initialX = Math.random() * (gameWidth - this.width);
    this.initialY = -20;
    this.healthPoints = 3;
    this.pointsForKilling = 5;
    this.currentColor = "#32CD32";

    this.velocity = 1;

    this.position = {
      x: this.initialX,
      y: this.initialY
    };
  }

  takeDamage() {
    this.healthPoints--;
    if (this.healthPoints < 2) {
      this.currentColor = "#ff0000";
    } else if (this.healthPoints < 3) {
      this.currentColor = "#ffff00";
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.currentColor;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.y += this.velocity;
  }
}
