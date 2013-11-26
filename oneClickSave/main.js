"use strict";
addEventListener("load", function() {
    var checkBox = document.getElementById("checkBox");
    checkBox.addEventListener("change", function() {
       if(checkBox.checked == true) {
           chrome.tabs.executeScript(null, {file: "attachDownload.js"});
       }
        
    });
    
});