"use strict";
var imgs = document.querySelectorAll("img");
var imgsLength = imgs.length;
for(var i = 0; i < imgsLength; i++) {
    imgs[i].addEventListener("click", function(ev) {
        //リンクなどをキャンセル
        ev.stopPropagation();
        ev.preventDefault();
        

        //ここから不明
        //このブロック内だと、imgs[i]は無効
        chrome.downloads.download(this.src);
    });
}

//保存モードになっていることをわかりやすく
for(var i = 0; i < imgsLength; i++) {
    imgs[i].addEventListener("mouseover", function() {
        var cat = chrome.extension.getURL("cat.png");
        console.dir(cat);
        //クォートのなかで変数展開する方法あとで調べる
//        this.style.cursor = this.src;
    });
}