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
        }
        chrome.runtime.sendMessage(dlTarget);
    }
}

//popup.htmlのチェックボックスの状態を判定できる方法検討中
//console.dir(localStorage.getItem("checked"));
//if (Boolean(localStorage.getItem("checked"))) {
    document.addEventListener("click", attachDownload);
//} else {
//    document.removeEventListener("click", attachDownload);
//}