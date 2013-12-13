"use strict";
var attachDownload = function(ev) {
    if(ev.target.tagName == "IMG"){
        //リンクなどをキャンセル
        ev.stopPropagation();
        ev.preventDefault();
        
        //ダウンロード用のオブジェクトを作成して、popupに送る
        var srcImg = ev.target;
        var dlTarget = {
            url : srcImg.src,
            filename : (srcImg.title) ? srcImg.title : null
        };
        chrome.runtime.sendMessage(dlTarget);
    }
};

chrome.storage.local.get(function(items) {
    if(items["checked"]) {
        document.addEventListener("click", attachDownload);
        console.dir("attached");
    } else {
        document.removeEventListener("click", attachDownload);
        console.dir("detached");
    }
});