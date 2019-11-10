import SpaceShip from "/src/spaceship/spaceShip";
import InputHandler from "/src/input/input";
import Projectile from "/src/projectiles/projectile";
import Enemy from "/src/enemies/enemy";
import Score from "/src/interface/score";
import PowerUp from "/src/powerups/powerup";
import GameClock from "/src/interface/gameClock";
import Star from "./stars/star";

// create canvas
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

// game constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const FASTEST_BASIC_ENEMY_SPAWN_RATE = 1000;

// game variables
let spaceShip;
let startingGameTime;
let scoreBoard;
let gameClock;
let shootingAllowed;
let paused;
let enemySpawnInterval;
let timeToSpawnNextEnemy;
let powerUpSpawnInterval;
let timeToSpawnNextPowerUp;
let reloadTime;
let starCount;
let playerScore;
let prevFrameGameClock;
let currentGameTime;
let projectileList;
let powerUpList;
let enemyList;
let keysPressed;
let stars;

// triggers game start
startGame();
// start the game
function startGame() {
  startingGameTime;
  shootingAllowed = true;
  paused = false;
  enemySpawnInterval = 5000;
  timeToSpawnNextEnemy = 3000;
  powerUpSpawnInterval = 30000;
  timeToSpawnNextPowerUp = 30000;
  reloadTime = 500;
  starCount = 75;
  playerScore = 0;
  prevFrameGameClock = 0;
  currentGameTime = 0;
  projectileList = [];
  powerUpList = [];
  enemyList = [];
  keysPressed = {};
  stars = [];
  spaceShip = new SpaceShip(GAME_WIDTH, GAME_HEIGHT, gameOver);
  scoreBoard = new Score(GAME_WIDTH);
  gameClock = new GameClock(GAME_WIDTH);
  new InputHandler(spaceShip, keysPressed, pauseGame, currentlyPaused);
  createStars();

  gameLoop();
}

function createStars() {
  // randomly spawn some number of stars at the beginning of the game. They will cycle in and out of screen reusing the same set number
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star(GAME_WIDTH, GAME_HEIGHT));
  }
}

function renderStars() {
  // handle star movement
  for (let i = 0; i < stars.length; i++) {
    stars[i].draw(ctx);
    stars[i].update();
  }
}

function handleMovement() {
  // Check to see if left/right keys are being held, if so fire functions to move left/right.
  // If nothing is held then slowly even out to 0
  if (!currentlyPaused() && (keysPressed["ArrowLeft"] || keysPressed["KeyA"]))
    spaceShip.moveLeft();

  if (!currentlyPaused() && (keysPressed["ArrowRight"] || keysPressed["KeyD"]))
    spaceShip.moveRight();

  if (
    !currentlyPaused() &&
    !(keysPressed["ArrowRight"] || keysPressed["KeyD"]) &&
    !(keysPressed["ArrowLeft"] || keysPressed["KeyA"])
  ) {
    spaceShip.stabilize();
  }
}

//function for handling rules around bullets
function handleBullets() {
  // Listen for if space key is held down instead of key down event
  // this solves a bug where shooting will stop when moving while holding space
  if (keysPressed["Space"]) {
    // only allow shots when reload time is finished
    if (shootingAllowed) {
      shootProjectile();
      shootingAllowed = false;
      setTimeout(() => {
        shootingAllowed = true;
      }, reloadTime);
    }
  }

  if (projectileList) {
    for (let i = 0; i < projectileList.length; i++) {
      // if collision with an enemy is detected, this projectile will be removed from
      // the projectileList to remove it from the game.
      let tempI = i;
      if (checkForCollisionWithEnemy(projectileList[i])) {
        projectileList.splice(i, 1);
        i--;
        continue;
      }
      if (powerUpList.length > 0) {
        for (let j = 0; j < powerUpList.length; j++) {
          if (
            checkForCollisionCircleSquare(powerUpList[0], projectileList[i])
          ) {
            powerUpList.splice(j, 1);
            reloadTime *= 0.5;
            projectileList.splice(i, 1);
            i--;
          }
        }
      }
      // this line handles a bug where sometimes a projectile can be spliced out of the
      // array without resetting the loop causing it to not exist below.
      if (tempI !== i) continue;

      // this if statement is the memory cleanup of the bullet list
      // whenever a bullet leaves the screen it will be cleaned up from arr
      if (projectileList[i].position.y < 0) {
        projectileList.splice(i, 1);
        i--;
        continue;
      }
      projectileList[i].draw(ctx);
      projectileList[i].update();
    }
  }
}

// handling collision detection between projectile and enemy
function checkForCollisionWithEnemy(projectile) {
  for (let i = 0; i < enemyList.length; i++) {
    // check vertical values first, if there is no overlap there is no point in checking x values
    let enemyY = enemyList[i].position.y;
    let projectileY = projectile.position.y;
    if (
      projectileY + projectile.height > enemyY &&
      projectileY < enemyY + enemyList[i].height
    ) {
      let enemyX = enemyList[i].position.x;
      let projectileX = projectile.position.x;
      if (
        projectileX + projectile.width > enemyX &&
        projectileX < enemyX + enemyList[i].width
      ) {
        // if a collision is detected, lower that enemies health by 1
        enemyList[i].takeDamage();
        // after health is lowered, check if that enemy is out of health,
        // if they are remove them from the enemy array and player gets points
        if (enemyList[i].healthPoints === 0) {
          playerScore += enemyList[i].pointsForKilling;
          enemyList.splice(i, 1);
        }
        return true;
      }
    }
  }
  return false;
}

// currently treating circle hitbox like a square, not doing the advanced math to look for hits on the arc
// this is still a TODO
function checkForCollisionCircleSquare(circle, square) {
  const squareTop = square.position.y;
  const squareBottom = squareTop + square.height;
  const circleCenterY = circle.position.y;
  const circleTop = circleCenterY - circle.radius;
  const circleBottom = circleCenterY + circle.radius;
  if (squareBottom > circleTop && squareTop < circleBottom) {
    const circleCenterX = circle.position.x;
    const circleLeft = circleCenterX - circle.radius;
    const circleRight = circleCenterX + circle.radius;
    const squareLeft = square.position.x;
    const squareRight = square.position.x + square.width;
    if (squareLeft < circleRight && squareRight > circleLeft) {
      return true;
    }
  }
  return false;
}

// function for handling rules around enemies
function handleEnemies() {
  if (enemyList) {
    // garbage collection process similar to bullets. When enemies leave the viewport they will be cleaned
    // up from memory
    for (let i = 0; i < enemyList.length; i++) {
      if (enemyList[i].position.y > GAME_HEIGHT) {
        enemyList.splice(i, 1);
        spaceShip.takeDamage();
        i--;
        continue;
      }

      enemyList[i].draw(ctx);
      enemyList[i].update();
    }
  }
}

// all things powerups go here
function handlePowerups() {
  if (powerUpList) {
    for (let i = 0; i < powerUpList.length; i++) {
      // if player doesn't kill powerup before it leaves screen.. it's gone!
      if (powerUpList[i].position.y > GAME_HEIGHT) {
        powerUpList.splice(i, 1);
        i--;
        continue;
      }

      powerUpList[i].draw(ctx);
      powerUpList[i].update();
    }
  }
}

// bullet creation
let shootProjectile = () => {
  projectileList.push(new Projectile(spaceShip));
};

// Everytime gameloop runs it will check if enough time has ellapsed to spawn the next enemy
let maybeSpawnEnemy = () => {
  if (!paused) {
    if (currentGameTime > timeToSpawnNextEnemy) {
      spawnEnemy();
      timeToSpawnNextEnemy = currentGameTime + enemySpawnInterval;
      // slightly spawn enemies faster every time up to a limit
      if (enemySpawnInterval > FASTEST_BASIC_ENEMY_SPAWN_RATE) {
        enemySpawnInterval *= 0.95;
      }
    }
  }
};

// Check every game loop if it's time to spawn the next powerup
let maybeSpawnPowerUp = () => {
  if (!paused) {
    if (currentGameTime > timeToSpawnNextPowerUp) {
      spawnPowerUp();
      timeToSpawnNextPowerUp = currentGameTime + powerUpSpawnInterval;
    }
  }
};

// add enemy to enemies list to spawn new enemy
let spawnEnemy = () => {
  enemyList.push(new Enemy(GAME_WIDTH, GAME_HEIGHT));
};

// add powerup to list to spawn new powerup object
let spawnPowerUp = () => {
  powerUpList.push(new PowerUp(GAME_WIDTH));
};

// trigger when game ending condition happens
function gameOver() {
  startGame();
}

// call to toggle paused state
function pauseGame() {
  paused = !paused;
}

// check if game is currently paused, use to give objects knowledge of pause state
function currentlyPaused() {
  return paused;
}

// main game loop
function gameLoop(timestamp) {
  //when the game begins set the starting game time
  if (!startingGameTime) {
    startingGameTime = timestamp;
  } else {
    maybeSpawnEnemy();
    maybeSpawnPowerUp();
  }

  // Cap the game at 60 fps. If it hasn't been long enough then don't request the next frame.
  // This solves an issue where a fast PC plays the game at ludicrous speed
  timestamp = Math.floor(timestamp);
  if (timestamp - prevFrameGameClock < 1000 / 60) {
    requestAnimationFrame(gameLoop);
    return;
  }

  // don't do any of normal updates if game is currently paused
  if (!paused) {
    // clear canvas between every render
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    if (timestamp) currentGameTime += timestamp - prevFrameGameClock;

    // background color
    ctx.fillStyle = "#001f3f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // stars background
    renderStars();

    // handle spaceShip updates
    handleMovement();
    spaceShip.draw(ctx);
    spaceShip.update();

    // handle bullet updates
    handleBullets();

    // handle enemy updates
    handleEnemies();

    // handle powerups
    handlePowerups();

    // canvas has no z index, to avoid using clipping methods, if score is drawn last it
    // will appear above the other objects passing through it
    scoreBoard.update(playerScore);
    scoreBoard.draw(ctx);

    // update game clock, also put this below enemies/projectiles and things so it
    // basically has the highest z index
    gameClock.update(currentGameTime);
    gameClock.draw(ctx);
  }
  if (timestamp) prevFrameGameClock = timestamp;
  requestAnimationFrame(gameLoop);
}
