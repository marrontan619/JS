"use strict";
addEventListener("load", function() {
    //チェックボックスの状態についての処理
    var storage = chrome.storage.local;
    var checkBox = document.getElementById("checkBox");
    storage.get(function(items) {
        checkBox.checked = items["checked"];
    });
    //チェックボックスがクリックされたら、ローカルストレージを更新して、スクリプトを呼び出す
    checkBox.addEventListener("change", function() {
        var checked = this.checked ? true : false;
        storage.set({checked: checked});
        chrome.tabs.executeScript(null, {file: "attachDownload.js"});
    });
    
});
