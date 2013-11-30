"use strict";
addEventListener("load", function() {
    var checkBox = document.getElementById("checkBox");
    checkBox.checked = Boolean(localStorage.getItem("checked"));
    checkBox.addEventListener("change", function() {
        var checked = (this.checked) ? "1" : "";
        localStorage.setItem("checked", checked);
        chrome.runtime.onMessage.addListener(function(elem) {
            chrome.downloads.download(elem);
        });
        if(checkBox.checked == true) {
           chrome.tabs.executeScript(null, {file: "attachDownload.js"});
       }
    });
    
});