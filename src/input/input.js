export default class InputHandler {
  constructor(keysPressed, pauseGame) {
    // TODO: figure out not attaching multiple event handlers if game starts over. Maybe
    // just put one on the window and dont add more.

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
      // This is the logic for removing each event from the keysPressed array. Will happen on
      // keyUp
      switch (event.code) {
        case "Space":
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
