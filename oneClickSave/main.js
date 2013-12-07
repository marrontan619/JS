"use strict";
addEventListener("load", function() {
    //チェックボックスの状態についての処理
    var checkBox = document.getElementById("checkBox");
    checkBox.checked = Boolean(localStorage.getItem("checked"));
    //チェックボックスがクリックされたら、ローカルストレージを更新して、スクリプトを呼び出す
    checkBox.addEventListener("change", function() {
        var checked = this.checked ? "1" : "";
        localStorage.setItem("checked", checked);
        chrome.runtime.onMessage.addListener(function(request) {
            //ポップアップ（の開発者ツールとしてウインドウ）が開いていないと動かないので、要検討
            chrome.downloads.download(request);
        });
        chrome.tabs.executeScript(null, {file: "attachDownload.js"});
    });
    
});
