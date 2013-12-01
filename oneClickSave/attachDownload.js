"use strict";
var imgs = document.querySelectorAll("img");
var imgsLength = imgs.length;

for(var i = 0; i < imgsLength; i++) {
    imgs[i].addEventListener("click", function(ev) {
        //リンクなどをキャンセル
        ev.stopPropagation();
        ev.preventDefault();
        
        console.dir(this.src);
        chrome.runtime.sendMessage(this.src);
    });
}
