
export default class Container extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        scene = scene || window.scene;
        super(scene, x, y, children);
        this.scene = scene;
        this.scene.add.existing(this);
    }

    setBoundaries() {
        this.width = this.lengthX();
        this.height = this.lengthY();
    }

    drawDebug(graphics) {
        this.setBoundaries()
        // Clear the screen
        graphics.clear();

        // Draw container bounds
        var color = 0xff0000;
        var thickness = 1;
        var alpha = 1;

        graphics.lineStyle(thickness, color, alpha);
        graphics.strokeRect(
            this.x - this.width / 2 + this.centerX(),
            this.y - this.height / 2 + this.centerY(),
            this.width,
            this.height
        );


        // Draw centerX
        graphics.lineStyle(thickness, color, alpha);
        graphics.strokeRect(
            this.x - this.width / 2 + this.centerX(),
            this.y + this.centerY(),
            this.width,
            1
        );


        // Draw centerY
        graphics.lineStyle(thickness, color, alpha);
        graphics.strokeRect(
            this.x + this.centerX(),
            this.y - this.height / 2 + this.centerY(),
            1,
            this.height,
        );

        // Bring graphics to top
        graphics.depth = 1000;
    }

    /**
     * Subtract this value from the container's x position
     * Ex: container.x = w * 0.5 - container.centerX()
     */
    centerX() {
        if (this.list.length === 0)
            return;
        let minX = this.list[0].x - this.list[0].width * this.list[0].scaleX / 2;
        let maxX = this.list[0].x + this.list[0].width * this.list[0].scaleX / 2;
        let adjustedX;
        for (let i = 0; i < this.list.length; i++) {
            if (minX > this.list[i].x - this.list[i].width * this.list[i].scaleX / 2) {
                minX = this.list[i].x - (this.list[i].width * this.list[i].scaleX) / 2;
            }
            if (maxX < this.list[i].x + this.list[i].width * this.list[i].scaleX / 2) {
                maxX = this.list[i].x + (this.list[i].width * this.list[i].scaleX) / 2;
            }
        }
        return adjustedX = (maxX + minX) * this.scaleX / 2;
    }

    /**
         * Subtract this value from the container's y position
         * Ex: container.y = h * 0.5 - container.centerY()
         */
    centerY() {
        if (this.list.length === 0)
            return;
        let minY = this.list[0].y - this.list[0].height * this.list[0].scaleY / 2;
        let maxY = this.list[0].y + this.list[0].height * this.list[0].scaleY / 2;
        let adjustedY;
        for (let i = 0; i < this.list.length; i++) {
            if (minY > this.list[i].y - this.list[i].height * this.list[i].scaleY / 2) {
                minY = this.list[i].y - this.list[i].height * this.list[i].scaleY / 2;
            }

            if (maxY < this.list[i].y + this.list[i].height * this.list[i].scaleY / 2) {
                maxY = this.list[i].y + this.list[i].height * this.list[i].scaleY / 2;
            }
        }
        return adjustedY = (maxY + minY) * this.scaleY / 2;
    }

    lengthX() {
        let minX = this.list[0].x - this.list[0].width * this.list[0].scaleX / 2;
        let maxX = this.list[0].x + this.list[0].width * this.list[0].scaleX / 2;
        let adjustedX;
        for (let i = 0; i < this.list.length; i++) {
            if (minX > this.list[i].x - this.list[i].width * this.list[i].scaleX / 2) {
                minX = this.list[i].x - (this.list[i].width * this.list[i].scaleX) / 2;
            }
            if (maxX < this.list[i].x + this.list[i].width * this.list[i].scaleX / 2) {
                maxX = this.list[i].x + (this.list[i].width * this.list[i].scaleX) / 2;
            }
        }
        return adjustedX = (maxX - minX) * this.scaleX;
    }

    lengthY() {
        let minY = this.list[0].y - this.list[0].height * this.list[0].scaleY / 2;
        let maxY = this.list[0].y + this.list[0].height * this.list[0].scaleY / 2;
        let adjustedY;
        for (let i = 0; i < this.list.length; i++) {
            if (minY > this.list[i].y - this.list[i].height * this.list[i].scaleY / 2) {
                minY = this.list[i].y - this.list[i].height * this.list[i].scaleY / 2;
            }

            if (maxY < this.list[i].y + this.list[i].height * this.list[i].scaleY / 2) {
                maxY = this.list[i].y + this.list[i].height * this.list[i].scaleY / 2;
            }
        }
        return adjustedY = (maxY - minY) * this.scaleY;
    }

    addEndcard(jsonData) {
        this.graphics = this.scene.add.graphics();
        this.sP = jsonData[jsonData.length - 1].bg.height;
        this.sL = jsonData[jsonData.length - 1].bg.width;
        this.debugMode = jsonData[jsonData.length - 1].bg.debugMode;

        this.pane = this.scene.add.image(0, 0, "atlas", "").setTintFill(0x008000);
        this.pane.setAlpha(jsonData[jsonData.length - 1].bg.opacity);
        this.pane.fullScreen = jsonData[jsonData.length - 1].bg.fullScreen;
        this.pane.frameP = jsonData[jsonData.length - 1].bg.frameP;
        this.pane.frameL = jsonData[jsonData.length - 1].bg.frameL;
        this.pane.setFrame(this.pane.frameP);
        this.add(this.pane);

        //console.log(jsonData);
        for (let i = 0; i < jsonData.length; i++) {
            let obj = jsonData[i];
            if (obj.type === "image") {
                let img = this.scene.add.image(obj.x, obj.y, "atlas", obj.frame);
                img.name = "image";
                img.sP = obj.sP;
                img.sL = obj.sL;
                img.xP = obj.xP;
                img.yP = obj.yP;
                img.xL = obj.xL;
                img.yL = obj.yL;
                obj.color ? img.setTintFill(obj.color) : img.clearTint();
                this.add(img);
            } else if (obj.type === "text") {
                let txt = this.scene.add.text(obj.x, obj.y, obj.text, {
                    fontFamily: "ui-font",
                    fontSize: 64,
                    color: "#000000"
                }).setOrigin(0.5);
                txt.name = "text";
                txt.setStroke("#000000", obj.stroke);
                txt.sP = obj.sP;
                txt.sL = obj.sL;
                txt.xP = obj.xP;
                txt.yP = obj.yP;
                txt.xL = obj.xL;
                txt.yL = obj.yL;
                this.add(txt);

            } else if (obj.type === "button") {
                let img = this.scene.add.image(obj.x, obj.y, "atlas", obj.frame).setInteractive();
                img.name = "button";
                img.sP = obj.sP;
                img.sL = obj.sL;
                img.xP = obj.xP;
                img.yP = obj.yP;
                img.xL = obj.xL;
                img.yL = obj.yL;
                img.pulse = obj.pulse;
                img.on("pointerdown", () => {
                    if (obj.cta) {
                        main.gotoLink();
                    } else if (obj.retry) {
                        restartGame();
                    }
                })
                obj.bgColor ? img.setTintFill(obj.bgColor) : img.clearTint();
                img.txt = this.scene.add.text(obj.x, obj.y, obj.text, {
                    fontFamily: "ui-font",
                    fontSize: 64,
                    color: obj.color
                }).setOrigin(0.5);
                img.txt.setStroke(obj.color, obj.stroke);

                this.add([img, img.txt])

            } else if (obj.type === "settings") {
                if (!obj.bg.visible) {
                    this.pane.setAlpha(0);
                }
                if (obj.confetti) {
                    this.confettiEffect();
                }
            }
        }


        this.onResizeCallback = function (w, h) {

            w > h ? this.pane.setFrame(this.pane.frameL) : this.pane.setFrame(this.pane.frameP);
            if (this.pane.fullScreen) {
                this.pane.setScale(w / this.pane.width, h / this.pane.height);
            } else {
                this.pane.setScale(Math.min(w / this.pane.width, h / this.pane.height));
            }

            this.mostLeft = this.pane.x - this.pane.displayWidth / 2;
            this.mostTop = this.pane.y - this.pane.displayHeight / 2;

            this.list.forEach(obj => {
                if (obj.name === "image") {
                    this.resizeObj(obj, w, h);
                } else if (obj.name === "text") {
                    this.resizeObj(obj, w, h);
                } else if (obj.name === "button") {
                    this.resizeObj(obj, w, h);
                }
            })

            this.setScale(1)
            this.setScale(Math.min(w * this.sP / this.getBounds().width, h * this.sL / this.getBounds().height));
            this.x = w * 0.5 - this.centerX();
            this.y = h * 0.5 - this.centerY();

            if (this.debugMode)
                this.drawDebug(this.graphics);
        }


    }

    resizeObj(obj, w, h) {
        if (w > h) {
            obj.setScale(obj.sL)
            obj.x = this.mostLeft + (obj.xL * this.pane.displayWidth);
            obj.y = this.mostTop + (obj.yL * this.pane.displayHeight);
        } else {
            obj.setScale(obj.sP)
            obj.x = this.mostLeft + (obj.xP * this.pane.displayWidth);
            obj.y = this.mostTop + (obj.yP * this.pane.displayHeight);
        }

        if (obj.name === "button") {
            obj.txt.setScale(Math.min(obj.displayWidth * 0.8 / obj.txt.width, obj.displayHeight * 0.5 / obj.txt.height))
            obj.txt.x = obj.x;
            obj.txt.y = obj.y;

            if (obj.pulse) {
                this.scene.tweens.killTweensOf(obj);
                this.scene.tweens.add({
                    targets: obj,
                    scale: obj.scale * 1.2,
                    duration: 700,
                    yoyo: true,
                    repeat: -1,
                    ease: "Sine.easeInOut"
                })

                this.scene.tweens.killTweensOf(obj.txt);
                this.scene.tweens.add({
                    targets: obj.txt,
                    scale: obj.txt.scale * 1.2,
                    duration: 700,
                    yoyo: true,
                    repeat: -1,
                    ease: "Sine.easeInOut"
                })
            }
        }
    }

    confettiEffect() {
        this.confettiParticles = this.scene.add.particles('atlas');

        this.confettiParticles.createEmitter({
            frame: ['confetti-blue', 'confetti-green', 'confetti-yellow', 'confetti-pink', 'confetti-white'],
            x: { min: 0, max: window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight * 2 },
            y: 0,
            lifespan: 4000,
            speedY: { min: 200, max: 400 },
            scale: { start: 0.6, end: 0 },
            quantity: 2,
            rotate: { start: 0, end: 360 },
            blendMode: 'EDGE'
        });
    }


    // preUpdate(time, delta) {}
}




/**
 * USAGES
 * //in startGame function:
 *
 *  container = new Container(scene);
    logo = new Image("atlas", "logo");
    logo.setPosition(-300, 100);
    button = new Image("atlas", "button");
    button.setScale(0.7);
    button.setPosition(120, 150);
    container.add([logo, button]);
    container.setBoundaries();
 *
 *
 * in resizeAll function
 *
 *  container.x = w * 0.5 - container.centerX();
    container.y = h * 0.5 - container.centerY();
    container.drawDebug(graphics);
 */


/**
 * USAGE OF JSON ENDCARD
 *  //in startGame function:
 *
 * container = new Container(scene);
 * container.addEndcard(data.objects);
 *
 *
 *  //rawData = prompt("Give me json", "");
    //parsedData = JSON.parse(rawData);
    //addEndcard(parsedData)
 *
 *
 * data.objects is a json object that contains object properties,
 * currently we can add image, text and button type of objects
 *
 *                            |   |
 *                          __|   |__
 *                          \       /
 *                           \     /
 *                            \   /
 *                             \_/
 *
 * objects: [
        {
            "type": "image",
            "frame": "logo",
            "sP": 0.5,
            "xP": 0.15,
            "yP": 0.15,
            "sL": 0.6,
            "xL": 0.2,
            "yL": 0.2
        },
        {
            "type": "text",
            "text": "CONGRATULATIONS!",
            "stroke": 5,
            "sP": 0.5,
            "xP": 0.5,
            "yP": 0.5,
            "sL": 0.7,
            "xL": 0.5,
            "yL": 0.6
        },
        {
            "type": "button",
            "frame": "button",
            "text": "PLAY NOW",
            "stroke": 5,
            "sP": 2,
            "xP": 0.5,
            "yP": 0.8,
            "sL": 2,
            "xL": 0.7,
            "yL": 0.82,
            "color": "#ffffff",
            "bgColor": "0xff0000",
            "pulse": false,
            "cta": true,
            "retry": false
        },
        {
            "type": "settings",
            "bg": {
                "visible": true,
                "frameP": "4-3-P",
                "frameL": "4-3-L",
                "width": 0.8,
                "height": 0.8,
                "fullScreen": false,
                "opacity": 1,
                "debugMode": false
            },
            "confetti": true
        }
    ]
 *
 *
 */