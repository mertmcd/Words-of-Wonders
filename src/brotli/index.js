var unbrotli = require('./unbrotli');


function decompress(e,n){return unbrotli(_base64ToArrayBuffer(e))}

function _base64ToArrayBuffer(e){
    for(var n=window.atob(e),r=n.length,o=new Uint8Array(r),t=0;t<r;t++)o[t]=n.charCodeAt(t);return o
}


function decompressString(r){
    return new Promise(function(e,n){
        e(new TextDecoder("utf-8").decode(decompress(r)))
    })
}


var rawJs = require('../../build/htmls/brotli/main.br');
rawJs = rawJs.slice(13);

//var rawJs = require('!!url-loader!../br/luna.br');


window._compressedAssets = window._compressedAssets || []; window._compressedAssets.push( 
    decompressString(rawJs)
    .then( function( code ) { window.eval(code) } ) );

function callStart(){
    if(!app || !app.callOnLoad){
        setTimeout(callStart, 100);
        return;
    }

    app.callOnLoad();
};

window.addEventListener("load", function(){
    callStart();
})