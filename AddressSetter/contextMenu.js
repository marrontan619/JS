"use strict";
var storage = chrome.storage.local;

var onClickHandler = function(info, tab) {
    chrome.runtime.sendMessage({"status": "insert", "id": info.menuItemId, "tab": tab});
};

var CreateProperties = function (id) {
    this.id = id;
    this.title = id;
    this.contexts = ["editable"];
};

var createContextMenu = function() {
    storage.get("contextItems", function(items) {
        for(var key in items["contextItems"]) {
            chrome.contextMenus.create(new CreateProperties(key));
        }
    });
};

chrome.runtime.onStartup.addListener(function() {
    storage.get("contextItems", function(items) {
        if(items["contextItems"] == null) {
            var initialItems = {
                "contextItems": {
                    "名前": "name",
                    "メールアドレス": "mail",
                    "メールアドレス2": "mail2",
                    "住所": "address",
                    "テンプレート": "template"
                }
            };
            storage.set(initialItems);
        }
        createContextMenu();
    });
});

var updateContextMenu = function(request) {
    if (request["oldTitle"] != null) {
        chrome.contextMenus.remove(request["oldTitle"]);
    }
    createContextMenu();
};

chrome.runtime.onMessage.addListener(function(request) {
    if (request["status"] == "update") {
        updateContextMenu(request);
    }
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.executeScript(null, {file: "insertAction.js"});
});
