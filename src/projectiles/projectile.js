export default class Projectile {
  constructor(spaceShip) {
    this.width = 10;
    this.height = 10;
    this.initialX = spaceShip.position.x + spaceShip.width / 2 - this.width / 2;
    this.initialY = spaceShip.position.y - this.height / 2;
    this.velocity = 8;

    this.position = {
      x: this.initialX,
      y: this.initialY
    };
  }

  draw(ctx) {
    ctx.fillStyle = "#b3194a";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.y -= this.velocity;
  }
}
