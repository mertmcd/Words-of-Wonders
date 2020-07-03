var cardMaker = {};

cardMaker.addEndCard = function( 
    scene, icon, text, button, coverColor = 0x000000, coverOpacity = 0.5,
    coverImageTexture = null, coverImageFrame = null,
    scaleWidthRatio = 0.9, scaleHeightRatio = 0.9
){
    let cover;

    if(coverImageTexture){
        cover = scene.add.image(0, 0, coverImageTexture, coverImageFrame);
    }
    else{
        cover = scene.add.graphics();
    }
    
    let cont = scene.add.container();

    let objects = [icon, text, button];
    objects = objects.sort((a,b)=>a.y-b.y);
    cont.add(objects);

    let bounds = cont.getBounds();
    cont.width = bounds.width;
    cont.height = bounds.height;

    for(let i=0; i < objects.length; i++ ){
        
        let obj = objects[i];
        obj.alpha = 0;
        
        let targetScale = obj.scaleX;
        obj.setScale(obj.scaleX*2);

        scene.tweens.add({
            targets: obj,
            scaleX: targetScale,
            scaleY: targetScale,
            alpha: 1,
            ease:"Back",
            duration:300,
            delay:200*i,
            alpha: 1,
            onComplete: function(){
                if(obj == button){
                    scene.tweens.add({
                        targets: obj,
                        scaleX: obj.scaleX * 0.95,
                        scaleY: obj.scaleX * 0.95,
                        duration: 500,
                        yoyo: true,
                        repeat:-1,
                        delay:200
                    });
                }
            }
        });
    }

    cover.alpha = 0;

    scene.tweens.add({
        targets:cover,
        alpha: coverOpacity,
        duration: 500
    });

    cont.onResizeCallback = function(w,h){
        this.x = w*0.5;
        this.y = h*0.5;

        let scale = Math.min( w * scaleWidthRatio / this.width, h * scaleHeightRatio / this.height );

        this.setScale(scale);

        if(coverImageTexture){
            let scale = Math.max( w/cover.width, h/cover.height);
            cover.setScale(scale);
            cover.x = w*0.5;
            cover.y = h*0.5;
        }
        else{
            cover.clear();
            cover.fillStyle(coverColor);
            cover.fillRect(0,0,w,h);
        }
        
        
    }

    return cont;
}



cardMaker.addRestartCard = function(
    scene, text, ctaButton, restartBtn, coverColor = 0x000000, coverOpacity = 0.5,
    coverImageTexture = null, coverImageFrame = null,
    scaleWidthRatio = 0.9, scaleHeightRatio = 0.9
){
    let cover;

    if(coverImageTexture){
        cover = scene.add.image(0, 0, coverImageTexture, coverImageFrame);
    }
    else{
        cover = scene.add.graphics();
    }
    
    let cont = scene.add.container();

    let objects = [text, restartBtn, ctaButton];
    objects = objects.sort((a,b)=>a.y-b.y);
    cont.add(objects);

    let bounds = cont.getBounds();
    cont.width = bounds.width;
    cont.height = bounds.height;

    for(let i=0; i < objects.length; i++ ){
        
        let obj = objects[i];
        obj.alpha = 0;
        
        let targetScale = obj.scaleX;
        obj.setScale(obj.scaleX*2);

        scene.tweens.add({
            targets: obj,
            scaleX: targetScale,
            scaleY: targetScale,
            alpha: 1,
            ease:"Back",
            duration:300,
            delay:200*i,
            alpha: 1,
            onComplete: function(){
                if(obj == ctaButton){
                    scene.tweens.add({
                        targets: obj,
                        scaleX: obj.scaleX * 0.95,
                        scaleY: obj.scaleX * 0.95,
                        duration: 500,
                        yoyo: true,
                        repeat:-1,
                        delay:200
                    });
                    scene.tweens.add({
                        targets: restartBtn,
                        scaleX: restartBtn.scaleX * 0.95,
                        scaleY: restartBtn.scaleX * 0.95,
                        duration: 500,
                        yoyo: true,
                        repeat:-1,
                        delay:200
                    });
                }
            }
        });
    }

    cover.alpha = 0;

    scene.tweens.add({
        targets:cover,
        alpha: coverOpacity,
        duration: 500
    });

    cont.onResizeCallback = function(w,h){
        this.x = w*0.5;
        this.y = h*0.5;

        let scale = Math.min( w * scaleWidthRatio / this.width, h * scaleHeightRatio / this.height );

        this.setScale(scale);
        
        if(coverImageTexture){
            let scale = Math.max( w/cover.width, h/cover.height);
            cover.setScale(scale);
            cover.x = w*0.5;
            cover.y = h*0.5;
        }
        else{
            cover.clear();
            cover.fillStyle(coverColor);
            cover.fillRect(0,0,w,h);
        }
        
        
    }

    return cont;
}


export default cardMaker;