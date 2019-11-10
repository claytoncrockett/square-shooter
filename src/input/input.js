export default class InputHandler {
  constructor(spaceShip, keysPressed, pauseGame, currentlyPaused) {
    document.addEventListener("keydown", event => {
      // This method of tracking which keys are currently held down allows firing multiple inputs at once.
      // i.e. moving right while shooting.
      switch (event.code) {
        case "Space":
          // so you can move while you shoot
          keysPressed[event.code] = event.type === "keydown";
          break;
        case "KeyA":
        case "ArrowLeft":
          keysPressed[event.code] = event.type === "keydown";
          break;
        case "KeyD":
        case "ArrowRight":
          keysPressed[event.code] = event.type === "keydown";
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
          // so you can move while you shoot
          keysPressed[event.code] = event.type === "keydown";
          break;
        case "KeyA":
        case "ArrowLeft":
          keysPressed[event.code] = event.type === "keydown";
          break;
        case "KeyD":
        case "ArrowRight":
          keysPressed[event.code] = event.type === "keydown";
          break;
        default:
          break;
      }
    });
  }
}
