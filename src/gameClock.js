export default class GameClock {
  constructor() {
    this.width = 75;
    this.height = 40;
    this.currentTime = "0";
    this.position = {
      x: 20,
      y: this.height
    };
  }

  draw(ctx) {
    ctx.font = "28px dank mono";
    ctx.fillStyle = "#000000";
    ctx.fillText(`${this.currentTime}`, this.position.x, this.position.y);
  }

  update(gameTime) {
    // some doctoring to take milliseconds and turn them into a nice format to display to the user
    // will just make gameclock format the seconds and milliseconds - maybe will add minutes in future
    let gameTimeToDisplay = "";
    const numberArray = gameTime.toString().split("");
    for (let i = 0; i < numberArray.length - 1; i++) {
      if (i === numberArray.length - 3) gameTimeToDisplay += `.${numberArray[i]}`;
      else gameTimeToDisplay += numberArray[i];
    }
    this.currentTime = gameTimeToDisplay;
  }
}
