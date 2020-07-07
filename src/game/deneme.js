// let mask = this.add.image(0, 0, "atlas", "mask").setOrigin(0);

// mask.onResizeCallback = function () {
//   let scale = Math.max(currentWidth / this.width, currentHeight / this.height);
//   this.setScale(scale);

//   if (!isLandscape) {
//     if (squareness > 0.6) {
//       this.y = -this.displayHeight * 0.2;
//     } else {
//       this.y = 0;
//     }
//     this.x = 0;
//   } else {
//     let scale = currentHeight / this.height;

//     this.setScale(currentWidth / this.width, currentHeight / this.height);
//     this.setRotation(-Math.PI / 2);
//     // this.y = backGround.getTopCenter().y;
//     this.y = currentHeight;
//     this.x = currentWidth / 2.5;
//   }
//   console.log(this);
// };

// CIRCLE TWEENS
// for (let i = 0; i < circleArray.length; i++) {
//   let clickTween = scene.tweens.add({
//     targets: letterCircle[i],
//     duration: 600,
//     ease: "Linear",
//     repeat: -1,
//     scaleX: {from: letterCircle.scaleX * 0, to: letterCircle.scaleX},
//     scaleY: {from: letterCircle.scaleY * 0, to: letterCircle.scaleY},
//     yoyo: true,
//   });
// }

// Add circles behind puzzle texts

// let circleArray = [];

// for (let i = 0; i < letters.length; i++) {
//   letterCircle = this.add.circle(0, 0, 1, 0x009d00);

//   letterCircle.onResizeCallback = function () {
//     this.setScale(circle.scale / 4);
//     this.y = textLetters[i].getCenter().y;
//     this.x = textLetters[i].getCenter().x;
//   };
//   circleArray.push(letterCircle);
// }
