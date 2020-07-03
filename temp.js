var buttonMaker = {};

buttonMaker.addButton = function(
    scene, bgTexture, bgFrame, str, textColor = "#ffffff", clickAction, 
    textResponsiveData = {
        xRatio:0.5,
        yRatio:0.5,
        wRatio:0.8,
        hRatio:0.7,
    }
    
    ){
    
    let btn = scene.add.container();

    //let bg = scene.add.image(0,0,"atlas", bgFrame);
    let bg = scene.add.image(0,0, bgTexture, bgFrame);

    let textData = {color: textColor, align:'center', fontSize: 64, fontFamily: 'ui-font'};
    let txt = scene.add.text(0, 0, str, textData).setOrigin(0.5);

    //txt.setStroke('#000000', 6);
    //txt.setShadow(0, 4, '#333333', 2, true, false);
    let rd = textResponsiveData;

    txt.setScale(Math.min(bg.width*rd.wRatio/txt.width, bg.height*rd.hRatio/txt.height));
    txt.x = bg.width * (xRatio-0.5);
    txt.y = bg.height * (yRatio-0.5);

    btn.add(bg);
    btn.add(txt);

    btn.bg = bg;
    btn.text = txt;

    btn.width = bg.width;
    btn.height = bg.height;

    

    if(clickAction){
        bg.setInteractive();
        bg.on("pointerdown", clickAction);
    }
    return btn;

}

buttonMaker.addGraphicsButton = function(
    scene, text, textColor = "#ffffff", clickAction,
    bgData = {
        color:0x990000,
        width: 400,
        height: 80,
        opacity: 1,
        roundCorners: 0,
        stroke: 0,
        strokeColor: 0x000000,
        strokeOpacity: 1,
        shadowX:0,
        shadowY:0,
        shadowColor:0,
        shadowOpacity:0,
    },
    textResponsiveData = {
        xRatio:0.5,
        yRatio:0.5,
        wRatio:0.8,
        hRatio:0.7,
    }
    
    ){
    
    let btn = scene.add.container();

    let bg = scene.add.graphics( );

    bg.width = bgData.width;
    bg.height = bgData.height;
    
    if(bgData.shadowX || bgData.shadowY){
        bg.fillStyle(bgData.shadowColor, bgData.shadowOpacity);



    }

    bg.fillStyle(bgData.color, bgData.opacity);
    bg.lineStyle(bgData.stroke, bgData.strokeColor, bgData.strokeOpacity);

    fillRect(bg, bgData.width, bgData.height, bgData.roundCorners, bgData.color, bgData.opacity, bgData.stroke, bgData.strokeColor);

    /*if(bgData.roundCorners == 0){
        let w = bgData.width;
        let h = bgData.height;
        bg.fillRect(-w*0.5, -h*0.5, w, h);

        if(bgData.stroke){
            bg.strokeRect(-w*0.5,-h*0.5,w,h);
        }
    }
    else{
        let w = bgData.width;
        let h = bgData.height;

        if( app.main.hasWebGL ){
            bg.fillRoundedRect(-w*0.5,-h*0.5,w,h, bgData.roundCorners, bgData.roundCorners);
            if(bgData.stroke){
                w+=bgData.stroke*0.5;
                h+=bgData.stroke*0.5;
                bg.strokeRoundedRect(-w*0.5,-h*0.5,w,h, bgData.roundCorners, bgData.roundCorners);
            }
        }
        else{
            if(bgData.stroke){
                let w2 = w + bgData.stroke;
                let h2 = h + bgData.stroke;
                bg.fillStyle(bgData.strokeColor);
                bg.fillRoundedRect(-w2*0.5,-h2*0.5,w2,h2, bgData.roundCorners, bgData.roundCorners);
                bg.fillStyle(bgData.color, bgData.opacity);
                bg.fillRoundedRect(-w*0.5, -h*0.5, w, h, bgData.roundCorners, bgData.roundCorners);
            }
        }
        
    }*/
    let textData = {color: textColor, align:'center', fontSize: 64, fontFamily: 'ui-font'};
    let txt = scene.add.text(0, 0, text, textData).setOrigin(0.5);

    //txt.setStroke('#000000', 6);
    //txt.setShadow(0, 4, '#333333', 2, true, false);
    let rd = textResponsiveData;

    txt.setScale(Math.min(bg.width*rd.wRatio/txt.width, bg.height*rd.hRatio/txt.height));
    txt.x = bg.width * (rd.xRatio-0.5);
    txt.y = bg.height * (rd.yRatio-0.5);

    btn.add(bg);
    btn.add(txt);

    btn.bg = bg;
    btn.text = txt;

    btn.width = bg.width;
    btn.height = bg.height;

    if(clickAction){
        btn.setInteractive(new Phaser.Geom.Rectangle(0,0, bgData.width, bgData.height), Phaser.Geom.Rectangle.Contains);
        btn.on("pointerdown", clickAction);
    }
    
    
    return btn;

}


function fillRect(bg, w, h, roundCorners, color, opacity, stroke, strokeColor){
    if(roundCorners == 0){
        bg.fillRect(-w*0.5, -h*0.5, w, h);

        if(stroke){
            bg.strokeRect(-w*0.5,-h*0.5,w,h);
        }
    }
    else{
        if( app.main.hasWebGL ){
            bg.fillRoundedRect(-w*0.5,-h*0.5,w,h, roundCorners, roundCorners);
            if(stroke){
                w += stroke*0.5;
                h += stroke*0.5;
                bg.strokeRoundedRect(-w*0.5,-h*0.5,w,h, roundCorners, roundCorners);
            }
        }
        else{
            if(stroke){
                let w2 = w + stroke;
                let h2 = h + stroke;
                bg.fillStyle(strokeColor);
                bg.fillRoundedRect(-w2*0.5,-h2*0.5,w2,h2, roundCorners, roundCorners);
                bg.fillStyle(color, opacity);
                bg.fillRoundedRect(-w*0.5, -h*0.5, w, h, roundCorners, roundCorners);
            }
        }
    }
}
export default buttonMaker;