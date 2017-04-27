document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.create({'url': chrome.extension.getURL('visualizer.html')},function(){});
    //   chrome.tabs.create({'url': chrome.extension.getURL('popup.html')});
  // var visualizerPage = chrome.extension.getURL("/views/visualizer.html");
});



