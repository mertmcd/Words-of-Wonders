import assetManager from "./assetManager";
import phaserPlusPlus from "./ppp.js";
// import button from "../utils/button";

if (![true].last) {
  Object.defineProperty(Array.prototype, "last", {
    get: function () {
      return this[this.length - 1];
    },
    set: function (e) {
      this[this.length - 1] = e;
    },
  });
}

if (![true, true].pairs) {
  Object.defineProperty(Array.prototype, "pairs", {
    value: function (func) {
      for (let i = 0; i < this.length - 1; i++) {
        for (let j = i; j < this.length - 1; j++) {
          func([this[i], this[j + 1]]);
        }
      }
    },
  });
}

if (![true].random) {
  Object.defineProperty(Array.prototype, "random", {
    get: function () {
      return this[Math.floor(Math.random() * this.length)];
    },
  });
}

let gameScene = {
  key: "game-scene",
  active: true,
  create: createGame,
  update: updateGame,
};
let uiScene = {
  key: "ui-scene",
  active: true,
  create: createUi,
};

let lastWidth, lastHeight, aspectRatio;
let currentWidth, currentHeight, squareness, isLandscape;
let currentTime, deltaTime;
let main, data;

let gameData = {};

/** @type {Phaser.Scene} */
let scene;
/** @type {Phaser.Scene} */
let ui;

function createGame() {
  this.input.on("pointerdown", function () {
    main.interacted();
  });

  if (scene) {
    gameData.isRestarted = true;
    startGame.call(this);
    return;
  } else {
    gameData.isRestarted = false;
  }

  main = app.main;
  data = app.data;

  lastWidth = main.lastWidth;
  lastHeight = main.lastHeight;

  scene = this;
  scene.lastWidth = lastWidth;
  scene.lastHeight = lastHeight;

  assetManager.loadAssets.call(this, main, () => {
    phaserPlusPlus.upgradePhaser();
    startGame.bind(this)();
  });

  main.game.events.on("gameresized", function (w, h) {
    resizeAll(w, h);
  });

  main.game.events.on("postresized", function (w, h) {});

  main.game.events.on("gamecontinue", function (w, h) {
    if (data.soundEnabled) {
      if (app.type != "mobvista") {
        window.Howler && window.Howler.mute(false);
      }
      main.game.soundOn = true;
    }
  });

  main.game.events.on("gamepaused", function (w, h) {
    if (data.soundEnabled) {
      if (app.type != "mobvista") {
        window.Howler && window.Howler.mute(true);
      }
      main.game.soundOn = false;
    }
  });

  scene.add.text(0, 0, "", {
    fontFamily: "ui_font_1",
  });
}

function startGame() {
  if (data.soundEnabled) {
    if (app.type != "mobvista") app.playMusic();
    main.game.soundOn = true;
  }

  ///////   C O D E     B E L O W   \\\\\\\

  // ADD SCREEN ELEMENTS

  let backGround = this.add.image(0, 0, "bg").setOrigin(0);

  backGround.onResizeCallback = function (w, h) {
    let scale = Math.max(w / this.width, h / this.height);
    this.setScale(scale);
  };

  let rect = this.add.rectangle(0, 0, 300, 100, 0x000000).setOrigin(0);

  rect.onResizeCallback = function (w, h) {
    let scale = Math.min(currentWidth / this.width, currentHeight / this.height);
    if (!isLandscape) this.setScale(scale, scale / 3);
    else this.setScale(scale, scale / 5);
  };

  let text = this.add
    .text(0, 0, "Can you find 4 words?", {
      fontFamily: "ui_font_1",
      fontSize: 100,
      color: "#ffffff",
      strokeThickness: 1.5,
      //stroke: htmlDarkGray,
    })
    .setOrigin(0.5);

  text.onResizeCallback = function () {
    let scale = Math.min(currentWidth / this.width, currentHeight / this.height);
    if (!isLandscape) {
      this.setScale(scale * 0.8);
      this.x = currentWidth / 2;
      this.y = this.height / 2;
    } else {
      this.setScale(scale * 0.5);
      this.x = currentWidth / 2;
      this.y = this.height / 2;
    }
  };

  let button = this.add.image(0, 0, "atlas", "install0");

  button.onResizeCallback = function () {
    let scale = currentWidth / this.width;
    this.setScale(scale);
    if (!isLandscape) {
      this.y = currentHeight / 1.05;
      this.x = currentWidth / 2;
    } else {
      this.y = currentHeight / 1.07;
      this.x = currentWidth / 1.35;
    }
  };

  let buttonText = this.add
    .text(0, 0, "Tap to Play!", {
      fontFamily: "ui_font_1",
      fontSize: 100,
      color: "#ffffff",
      strokeThickness: 1.5,
    })
    .setOrigin(0.5);

  buttonText.onResizeCallback = function () {
    let scale = Math.min((button.displayWidth * 0.6) / this.width, (button.displayHeight * 0.6) / this.height);
    if (!isLandscape) {
      this.setScale(scale);
      this.y = button.y;
      this.x = button.x;
    } else {
      this.setScale(scale);
      this.y = button.y;
      this.x = button.x;
    }
  };

  let tween = scene.tweens.add({
    targets: button,
    duration: 600,
    ease: "Linear",
    repeat: -1,
    onUpdate: function () {
      buttonText.onResizeCallback();
    },
    scaleX: {from: button.scaleX * 0.8, to: button.scaleX * 0.9},
    scaleY: {from: button.scaleY * 0.8, to: button.scaleY * 0.9},
    yoyo: true,
  });

  let scoreBoard = this.add.image(0, 0, "atlas", "extra_word");

  scoreBoard.onResizeCallback = function () {
    let scale = currentWidth / this.width;
    if (!isLandscape) {
      this.setScale(scale / 6);
      this.y = currentHeight / 1.15;
      this.x = backGround.x + this.displayWidth / 2;
    } else {
      this.setScale(scale / 10);
      this.y = currentHeight / 1.2;
      this.x = currentWidth - this.displayWidth / 2;
    }
  };

  let score = this.add
    .text(0, 0, "0", {
      fontFamily: "ui_font_1",
      fontSize: 100,
      color: "#000000",
      strokeThickness: 1.5,
    })
    .setOrigin(0.5);

  score.onResizeCallback = function () {
    let scale = scoreBoard.displayWidth / this.width;
    this.setScale(scale / 5);
    this.y = scoreBoard.y;
    this.x = scoreBoard.x + this.displayWidth / 2;
  };

  let circle = this.add.circle(0, 0, 1, 0x000000, 0.4);

  circle.onResizeCallback = function () {
    let scale = Math.min(currentWidth / this.width, currentHeight / this.height);
    this.setScale(scale * 0.6);
    if (!isLandscape) {
      this.y = currentHeight / 1.4;
      this.x = currentWidth / 2;
    } else {
      this.y = currentHeight / 1.8;
      this.x = currentWidth / 1.35;
    }
  };

  let board = this.add.rectangle(0, 0, 5, 4, "0x00000");
  board.setAlpha(0.5);

  board.onResizeCallback = function () {
    let scale = Math.min(currentWidth / this.width, currentHeight / this.height);

    if (!isLandscape) {
      this.setScale(scale * 0.8);
      this.y = currentHeight / 4;
      this.x = currentWidth / 2;
    } else {
      this.setScale(scale * 0.7);
      this.y = currentHeight / 1.8;
      this.x = currentWidth / 4;
    }
  };

  console.log(board);
  console.log(board.displayWidth);

  // let frames = this.add.image(0, 0, "atlas", "box");

  // frames.onResizeCallback = function () {
  //   let scale = currentWidth / this.width;
  //   this.setScale(scale / 6);
  //   this.y = currentHeight / 3;
  //   this.x = currentWidth / 3;
  // };
}

function updateGame(time, delta) {
  currentTime = time;
  deltaTime = delta;

  main.update();
}

function resizeAll(w, h) {
  lastWidth = w;
  lastHeight = h;

  scene.lastWidth = lastWidth;
  scene.lastHeight = lastHeight;

  currentWidth = w;
  currentHeight = h;

  scene.resizeWidth = w;
  scene.resizeHeight = h;
  ui.resizeWidth = w;
  ui.resizeHeight = h;

  aspectRatio = lastWidth / lastHeight;
  squareness = aspectRatio > 1 ? 1 / aspectRatio : aspectRatio;
  isLandscape = w > h;

  scene.aspectRatio = aspectRatio;
  scene.squareness = squareness;
  scene.isLandscape = isLandscape;
  ui.aspectRatio = aspectRatio;
  ui.squareness = squareness;
  ui.isLandscape = isLandscape;

  scene.resizeManager.resize(w, h);
  ui.resizeManager.resize(w, h);
}

function createUi() {
  ui = this;
}

function initTimer(callback) {
  if (data.gameTimeEnabled) {
    scene.time.delayedCall(data.gameTime * 1000, () => {
      if (!data.gameFinished) {
        data.gameFinished = true;
        callback && callback();
      }
    });
  }
}

function initClickTracker(callback) {
  if (data.clickCounterEnabled) {
    data.clicked = 0;
    scene.input.on("pointerdown", () => {
      data.clicked++;
      if (data.clicked >= data.clickCount) {
        if (!data.gameFinished) {
          data.gameFinished = true;
          callback && callback();
        }
      }
    });
  }
}

function endGame() {
  scene.time.delayedCall(200, () => {
    if (data.endCardFullScreenClick) {
      scene.input.on("pointerdown", main.gotoLink);
    }
  });

  scene.time.delayedCall(2000, () => {
    if (data.goToMarketDirectly) {
      main.gotoLink();
    }
  });
}

export {gameScene, uiScene};
