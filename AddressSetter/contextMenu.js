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

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onStartup.addListener(function() {
    var CreateProperties = function (id, title, parentId) {
        this.id = id;
        this.title = title;
        this.contexts = ["editable"];
        this.parentId = parentId;
    };
    chrome.contextMenus.create(new CreateProperties("name", "名前"));
    chrome.contextMenus.create(new CreateProperties("e_mail_1", "メールアドレス1"));
    chrome.contextMenus.create(new CreateProperties("e_mail_2", "メールアドレス2"));
    chrome.contextMenus.create(new CreateProperties("address", "住所"));
    chrome.contextMenus.create(new CreateProperties("template", "テンプレート"));

});
