"use strict";
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url.search(/^https:\/\/mail\.google\.com\/mail/) > -1) {
    chrome.pageAction.show(tabId);
  }
});
