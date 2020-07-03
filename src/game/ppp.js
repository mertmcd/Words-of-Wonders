class phaserPlusPlus {

    static upgradePhaser() {
        /** @type {Phaser.Game} */
        this.game = window.app.main.game;

        this.upgradeTweens();
    }

    static upgradeTweens() {
        let allScenes = this.game.scene.getScenes(false);

        let old_add = allScenes[0].tweens.__proto__.add;
        let disect = this._disectTweenConfig;

        allScenes[0].tweens.__proto__.add = function (conf) {
            //Disect config first
            let edited = disect(conf);
            let newConf = edited.config;
            let functions = edited.functions;

            let tween = old_add.call(this, newConf);
            if (edited.hasDynamic) {
                tween.on("update", function (tw, key, target) {
                    if (key.substr(0, 9) !== "dynamic__") return;

                    let trueKey = key.substr(9);
                    target[trueKey] = functions[trueKey].lerp(
                        functions[trueKey].getStart(target, trueKey, target[key], tw.targets.indexOf(target), tw.targets.length, tw),
                        functions[trueKey].getEnd(target, trueKey, target[key], tw.targets.indexOf(target), tw.targets.length, tw),
                        target[key]
                    )
                })
            }
            return tween;
        };

        //console.log(allScenes[0].tweens.__proto__);
    }

    static _disectTweenConfig(conf) {

        let result = {
            config: {},
            functions: {}
        };

        for (let key in conf) {
            result.config[key] = conf[key];
        }

        let keysToDelete = [];

        for (let key in conf.props) {
            if (!conf.props[key].dynamic) continue;

            //Prepare dynamic props
            result.config.props["dynamic__" + key] = {
                value: {
                    getStart: function () {
                        return 0;
                    },
                    getEnd: function () {
                        return 1;
                    }
                }
            };
            result.functions[key] = {};

            for (let param in conf.props[key]) {
                if (param === "value") {
                    result.functions[key].getStart = conf.props[key].value.getStart;
                    result.functions[key].getEnd = conf.props[key].value.getEnd;
                    if (conf.props[key].lerp) {
                        result.functions[key].lerp = conf.props[key].lerp;
                    } else {
                        result.functions[key].lerp = function (start, end, n) {
                            return (1 - n) * start + n * end;
                        }
                    }
                } else {
                    result.config.props["dynamic__" + key][param] = conf.props[key][param];
                }
            }

            keysToDelete.push(key);
        }

        keysToDelete.forEach((key) => {
            delete result.config[key];
        })

        result.hasDynamic = keysToDelete.length > 0;

        return result;
    }
}

export default phaserPlusPlus;