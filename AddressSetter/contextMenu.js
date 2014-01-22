"use strict";
var UPDATE_REQUEST = "update_context_menu";
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

chrome.runtime.onInstalled.addListener(function() {
    storage.get(function(items) {
        if(items["contextItems"] == null) {
            var items = {
                "contextItems": {
                    "名前": "name",
                    "メールアドレス": "mail",
                    "メールアドレス2": "mail2",
                    "住所": "address",
                    "テンプレート": "template"
                }
            };
            storage.set(items);
        }
    });
});

var createContextMenu = function() {
    var CreateProperties = function (id) {
        this.id = id;
        this.title = id;
        this.contexts = ["editable"];
    };
    
    storage.get(function(items) {
        var contextItems = items["contextItems"];
        for(var key in contextItems) {
            chrome.contextMenus.create(new CreateProperties(key));
        }
    });
};

chrome.runtime.onMessage.addListener(function(message) {
    if(message == UPDATE_REQUEST) {
        createContextMenu();
    }
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

//chrome.runtime.onStartup.addListener(function() {
//    chrome.contextMenus.create(new CreateProperties("name", "名前"));
//    chrome.contextMenus.create(new CreateProperties("e_mail_1", "メールアドレス1"));
//    chrome.contextMenus.create(new CreateProperties("e_mail_2", "メールアドレス2"));
//    chrome.contextMenus.create(new CreateProperties("address", "住所"));
//    chrome.contextMenus.create(new CreateProperties("template", "テンプレート"));
//
//});
