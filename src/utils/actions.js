var actions = {};
var defScene;

actions.setDefaultScene = function( scene ){
    defScene = scene;
}

actions.pulse = function( obj, scaleRatio=0.95, duration= 500){
    let scene = obj.scene;

    scene.tweens.add({
        targets: obj,
        scaleX: obj.scaleX * scaleRatio,
        scaleY: obj.scaleY * scaleRatio,
        duration,
        yoyo: true,
        repeat: -1
    })
}


export default actions;