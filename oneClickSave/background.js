chrome.runtime.onMessage.addListener(function(request) {
    chrome.downloads.download(request);
});