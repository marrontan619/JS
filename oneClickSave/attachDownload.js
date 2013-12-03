"use strict";
var imgs = document.querySelectorAll("img");
var imgsLength = imgs.length;

for(var i = 0; i < imgsLength; i++) {
    imgs[i].addEventListener("click", function(ev) {
        //リンクなどをキャンセル
        ev.stopPropagation();
        ev.preventDefault();
        
        var dlTarget = {};
        dlTarget.url = this.src;
        dlTarget.filename = (this.title) ? this.title : null;
        console.dir(dlTarget);
        chrome.runtime.sendMessage(dlTarget, function(extension, response) {
            extension.download(response);
        });
    });
}
