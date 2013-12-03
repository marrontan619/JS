"use strict";
addEventListener("load", function() {
    var checkBox = document.getElementById("checkBox");
    checkBox.checked = Boolean(localStorage.getItem("checked"));
    checkBox.addEventListener("change", function() {
        var checked = this.checked ? "1" : "";
        localStorage.setItem("checked", checked);
        if (checkBox.checked) {
            chrome.runtime.onMessage.addListener(function(request) {
                //ポップアップ（の開発者ツールとしてウインドウ）が開いていないと動かないので、要検討
                chrome.downloads.download(request);
            });
            chrome.tabs.executeScript(null, {file: "attachDownload.js"});
       }
    });
    
});
