"use strict";
addEventListener("load", function() {
    var monospaceButton = document.getElementById("monospace");
    var largeButton = document.getElementById("large");
    var smallButton = document.getElementById("small");
    
    monospaceButton.addEventListener("click", function(){
        chrome.tabs.executeScript(null, {file: "monospace.js"});
    });
    
    largeButton.addEventListener("click", function(){
        chrome.tabs.executeScript(null, {file: "large.js"});
    });
});
