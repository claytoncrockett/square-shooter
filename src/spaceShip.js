export default class SpaceShip {
  constructor(gameWidth, gameHeight, gameOver) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameOver = gameOver;
    this.width = 70;
    this.height = 20;
    this.xSpeed = 7;
    this.initialX = gameWidth / 2 - this.width / 2;
    this.initialY = gameHeight - this.height - 10;
    this.horizontalVelocity = 0;
    this.health = 3;

    this.position = {
      x: this.initialX,
      y: this.initialY
    };
  }

  draw(ctx) {
    ctx.fillStyle = "#00f";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    if (this.position.x > 0) {
      this.horizontalVelocity = -this.xSpeed;
    }
  }
  moveRight() {
    if (this.position.x < this.gameWidth - this.width) {
      this.horizontalVelocity = this.xSpeed;
    }
  }

  takeDamage() {
    this.health--;
    if (this.health === 0) this.gameOver();
  }

  resetPosition() {
    this.position = {
      x: this.initialX,
      y: this.initialY
    };
    this.horizontalVelocity = 0;
  }

  update() {
    this.position.x += this.horizontalVelocity;
    if (this.position.x < 0 || this.position.x > this.gameWidth - this.width) this.horizontalVelocity = 0;
  }
}
