chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.executeScript(null, {file: "attachDownload.js"});
});

chrome.runtime.onMessage.addListener(function(request) {
    chrome.downloads.download(request);
});