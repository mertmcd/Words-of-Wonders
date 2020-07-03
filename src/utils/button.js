var buttonMaker = {};

buttonMaker.addButton = function(
    scene, bgTexture, bgFrame, str, textColor = "#ffffff", clickAction, 
    textData = {
        xRatio:0.5,
        yRatio:0.45,
        wRatio:0.8,
        hRatio:0.8,

        hasStroke: true,
        strokeColor: "#000000",
        strokePower: 6,
        
        hasShadow: true,
        shadowX: 0,
        shadowY: 8,
        shadowColor: "#333333",
        shadowBlur: 2
    }
    
){
    
    let btn = scene.add.container();

    //let bg = scene.add.image(0,0,"atlas", bgFrame);
    let bg = scene.add.image(0,0, bgTexture, bgFrame);

    let txt = scene.add.text(0, 0, str, {color: textColor, align:'center', fontSize: 64, fontFamily: 'ui-font'}).setOrigin(0.5);

    if(textData.hasStroke){
        txt.setStroke( textData.strokeColor, textData.strokePower );
    }
    if(textData.hasShadow){
        txt.setShadow( textData.shadowX, textData.shadowY, textData.shadowColor, textData.shadowBlur, textData.hasStroke, !textData.hasStroke );
    }
    //txt.setStroke('#000000', 6);
    //txt.setShadow(0, 4, '#333333', 2, true, false);
    let rd = textData;

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
        shadowY:5,
        shadowColor:0,
        shadowOpacity:0.5,
    },
    textData = {
        xRatio:0.5,
        yRatio:0.45,
        wRatio:0.8,
        hRatio:0.8,

        hasStroke: true,
        strokeColor: "#000000",
        strokePower: 6,
        
        hasShadow: true,
        shadowX: 0,
        shadowY: 8,
        shadowColor: "#333333",
        shadowBlur: 2
    }
    
){
    
    bgData.stroke = bgData.stroke || 0;
    let btn = scene.add.container();

    let bg = scene.add.graphics( );

    bg.width = bgData.width;
    bg.height = bgData.height;
    
    if(bgData.shadowX || bgData.shadowY){
        fillRect(bg, bgData.width+bgData.stroke*2, bgData.height+bgData.stroke*2, bgData.roundCorners, bgData.shadowColor, bgData.shadowOpacity, null, 0,0, bgData.shadowX, bgData.shadowY);
        
    }
    
    fillRect(bg, bgData.width, bgData.height, bgData.roundCorners, bgData.color, bgData.opacity, bgData.stroke, bgData.strokeColor, bgData.strokeOpacity);

    
    let txt = scene.add.text(0, 0, text, {color: textColor, align:'center', fontSize: 64, fontFamily: 'ui-font'}).setOrigin(0.5);

    if(textData.hasStroke){
        txt.setStroke( textData.strokeColor, textData.strokePower );
    }
    if(textData.hasShadow){
        txt.setShadow( textData.shadowX, textData.shadowY, textData.shadowColor, textData.shadowBlur, textData.hasStroke, !textData.hasStroke );
    }
    //txt.setStroke('#000000', 6);
    //txt.setShadow(0, 4, '#333333', 2, true, false);
    let rd = textData;

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


function fillRect(bg, w, h, roundCorners, color, opacity, stroke, strokeColor, strokeOpacity, dx = 0, dy = 0){

    bg.fillStyle(color, opacity);
    bg.lineStyle(stroke, strokeColor, strokeOpacity);

    let x = -w*0.5 + dx;
    let y = -h*0.5 + dy;

    if(roundCorners == 0){
        bg.fillRect( x, y, w, h);

        if(stroke){
            bg.strokeRect(x, y, w, h);
        }
    }
    else{
        if(!stroke){
            bg.fillRoundedRect( x, y, w, h, roundCorners, roundCorners);
        }
        else if( app.main.hasWebGL ){
            bg.fillRoundedRect( x, y, w, h, roundCorners, roundCorners);            
            w += stroke*0.5;
            h += stroke*0.5;
            bg.strokeRoundedRect(x, y,w,h, roundCorners, roundCorners);
            
        }
        else{
            let w2 = w + stroke;
            let h2 = h + stroke;
            bg.fillStyle(strokeColor, strokeOpacity);
            bg.fillRoundedRect(-w2*0.5,-h2*0.5,w2,h2, roundCorners, roundCorners);
            bg.fillStyle(color, opacity);
            bg.fillRoundedRect(-w*0.5, -h*0.5, w, h, roundCorners, roundCorners);
        }
    }
}
export default buttonMaker;