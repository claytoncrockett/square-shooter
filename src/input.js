export default class InputHandler {
  constructor(spaceShip, keysPressed, pauseGame, currentlyPaused) {
    document.addEventListener("keydown", event => {
      switch (event.code) {
        case "Space":
          // so you can move while you shoot
          keysPressed[event.code] = event.type === "keydown";
          break;
        case "KeyA":
        case "ArrowLeft":
          if (!currentlyPaused()) spaceShip.moveLeft();
          break;
        case "KeyD":
        case "ArrowRight":
          if (!currentlyPaused()) spaceShip.moveRight();
          break;
        case "KeyP":
          pauseGame();
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.code) {
        case "Space":
          keysPressed[event.code] = event.type === "keydown";
          break;
        default:
          break;
      }
    });
  }
}
