"use strict";
addEventListener("load", function() {
    var insertValue = function(request) {
        chrome.storage.local.get("contextItems", function(items) {
            var contextItems = items["contextItems"];
            var id = request["id"];
            document.activeElement.value += contextItems[id];
        });
    };
    chrome.runtime.onMessage.addListener(insertValue);
});
