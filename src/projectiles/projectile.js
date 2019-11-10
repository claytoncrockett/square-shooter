export default class Projectile {
  constructor(spaceShip) {
    this.width = 10;
    this.height = 10;
    this.initialX = spaceShip.position.x + spaceShip.width / 2 - this.width / 2;
    this.initialY = spaceShip.position.y - this.height / 2;
    this.velocity = 8;
    this.rotation = 0;

    this.position = {
      x: this.initialX,
      y: this.initialY
    };
  }

  draw(ctx) {
    // Save canvas state before rotating so we can revert after
    ctx.save();

    // Move canvas translation to be focused on square
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = "#b3194a";

    // Find top left corner of square from center, then draw square starting from there
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);

    // revert canvas state after rotation
    ctx.restore();
  }

  update() {
    this.position.y -= this.velocity;
    this.rotation += (8 * Math.PI) / 180;
  }
}
