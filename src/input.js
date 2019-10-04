export default class InputHandler {
  constructor(spaceShip, keysPressed) {
    document.addEventListener("keydown", event => {
      switch (event.code) {
        case "Space":
          // so you can move while you shoot
          keysPressed[event.code] = event.type === "keydown";
          break;
        case "ArrowLeft":
          spaceShip.moveLeft();
          break;
        case "ArrowRight":
          spaceShip.moveRight();
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
