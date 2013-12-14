"use strict";
addEventListener("load", function() {
    document.addEventListener("click", function(ev) {
        chrome.storage.local.get(function(items) {
            if(items["checked"] && ev.target.tagName == "IMG") {
                //リンクなどをキャンセル
                ev.stopPropagation();
                ev.preventDefault();
                
                //ダウンロード用のオブジェクトを作成して、backgrounds.jsに送る
                var srcImg = ev.target;
                var dlTarget = {
                    url : srcImg.src,
                    filename : (srcImg.title) ? srcImg.title : null
                };
                chrome.runtime.sendMessage(dlTarget);
            }
        });
    });
});
