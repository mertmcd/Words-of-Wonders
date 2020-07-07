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

let boxArray = [];
let boxData = [
  [0, 0, 1, 0, 1],
  [0, 1, 1, 1, 1],
  [0, 0, 1, 0, 1],
  [1, 1, 1, 0, 0],
];
let boardString = {
  startBox: [
    [0, 2],
    [1, 1],
    [3, 0],
    [0, 4],
  ],
  word: ["BEAT", "BETA", "BET", "BAT"],
  position: ["V", "H", "H", "V"],
};
let columns = boxData[0].length;
let rows = boxData.length;
let currentBox = [];
let letters = ["B", "E", "T", "A"];
let textLetters = [];
let puzzleText;
let letterCircle;
let colorCircle;
let hand;
let timeline;
let clickedLetters;

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

  // Adds background image

  let backGround = this.add.image(0, 0, "bg").setOrigin(0);

  backGround.onResizeCallback = function (w, h) {
    let scale = Math.max(w / this.width, h / this.height);
    this.setScale(scale);
  };

  // Adds header rectangle

  let rect = this.add.rectangle(0, 0, 300, 100, 0x000000).setOrigin(0);

  rect.onResizeCallback = function (w, h) {
    let scale = Math.min(currentWidth / this.width, currentHeight / this.height);
    if (!isLandscape) this.setScale(scale, scale / 3);
    else this.setScale(scale, scale / 5);
  };

  // Adds header text

  let header = this.add
    .text(0, 0, "Can you find 4 words?", {
      fontFamily: "ui_font_1",
      fontSize: 100,
      color: "#ffffff",
      strokeThickness: 1.5,
    })
    .setOrigin(0.5);

  header.onResizeCallback = function () {
    let scale = Math.min(currentWidth / this.width, currentHeight / this.height);
    if (!isLandscape) this.setScale(scale * 0.8);
    else this.setScale(scale * 0.5);

    this.x = currentWidth / 2;
    this.y = this.height / 2;
  };

  // Adds button

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

  // Adds text inside the button and its tween

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
    this.setScale(scale);
    this.y = button.y;
    this.x = button.x;
  };

  let buttonTween = scene.tweens.add({
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

  // Adds scoreboard

  let scoreBoard = this.add.image(0, 0, "atlas", "extra_word");

  scoreBoard.onResizeCallback = function () {
    let scale = currentWidth / this.width;
    if (!isLandscape) {
      this.setScale(scale / 6);
      this.y = currentHeight / 1.15;
      this.x = 0 + this.displayWidth / 2;
    } else {
      this.setScale(scale / 10);
      this.y = currentHeight / 1.2;
      this.x = currentWidth - this.displayWidth / 2;
    }
  };

  // Adds score text

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

  // Adds faded circle

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
  circle.onResizeCallback();

  // Adds non-visible board for to scale puzzle area and boxes

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
  board.onResizeCallback();
  board.setVisible(false);

  // BOX ADJUSTMENTS

  let box;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      box = this.add.image(0, 0, "atlas", "box").setOrigin(0);

      box.onResizeCallback = function () {
        let scale = Math.min(board.displayWidth / this.width, board.displayHeight / this.height);
        this.setScale(Math.max(scale / rows, scale / columns));
        this.y = board.getTopLeft().y + i * this.displayHeight;
        this.x = board.getTopLeft().x + this.displayWidth * j;
      };
      boxArray.push(box);
    }
  }

  let index;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      index = boxData[i][j];
      currentBox.push(index);
    }
  }

  // Disables visibility of idle boxes

  for (let i = 0; i < boxArray.length; i++) if (!currentBox[i]) boxArray[i].setVisible(false);

  // Adds letters' array

  textLetters = [];

  for (let i = 0; i < letters.length; i++) {
    puzzleText = this.add
      .text(0, 0, letters[i], {
        fontFamily: "ui_font_1",
        fontSize: 100,
        color: "#ffffff",
        strokeThickness: 1.5,
      })
      .setOrigin(0.5)
      .setDepth(2);

    puzzleText.onResizeCallback = function () {
      let scale = Math.min((circle.displayWidth * 0.15) / this.width, (circle.displayHeight * 0.3) / this.height);
      this.setScale(scale);
    };
    textLetters.push(puzzleText);
  }

  // Adds dummy resize function only for to scale letters positiob on the faded circle

  let dummy = this.add.rectangle(0, 0, 0, 0);

  dummy.onResizeCallback = function () {
    let angle;
    let radius = circle.radius * circle.scale - textLetters[0].displayHeight / 2;
    for (let i = 0; i < letters.length; i++) {
      angle = (i / (letters.length / 2)) * Math.PI;

      textLetters[i].y = circle.getCenter().y - radius * Math.cos(angle);
      textLetters[i].x = radius * Math.sin(angle) + circle.getCenter().x;
    }
  };

  dummy.onResizeCallback();

  // Adds circles behind puzzle texts

  let circleArray = [];

  for (let i = 0; i < letters.length; i++) {
    letterCircle = this.add.circle(0, 0, 1, 0x009d00).setAlpha(0.01);

    letterCircle.onResizeCallback = function () {
      this.setScale(circle.scale / 4);
      this.y = textLetters[i].getCenter().y;
      this.x = textLetters[i].getCenter().x;
    };
    letterCircle.onResizeCallback();
    letterCircle.text = textLetters[i];
    circleArray.push(letterCircle);
    circleArray[i].setVisible(true);
    circleArray[i].setInteractive();
    circleArray[i].isSelected = false;
  }

  // Adds green circles of letters' background for tween

  let colorCircleArray = [];

  for (let i = 0; i < letters.length; i++) {
    colorCircle = this.add.circle(0, 0, 1, 0x009d00);

    colorCircle.onResizeCallback = function () {
      this.setScale(0.1);
      this.y = textLetters[i].getCenter().y;
      this.x = textLetters[i].getCenter().x;
    };
    colorCircle.onResizeCallback();
    colorCircleArray.push(colorCircle);
    colorCircleArray[i].setVisible(true);
  }

  // Adds hand tutorial

  hand = this.add.image(0, 0, "atlas", "hand0").setDepth(2);

  hand.onResizeCallback = function () {
    let scale = Math.min((currentWidth * 0.12) / this.width, (currentHeight * 0.15) / this.height);
    this.setScale(scale);
    hand.y = textLetters[0].getBottomCenter().y;
    hand.x = textLetters[0].getBottomCenter().x;
  };
  handTimeline();
  console.log(textLetters);

  // Adds green circle tweens and small sized letters when letters are selected and checks whether the letters are selected or not

  let clickedLettersArray = [];

  for (let i = 0; i < letters.length; i++) {
    circleArray[i].on("pointerover", function (pointer) {
      if (circleArray[i].isSelected) return;
      console.log(textLetters[i].text);
      circleArray[i].isSelected = true;

      let clickTween = scene.tweens.add({
        targets: colorCircleArray[i],
        duration: 100,
        ease: "Linear",
        repeat: 0,
        scaleX: {from: 0, to: letterCircle.scaleX},
        scaleY: {from: 0, to: letterCircle.scaleY},
        yoyo: false,
      });

      clickedLetters = scene.add
        .text(0, 0, textLetters[i].text, {
          fontFamily: "ui_font_1",
          fontSize: 100,
          color: "#ffffff",
          strokeThickness: 1.5,
        })
        .setOrigin(0);

      clickedLetters.onResizeCallback = function () {
        let scale = Math.min(board.displayWidth / this.width, board.displayHeight / this.height);
        this.setScale(Math.max((scale * 0.5) / rows, (scale * 0.5) / columns));
        if (!isLandscape) {
          this.y = currentHeight / 2;
          this.x = currentWidth / 2 + i * this.displayWidth;
        } else {
          this.y = currentHeight / 6;
          this.x = currentWidth / 1.5 + i * this.displayWidth;
        }
      };
      clickedLetters.onResizeCallback();
    });
    clickedLettersArray.push(clickedLetters);
    console.log(clickedLettersArray);
  }

  // Removes green circle tweens and small sized letters when the pointer is up

  this.input.on("pointerup", function (pointer) {
    //console.log("mert");

    for (let items of circleArray) items.isSelected = false;

    for (let circles of colorCircleArray) {
      scene.tweens.add({
        targets: circles,
        duration: 100,
        ease: "Linear",
        repeat: 0,
        scaleX: {from: circles.scaleX, to: 0},
        scaleY: {from: circles.scaleX, to: 0},
        yoyo: false,
      });
    }
  });
}

function handTimeline() {
  timeline = scene.tweens.createTimeline();
  timeline.loop = -1;

  timeline.add({
    targets: hand,
    ease: "Linear",
    duration: 700,
    alpha: {from: 0, to: 1},
    repeat: 0,
    yoyo: false,
    onStart: function () {
      hand.y = textLetters[0].getBottomCenter().y;
      hand.x = textLetters[0].getBottomCenter().x;
    },
  });

  for (let i = 1; i < letters.length; i++) {
    timeline.add({
      targets: hand,
      y: textLetters[i].getBottomCenter().y,
      x: textLetters[i].getBottomCenter().x,
      ease: "Linear",
      duration: 700,
      repeat: 0,
      yoyo: false,
    });
  }

  timeline.add({
    targets: hand,
    ease: "Linear",
    duration: 1000,
    alpha: {from: 1, to: 0},
    repeat: 0,
    yoyo: false,
    onComplete: function () {
      hand.y = textLetters[0].getBottomCenter().y;
      hand.x = textLetters[0].getBottomCenter().x;
    },
  });
  timeline.play();
}

function updateGame(time, delta) {
  currentTime = time;
  deltaTime = delta;

  main.update();

  let pointer = this.input.activePointer;

  if (pointer.isDown) {
    timeline.stop();
    hand.destroy();
  }
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
