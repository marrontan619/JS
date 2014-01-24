"use strict";
var storage = chrome.storage.local;

// アイテムがクリックされた時の動作を登録
function onClickHandler(info, tab) {
  if (info.menuItemId == "e_mail_1") {
      chrome.tabs.executeScript(null, {code: 'chrome.storage.local.get(function(items) {document.activeElement.value += items["e_mail_1"]})'});
  } else if (info.menuItemId == "e_mail_2") {
      chrome.tabs.executeScript(null, {code: 'chrome.storage.local.get(function(items) {document.activeElement.value += items["e_mail_2"]})'});
  } else if (info.menuItemId == "name") {
      chrome.tabs.executeScript(null, {code: 'chrome.storage.local.get(function(items) {document.activeElement.value += items["name"]})'});
  } else if (info.menuItemId == "address") {
      chrome.tabs.executeScript(null, {code: 'chrome.storage.local.get(function(items) {document.activeElement.value += items["address"]})'});
  } else if (info.menuItemId == "template") {
      chrome.tabs.executeScript(null, {code: 'chrome.storage.local.get(function(items) {document.activeElement.value += items["template"]})'});
  }
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

chrome.runtime.onInstalled.addListener(function() {
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
