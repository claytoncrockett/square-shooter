// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/spaceShip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SpaceShip =
/*#__PURE__*/
function () {
  function SpaceShip(gameWidth, gameHeight, paused) {
    _classCallCheck(this, SpaceShip);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 70;
    this.height = 20;
    this.xSpeed = 7;
    this.initialX = gameWidth / 2 - this.width / 2;
    this.initialY = gameHeight - this.height - 10;
    this.horizontalVelocity = 0;
    this.position = {
      x: this.initialX,
      y: this.initialY
    };
  }

  _createClass(SpaceShip, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "#00f";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      if (this.position.x > 0) {
        this.horizontalVelocity = -this.xSpeed;
      }
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      if (this.position.x < this.gameWidth - this.width) {
        this.horizontalVelocity = this.xSpeed;
      }
    }
  }, {
    key: "resetPosition",
    value: function resetPosition() {
      this.position = {
        x: this.initialX,
        y: this.initialY
      };
      this.horizontalVelocity = 0;
    }
  }, {
    key: "update",
    value: function update() {
      this.position.x += this.horizontalVelocity;
      if (this.position.x < 0 || this.position.x > this.gameWidth - this.width) this.horizontalVelocity = 0;
    }
  }]);

  return SpaceShip;
}();

exports.default = SpaceShip;
},{}],"src/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputHandler = function InputHandler(spaceShip, keysPressed, pauseGame, currentlyPaused) {
  _classCallCheck(this, InputHandler);

  document.addEventListener("keydown", function (event) {
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
  document.addEventListener("keyup", function (event) {
    switch (event.code) {
      case "Space":
        keysPressed[event.code] = event.type === "keydown";
        break;

      default:
        break;
    }
  });
};

exports.default = InputHandler;
},{}],"src/projectile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Projectile =
/*#__PURE__*/
function () {
  function Projectile(spaceShip) {
    _classCallCheck(this, Projectile);

    this.width = 10;
    this.height = 10;
    this.initialX = spaceShip.position.x + spaceShip.width / 2 - this.width / 2;
    this.initialY = spaceShip.position.y - this.height / 2;
    this.velocity = 4;
    this.position = {
      x: this.initialX,
      y: this.initialY
    };
  }

  _createClass(Projectile, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "#b3194a";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update() {
      this.position.y -= this.velocity;
    }
  }]);

  return Projectile;
}();

exports.default = Projectile;
},{}],"src/enemy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Enemy =
/*#__PURE__*/
function () {
  function Enemy(gameWidth, gameHeight) {
    _classCallCheck(this, Enemy);

    this.width = 60;
    this.height = 60; // spawn enemy in random x position above the screen

    this.initialX = Math.random() * (gameWidth - this.width);
    this.initialY = -20;
    this.healthPoints = 3;
    this.pointsForKilling = 5;
    this.currentColor = "#32CD32";
    this.velocity = 1;
    this.position = {
      x: this.initialX,
      y: this.initialY
    };
  } // fire everytime enemy is supposed to take damage,
  // for base enemy this will change their color depending on current health


  _createClass(Enemy, [{
    key: "takeDamage",
    value: function takeDamage() {
      this.healthPoints--;

      if (this.healthPoints < 2) {
        this.currentColor = "#ff0000";
      } else if (this.healthPoints < 3) {
        this.currentColor = "#ffff00";
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.currentColor;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update() {
      this.position.y += this.velocity;
    }
  }]);

  return Enemy;
}();

exports.default = Enemy;
},{}],"src/score.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Score =
/*#__PURE__*/
function () {
  function Score(gameWidth) {
    _classCallCheck(this, Score);

    this.width = 100;
    this.height = 50;
    this.currentScore = 0;
    this.position = {
      x: gameWidth - this.width - gameWidth / 7,
      y: this.height
    };
  }

  _createClass(Score, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.font = "36px dank mono";
      ctx.fillStyle = "#0000ff";
      ctx.fillText("Score: ".concat(this.currentScore), this.position.x, this.position.y);
    }
  }, {
    key: "update",
    value: function update(playerScore) {
      this.currentScore = playerScore;
    }
  }]);

  return Score;
}();

exports.default = Score;
},{}],"src/powerup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PowerUp =
/*#__PURE__*/
function () {
  function PowerUp(gameWidth) {
    _classCallCheck(this, PowerUp);

    this.radius = 20;
    this.initialX = Math.random() * (gameWidth - this.radius);
    this.initialY = -20;
    this.healthPoints = 3;
    this.velocity = 1;
    this.position = {
      x: this.initialX,
      y: this.initialY
    };
  }

  _createClass(PowerUp, [{
    key: "takeDamage",
    value: function takeDamage() {
      this.healthPoints--;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#ff00a9";
      ctx.fill();
    }
  }, {
    key: "update",
    value: function update() {
      this.position.y += this.velocity;
    }
  }]);

  return PowerUp;
}();

exports.default = PowerUp;
},{}],"src/main.js":[function(require,module,exports) {
"use strict";

var _spaceShip = _interopRequireDefault(require("/src/spaceShip"));

var _input = _interopRequireDefault(require("/src/input"));

var _projectile = _interopRequireDefault(require("/src/projectile"));

var _enemy = _interopRequireDefault(require("/src/enemy"));

var _score = _interopRequireDefault(require("/src/score"));

var _powerup = _interopRequireDefault(require("/src/powerup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create canvas
var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d"); // game constants

var GAME_WIDTH = 800;
var GAME_HEIGHT = 600; // game variables

var spaceShip;
var startingGameTime;
var scoreBoard;
var shootingAllowed = true;
var paused = false;
var enemySpawnInterval = 2000;
var timeToSpawnNextEnemy = 2000;
var powerUpSpawnInterval = 15000;
var timeToSpawnNextPowerUp = 15000;
var reloadTime = 300;
var playerScore = 0;
var projectileList = [];
var powerUpList = [];
var enemyList = [];
var keysPressed = {}; // triggers game start

startGame(); // start the game

function startGame() {
  spaceShip = new _spaceShip.default(GAME_WIDTH, GAME_HEIGHT);
  scoreBoard = new _score.default(GAME_WIDTH);
  new _input.default(spaceShip, keysPressed, pauseGame, currentlyPaused);
  gameLoop();
} //function for handling rules around bullets


function handleBullets() {
  // Listen for if space key is held down instead of key down event
  // this solves a bug where shooting will stop when moving while holding space
  if (keysPressed["Space"]) {
    // only allow shots when reload time is finished
    if (shootingAllowed) {
      shootProjectile();
      shootingAllowed = false;
      setTimeout(function () {
        shootingAllowed = true;
      }, reloadTime);
    }
  }

  if (projectileList) {
    for (var i = 0; i < projectileList.length; i++) {
      // if collision with an enemy is detected, this projectile will be removed from
      // the projectileList to remove it from the game.
      if (checkForCollisionWithEnemy(projectileList[i])) {
        projectileList.splice(i, 1);
        i--;
        continue;
      } // this if statement is the memory cleanup of the bullet list
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
} // handling collision detection between projectile and enemy


function checkForCollisionWithEnemy(projectile) {
  for (var i = 0; i < enemyList.length; i++) {
    // check vertical values first, if there is no overlap there is no point in checking x values
    var enemyY = enemyList[i].position.y;
    var projectileY = projectile.position.y;

    if (projectileY + projectile.height > enemyY && projectileY < enemyY + enemyList[i].height) {
      var enemyX = enemyList[i].position.x;
      var projectileX = projectile.position.x;

      if (projectileX + projectile.width > enemyX && projectileX < enemyX + enemyList[i].width) {
        // if a collision is detected, lower that enemies health by 1
        enemyList[i].takeDamage(); // after health is lowered, check if that enemy is out of health,
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
} // function for handling rules around enemies


function handleEnemies() {
  if (enemyList) {
    // garbage collection process similar to bullets. When enemies leave the viewport they will be cleaned
    // up from memory
    for (var i = 0; i < enemyList.length; i++) {
      if (enemyList[i].position.y > GAME_HEIGHT) {
        enemyList.splice(i, 1);
        i--;
        continue;
      }

      enemyList[i].draw(ctx);
      enemyList[i].update();
    }
  }
} // all things powerups go here


function handlePowerups() {
  if (powerUpList) {
    for (var i = 0; i < powerUpList.length; i++) {
      // if player doesn't kill powerup before it leaves screen.. it's gone!
      if (powerUpList[i].position.y > GAME_HEIGHT) {
        powerUpList.splice(i, 1);
        i--;
        continue;
      }

      console.log(powerUpList[i]);
      powerUpList[i].draw(ctx);
      powerUpList[i].update();
    }
  }
} // bullet creation


var shootProjectile = function shootProjectile() {
  projectileList.push(new _projectile.default(spaceShip));
}; // Everytime gameloop runs it will check if enough time has ellapsed to spawn the next enemy


var maybeSpawnEnemy = function maybeSpawnEnemy(currentTime, startingGameTime) {
  if (!paused) {
    if (currentTime - startingGameTime > timeToSpawnNextEnemy) {
      spawnEnemy();
      timeToSpawnNextEnemy = currentTime + enemySpawnInterval;
    }
  }
}; // Check every game loop if it's time to spawn the next powerup


var maybeSpawnPowerUp = function maybeSpawnPowerUp(currentTime, startingGameTime) {
  if (!paused) {
    if (currentTime - startingGameTime > timeToSpawnNextPowerUp) {
      spawnPowerUp();
      timeToSpawnNextPowerUp = currentTime + powerUpSpawnInterval;
    }
  }
}; // add enemy to enemies list to spawn new enemy


var spawnEnemy = function spawnEnemy() {
  enemyList.push(new _enemy.default(GAME_WIDTH, GAME_HEIGHT));
}; // add powerup to list to spawn new powerup object


var spawnPowerUp = function spawnPowerUp() {
  powerUpList.push(new _powerup.default(GAME_WIDTH));
}; // call to toggle paused state


function pauseGame() {
  paused = !paused;
} // check if game is currently paused, use to give objects knowledge of pause state


function currentlyPaused() {
  return paused;
} // main game loop


function gameLoop(timestamp) {
  //when the game begins set the starting game time
  if (!startingGameTime) {
    startingGameTime = timestamp;
  } else {
    maybeSpawnEnemy(timestamp, startingGameTime);
    maybeSpawnPowerUp(timestamp, startingGameTime);
  } // clear canvas between every render
  // don't do any of normal updates if game is currently paused


  if (!paused) {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); // handle spaceShip updates

    spaceShip.draw(ctx);
    spaceShip.update(); // handle bullet updates

    handleBullets(); // handle enemy updates

    handleEnemies(); // handle powerups

    handlePowerups(); // canvas has no z index, to avoid using clipping methods, if score is drawn last it
    // will appear above the other objects passing through it

    scoreBoard.update(playerScore);
    scoreBoard.draw(ctx);
  }

  requestAnimationFrame(gameLoop);
}
},{"/src/spaceShip":"src/spaceShip.js","/src/input":"src/input.js","/src/projectile":"src/projectile.js","/src/enemy":"src/enemy.js","/src/score":"src/score.js","/src/powerup":"src/powerup.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58572" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map