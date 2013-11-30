"use strict";
addEventListener("load", function() {
    var checkBox = document.getElementById("checkBox");
    checkBox.checked = Boolean(localStorage.getItem("checked"));
    checkBox.addEventListener("change", function() {
        var checked = this.checked ? "1" : "";
        localStorage.setItem("checked", checked);
        if (checkBox.checked) {
            chrome.runtime.onMessage.addListener(function(title) {
                chrome.downloads.download(localStorage.getItem(title));
            });
            chrome.tabs.executeScript(null, {file: "attachDownload.js"});
       }
    });
    
});
