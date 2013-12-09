// アイテムがクリックされた時の動作を登録
function onClickHandler(info, tab) {
  if (info.menuItemId == "e-mail") {
      chrome.tabs.executeScript(null, {code: 'document.activeElement.value = val.eMail'});
  } else if (info.menuItemId == "name") {
      chrome.tabs.executeScript(null, {code: 'document.activeElement.value = "氏名"'});
  } else if (info.menuItemId == "address") {
      chrome.tabs.executeScript(null, {code: 'document.activeElement.value = "住所"'});
  } else if (info.menuItemId == "template") {
      chrome.tabs.executeScript(null, {code: 'document.activeElement.value = "テンプレート"'});
  }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// インストール時に作成
chrome.runtime.onInstalled.addListener(function() {
  
  chrome.contextMenus.create({"title": "氏名", "id": "name", "contexts": ["editable"]});
// 子要素を入れると、親要素がクリック出来ないので、今のところ凍結
//  chrome.contextMenus.create(
//      {"title": "苗字のみ", "parentId": "name", "id": "familyName", "contexts": ["editable"]});
//  chrome.contextMenus.create(
//      {"title": "名前のみ", "parentId": "name", "id": "firstName", "contexts": ["editable"]});

  chrome.contextMenus.create({"title": "メールアドレス", "id": "e-mail", "contexts": ["editable"]});
  chrome.contextMenus.create({"title": "住所", "id": "address", "contexts": ["editable"]});

  chrome.contextMenus.create({"title": "テンプレート", "id": "template", "contexts": ["editable"]});  
    
});