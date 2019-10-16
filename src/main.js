import SpaceShip from "/src/spaceShip";
import InputHandler from "/src/input";
import Projectile from "/src/projectile";
import Enemy from "/src/enemy";

// create canvas
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

// game constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// game variables
let spaceShip;
let startingGameTime;
let shootingAllowed = true;
let paused = false;
let enemySpawnInterval = 2000;
let timeToSpawnNextEnemy = 2000;
let reloadTime = 300;
let playerScore = 0;
let projectileList = [];
let enemyList = [];
let keysPressed = {};

// triggers game start
startGame();
// start the game
function startGame() {
  spaceShip = new SpaceShip(GAME_WIDTH, GAME_HEIGHT);
  new InputHandler(spaceShip, keysPressed, pauseGame, currentlyPaused);

  gameLoop();
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
      if (checkForCollisionWithEnemy(projectileList[i])) {
        projectileList.splice(i, 1);
        i--;
        continue;
      }

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
    if (projectileY + projectile.height > enemyY && projectileY < enemyY + enemyList[i].height) {
      let enemyX = enemyList[i].position.x;
      let projectileX = projectile.position.x;
      if (projectileX + projectile.width > enemyX && projectileX < enemyX + enemyList[i].width) {
        // if a collision is detected, lower that enemies health by 1
        enemyList[i].takeDamage();
        // after health is lowered, check if that enemy is out of health,
        // if they are remove them from the enemy array and player gets points
        if (enemyList[i].healthPoints === 0) {
          playerScore += enemyList[i].pointsForKilling;
          console.log(playerScore);
          enemyList.splice(i, 1);
        }
        return true;
      }
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
        i--;
        continue;
      }

      enemyList[i].draw(ctx);
      enemyList[i].update();
    }
  }
}

// bullet creation
let shootProjectile = () => {
  projectileList.push(new Projectile(spaceShip));
};

// Everytime gameloop runs it will check if enough time has ellapsed to spawn the next enemy
let maybeSpawnEnemy = (currentTime, startingGameTime) => {
  if (!paused) {
    if (currentTime - startingGameTime > timeToSpawnNextEnemy) {
      spawnEnemy();
      timeToSpawnNextEnemy = currentTime + enemySpawnInterval;
    }
  }
};

// add enemy to enemies list to spawn new enemy
let spawnEnemy = () => {
  enemyList.push(new Enemy(GAME_WIDTH, GAME_HEIGHT));
};

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
    maybeSpawnEnemy(timestamp, startingGameTime);
  }
  // clear canvas between every render

  // don't do any of normal updates if game is currently paused
  if (!paused) {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // handle spaceShip updates
    spaceShip.draw(ctx);
    spaceShip.update();

    // handle bullet updates
    handleBullets();

    // handle enemy updates
    handleEnemies();
  }

  requestAnimationFrame(gameLoop);
}
