var bannerMaker = {};

/*uses bitmap font*/
bannerMaker.addBannerBitmapText=function(data){
    
    var scene = data.scene,
        str = data.str,
        fontName = data.fontName,
        backImage = data.backImage,
        backColor = data.backColor||"0x000000",
        fontColor = data.fontColor||"0xffffff";
    
    var bannerWidth=540;
    var bannerHeight=60;
    
    var banner={};
    
    banner.height=bannerHeight;
    ///has back image or use graphics
    if(backImage){
        banner.bg= scene.add.image(0,0,backImage.texture,backImage.frame).setOrigin(0.5,0);
    }
    else{
        banner.bg= scene.add.graphics();
    }
    
    var text=scene.add.bitmapText(0,0,fontName,str);
    banner.text=text;
    
    text.baseWidth=text.width;
    text.baseHeight=text.height;
    
    banner.bg.onResizeCallback = function(w,h){
        
        var bg= banner.bg;
        var text= banner.text;
        
        bannerHeight=h*0.1;
        if(h>w){
            bannerHeight=h*0.06;
        }
        var scale=(w/bannerWidth);
        
        if(scale>1){
            scale=1;
        }
        if(w>h){
            //scale*=0.7;
        }
        var scaledWidth= bannerWidth*scale;
        var scaledHeight= bannerHeight*scale;
        
        if(backImage){
            bg.setScale((w+100)/bg.width,scaledHeight/bg.height);
            bg.x=w/2;
            bg.y=0;
        }
        else{
            bg.clear();
            bg.x=0;
            bg.y=0;
            bg.fillStyle(backColor);
            bg.fillRect(0,0,w,scaledHeight);
        }
        
        var textScale= Math.min(w*0.9/text.baseWidth,scaledHeight*0.9/text.baseHeight);
        text.setScale(textScale);
        
        text.x=w*0.5-text.width*0.5;
        text.y=scaledHeight*0.5-text.height*0.5;
        
        
        banner.height=scaledHeight;
        
    }
    
    
    if(data.backColor && backImage){
        banner.bg.setTintFill(backColor);
    }
    
    if(data.fontColor){
        text.setTint(fontColor);
    }
    
    return banner;
}

bannerMaker.addBottomBanner = function( scene, texture="atlas", frame, bgColor = 0xffffff, heightPercent=0.15 ){
    let bg = scene.add.graphics();
    let bottomBanner = scene.add.image(0,0, texture, frame).setOrigin(0.5, 1);        
    bottomBanner.bg = bg;

    scene.input.on("pointerdown",function( pointer ){
        if(pointer.y > app.main.lastHeight*(1-heightPercent)){
            main.gotoLink();
        }
    });

    bottomBanner.onResizeCallback = function(w, h){
        let scale = Math.min(w/this.width, h*heightPercent/this.height);
        this.setScale( scale );
        this.x = w*0.5;
        this.y = h;

        this.bg.clear();
        this.bg.fillStyle(bgColor);
        let bh = this.height*this.scaleY;
        this.bg.fillRect(0, h-bh, w, bh);
    }

    bottomBanner.onResizeCallback( scene.lastWidth || 500, scene.lastheight || 800);

    bottomBanner.hide = function(duration = 350){
        if(!duration){
            bottomBanner.visible = false;
            bottomBanner.bg.visible = false;
            bottomBanner.alpha = 0;
            bottomBanner.bg.alpha = 0;
            return;
        }

        scene.tweens.add({
            targets:[bottomBanner, bottomBanner.bg],
            alpha:0,
            duration,
        })
    }

    bottomBanner.show = function(duration = 350){
        bottomBanner.visible = true;
        bottomBanner.bg.visible = true;
        if(!duration){
            bottomBanner.alpha = 1;
            bottomBanner.bg.alpha = 1;
            return;
        }

        scene.tweens.add({
            targets:[bottomBanner, bottomBanner.bg],
            alpha:1,
            duration,
        })
    }
    return bottomBanner;
}

/*uses regular font*/
bannerMaker.addBanner = function(data){
    
    
    var scene=data.scene,
        str=data.str,
        fontName=data.fontName,
        backImage=data.backImage,
        heightPercent=data.heightPercent || 0.1,
        backColor=data.backColor||"0x000000",
        fontColor=data.fontColor||"0xffffff";
    
    var bannerWidth=540;
    var bannerHeight=60;
    
    var banner={};
    
    banner.height=bannerHeight;
    ///has back image or use graphics
    if(backImage){
        banner.bg= scene.add.image(0,0,backImage.texture,backImage.frame).setOrigin(0.5,0);
    }
    else{
        banner.bg= scene.add.graphics();
    }
    
    var textData={color:fontColor.replace("0x","#"), align:'center', fontSize: 64, fontFamily: fontName};
    
    //var text=scene.add.bitmapText(0,0,fontName,str);
    var text=scene.add.text(0,0,str,textData).setOrigin(0.5);
    banner.text=text;
    
    text.baseWidth = text.width;
    text.baseHeight = text.height;
    
    banner.bg.onResizeCallback = function(w,h){
        
        var bg= banner.bg;
        var text= banner.text;
        
        bannerHeight=h*heightPercent;
        if(h>w){
            //bannerHeight=h*0.06;
            bannerHeight*=0.6;
        }
        var scale=(w/bannerWidth);
        
        if(scale>1){
            scale=1;
        }
        if(w>h){
            //scale*=0.7;
        }
        var scaledWidth= bannerWidth*scale;
        var scaledHeight= bannerHeight*scale;
        
        if(backImage){
            bg.setScale((w+100)/bg.width,scaledHeight/bg.height);
            bg.x=w/2;
            bg.y=0;
        }
        else{
            bg.clear();
            bg.x=0;
            bg.y=0;
            bg.fillStyle(backColor);
            bg.fillRect(0,0,w,scaledHeight);
        }
        
        var textScale= Math.min(w*0.9/text.baseWidth,scaledHeight*0.9/text.baseHeight);
        text.setScale(textScale);
        
        text.x=w*0.5//-text.width*0.5;
        text.y=scaledHeight*0.5//-text.height*0.5;
        
        
        banner.height=scaledHeight;
        
    }
    
    
    if(data.backColor && backImage){
        banner.bg.setTintFill(backColor);
    }
    
    if(data.fontColor){
        text.setTint(fontColor);
    }

    banner.hide = function(duration = 350){
        if(!duration){
            banner.text.visible = false;
            banner.bg.visible = false;
            banner.text.alpha = 0;
            banner.bg.alpha = 0;
            return;
        }

        scene.tweens.add({
            targets:[banner.text, banner.bg],
            alpha:0,
            duration,
        });
    }

    banner.show = function(duration = 350){
        banner.text.visible = true;
        banner.bg.visible = true;
        if(!duration){
            banner.alpha = 1;
            banner.bg.alpha = 1;
            return;
        }
        
        scene.tweens.add({
            targets:[banner.text, banner.bg],
            alpha:1,
            duration,
        })
    }
    
    return banner;
}

export default bannerMaker;