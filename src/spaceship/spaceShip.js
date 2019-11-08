// import spaceShipSprite from "./spaceShipSprite";

export default class SpaceShip {
  constructor(gameWidth, gameHeight, gameOver) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameOver = gameOver;
    this.image = document.getElementById("spaceShipSprite");
    this.width = 66;
    this.height = 60;
    this.xSpeed = 10;
    this.initialX = gameWidth / 2 - this.width / 2;
    this.initialY = gameHeight - this.height - 10;
    this.horizontalVelocity = 0;
    this.health = 3;
    this.frameIndex = 0;
    this.numberOfFrames = 5;

    this.position = {
      x: this.initialX,
      y: this.initialY
    };
  }

  draw(ctx) {
    const {
      width,
      height,
      position: { x, y },
      numberOfFrames,
      frameIndex,
      image
    } = this;
    // ctx.fillStyle = "#00f";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.drawImage(
      image,
      width * frameIndex,
      0,
      width,
      height,
      x,
      y,
      width,
      height
    );
  }

  moveLeft() {
    if (this.position.x > 0) {
      this.horizontalVelocity = -this.xSpeed;
    }
    if (this.frameIndex > 0) {
      this.frameIndex--;
    }
  }
  moveRight() {
    if (this.position.x < this.gameWidth - this.width) {
      this.horizontalVelocity = this.xSpeed;
    }
    if (this.frameIndex < 4) {
      this.frameIndex++;
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
    if (this.position.x < 0 || this.position.x > this.gameWidth - this.width)
      this.horizontalVelocity = 0;
  }
}
