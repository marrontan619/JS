"use strict";
var imgs = document.querySelectorAll("img");
var imgsLength = imgs.length;
for(var i = 0; i < imgsLength; i++) {
    imgs[i].addEventListener("click", function(ev) {
        //リンクなどをキャンセル
        ev.stopPropagation();
        ev.preventDefault();
        
//        //保存モードになっていることをわかりやすく
//        imgs[i].addEventListener("mouseover", function() {
//            imgs[i].style.cursor = "cat.png";
//        });
        
        //ここから不明
        //このブロック内だと、imgs[i]は無効？
        chrome.downloads.download(imgs[i].src);
    });
}