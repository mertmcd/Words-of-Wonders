var globalProps = {
    sendParametersAsJson: true
};

var properties = [{
    name: "OPTIONS",

    subList: [{
        id: "gameTimeEnabled",
        visibleName: "Enable game time:",
        type: "boolean",
        default: true
    }, {
        id: "gameTime",
        visibleName: "Duration of in-game:",
        type: "slide",
        default: 40,
        min: 5,
        max: 99,
        step: 1
    }, {
        id: "clickCounterEnabled",
        visibleName: "Enable click counter:",
        type: "boolean",
        default: true
    }, {
        id: "clickCount",
        visibleName: "Number of clicks before the user is redirected to store:",
        type: "slide",
        default: 40,
        min: 5,
        max: 99,
        step: 1
    }, {
        id: "fullscreenMarket",
        visibleName: "Click anywhere in the endcard to go to market:",
        type: "boolean",
        default: true
    }, {
        id: "chat",
        visibleName: "Please type in chat comments below:",
        desc: "Split sentences with ',' and don't put 'space' after ','",
        type: "text",
        default: "Creative made by: Playable Factorytm"
    }, {
        id: "introDuration",
        visibleName: "Duration of intro scene:",
        type: "slide",
        default: 5,
        min: 1,
        max: 20,
        step: 1
    }, {
        id: "soundEnabled",
        visibleName: "Enable sound:",
        type: "boolean",
        default: true
    }, {
        id: "enableVideo",
        visibleName: "Enable video on top of character:",
        type: "boolean",
        default: true
    }, {
        id: "videoChoice",
        visibleName: "Video choice:",
        type: "slide",
        default: 1,
        min: 1,
        max: 2,
        step: 1
    }]
}, {
    name: "STAGES",

    subList: []
}];

let list = []

for (let i = 1; i < 8; i++) {
    list.push({
        name: `Stage ${i}`,

        items: [{
            id: `stage${i}type`,
            visibleName: `Choose type of module for stage ${i}: `,
            type: "imageCarousel",
            default: i - 1,
            folderName: "",
            images: [
                "donation_bg.png",
                "improvement_bg.png",
                "question_bg.png",
                "skills_bg.png",
                "sponsor_bg.png",
                "subscriber_bg.png",
                "none.png"
            ],
            imageHeight: 128

        }, {
            id: `stage${i}message`,
            visibleName: `Inner text of module:`,
            type: "text",
            default: "Make videos more often pleeeease"
        }, {
            id: `stage${i}option1`,
            visibleName: `Answer 1:`,
            type: "text",
            default: "I do not think so"
        }, {
            id: `stage${i}option2`,
            visibleName: `Answer 2:`,
            type: "text",
            default: "I'm sorry to upset you"
        }, {
            id: `stage${i}option3`,
            visibleName: `Answer 3:`,
            type: "text",
            default: "please leave the stream"
        }, {
            id: `stage${i}correctOption`,
            visibleName: `Correct answer for question:`,
            type: "slide",
            default: 1,
            min: 1,
            max: 3,
            step: 1
        }, {
            id: `stage${i}sponsorName`,
            visibleName: `Name of sponsor:`,
            type: "text",
            default: "Yamsung"
        }, {
            id: `stage${i}duration`,
            visibleName: `Duration of module:`,
            type: "slide",
            default: 5,
            min: 1,
            max: 8,
            step: 1
        }, {
            id: `stage${i}nextModule`,
            visibleName: `Time between next module:`,
            type: "slide",
            default: 6,
            min: 1,
            max: 12,
            step: 1
        }]
    })
}

properties[1].subList.push({
    id: "tab",
    visibleName: "Stages",
    default: 0,
    type: "tab",
    list: list
})