"use strict";
var imgs = document.querySelectorAll("img");
var imgsLength = imgs.length;

for(var i = 0; i < imgsLength; i++) {
    imgs[i].addEventListener("click", function(ev) {
        //リンクなどをキャンセル
        ev.stopPropagation();
        ev.preventDefault();
        
//        console.dir(this.title);
        localStorage.setItem(this.title, this);
        chrome.runtime.sendMessage(this.title);
    });
}
