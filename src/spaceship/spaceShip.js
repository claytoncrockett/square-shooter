export default class SpaceShip {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.image = document.getElementById("spaceShipSprite");
    this.width = 66;
    this.height = 60;
    this.initialX = gameWidth / 2 - this.width / 2;
    this.initialY = gameHeight - this.height - 10;
    this.velocityX = 0;
    this.accelerationX = 0.35;
    this.frameIndex = 2;
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
      frameIndex,
      image
    } = this;

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
    // change velocity by acceleration
    if (this.position.x > 0) {
      this.velocityX -= this.accelerationX;
    }
    // Move sprite sheet frame left to show left turning ship
    if (this.frameIndex > 0) {
      this.frameIndex--;
    }
  }
  moveRight() {
    // change velocity by acceleration
    if (this.position.x < this.gameWidth - this.width) {
      this.velocityX += this.accelerationX;
    }
    // Move sprite sheet right to show right turning ship
    if (this.frameIndex < 4) {
      this.frameIndex++;
    }
  }

  stabilize() {
    // If the user is not moving left or right, slow the ship to a stop
    if (
      this.velocityX > -this.accelerationX &&
      this.velocityX < this.accelerationX
    ) {
      this.velocityX = 0;
    } else if (this.velocityX <= this.accelerationX) {
      this.velocityX += this.accelerationX / 3;
    } else {
      this.velocityX -= this.accelerationX / 3;
    }
    if (this.frameIndex < 2) this.frameIndex++;
    else if (this.frameIndex > 2) this.frameIndex--;
  }


  resetPosition() {
    this.position = {
      x: this.initialX,
      y: this.initialY
    };
    this.velocityX = 0;
  }

  update() {
    this.position.x += this.velocityX;
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocityX = 0;
    } else if (this.position.x > this.gameWidth - this.width) {
      this.position.x = this.gameWidth - this.width;
      this.velocityX = 0;
    }
  }
}
