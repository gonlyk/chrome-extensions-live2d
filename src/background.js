chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo && changeInfo.status === 'complete') {
    chrome.tabs.query({ // 查找当前tab
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (tabs.length === 0) return
      chrome.storage.local.get('active-live2d', function (live2d) {
        console.log(live2d)
        if (JSON.stringify(live2d) === '{}') return

        chrome.tabs.sendMessage(tabs[0].id, live2d['active-live2d'])
      })
    })
  }
});