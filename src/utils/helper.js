export function RoundedButton(scene, main, string, bgColor, textColor) {
    let text = scene.add.text(0, 0, string, { fontSize: 48, lineSpacing: 15, fontFamily: "ui-font", color: textColor, padding: { y: 8 } }).setInteractive();
    text.setOrigin(0.5);
    text.setStroke(textColor, 2);

    text.on("pointerdown", () => {
        main.gotoLink();
    })

    let graphics = scene.add.graphics();
    let width = text.width * 1.2;
    let height = text.height;
    graphics.fillStyle(bgColor, 1); // STRAIGHT COLOR
    graphics.fillRoundedRect(-width / 2, -height / 2, width, height, 24);

    let container = scene.add.container();

    container.add([graphics, text]);
    return container;

    //EX 
    // container = RoundedButton(this);
}

export function ImageButton(scene, atlas, frame, string, main) {
    let text = scene.add.text(0, 0, string, { fontSize: 48, fontFamily: "ui-font", lineSpacing: 20, padding: { y: 32 } });
    text.setOrigin(0.5);
    text.setStroke("#ffffff", 2);

    let image = scene.add.image(0, 0, atlas, frame).setInteractive();
    image.on("pointerdown", () => {
        main.gotoLink();
    })
    image.setScale(text.width * 1.2 / image.width);
    let container = scene.add.container();

    container.add([image, text]);

    container.setString = function (string) {
        text.setText(string);
        image.setScale(Math.max(text.width * 1.2 / image.width, 2));
    }

    container.setButtonScale = function () {
        text.setFontSize(72);
        image.setScale(text.width * 1.2 / image.width, 2.5);
    }

    return container;
}

export function PulseButton(scene, button) {
    scene.tweens.add({
        targets: button,
        scaleX: button.scaleX * 1.1,
        scaleY: button.scaleY * 1.1,
        duration: 800,
        yoyo: true,
        repeat: -1
    });
}

export function EndCard(scene, main, w, h, config) {
    let color1 = 0xff0000;
    let color2 = 0x0000ff;
    let alpha = 1;
    var graphics = scene.add.graphics();
    graphics.fillGradientStyle(color1, color1, color2, color2, alpha);
    graphics.fillRect(0, 0, w, h);
    graphics.onResizeCallback = function (w, h) {
        graphics.clear();
        graphics.fillGradientStyle(color1, color1, color2, color2, alpha);
        graphics.fillRect(0, 0, w, h);
    }

    let container = scene.add.container();
    let padding = config.padding;
    let logo = scene.add.image(0, 0, config.atlas, config.logo);
    logo.setScale(0.8);


    let text = scene.add.text(0, 0, config.text, { fontSize: config.fontSize, align: "center", wordWrap: { width: w * 0.94 } });
    text.setOrigin(0.5);

    let button = scene.add.image(0, 0, config.atlas, config.button).setInteractive();
    button.on("pointerdown", () => {
        main.gotoLink();
    })

    let above = logo.height * logo.scaleY + padding;
    let below = button.height + padding;
    let dist = (above - below);

    logo.y = -(logo.height * logo.scaleY / 2 + padding);
    button.y = button.height / 2 + padding + dist



    container.add([logo, text, button]);
    container.iW = container.getBounds().width;
    container.iH = container.getBounds().height;
    container.bringToTop(text);
    container.onResizeCallback = function (w, h) {
        this.setScale(Math.min(w * 0.9 / this.iW, h * 0.9 / this.iH))
        this.x = w * 0.5;
        this.y = h * 0.5;
    }
    return container;

    /* // SAMPLE USAGE
    let endCardConfig = {
        padding: 128,
        fontSize: 64,
        text: "Lorem ipsum dolor sit amet",
        atlas: "atlas",
        logo: "logo",
        button: "button"
    }
    container = EndCard(this, main, lastWidth, lastHeight, endCardConfig);
    */
}