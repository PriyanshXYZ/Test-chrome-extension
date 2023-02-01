
//close tab after 120 mins are over
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    setTimeout(function() {
      chrome.tabs.remove(activeTab.id, function() {});
    }, 120*1000*60); // 120 mins
  });

// Listen for tab close events
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    // If the current tab is closed, open the popup
    if (tabId === parseInt(localStorage.getItem("currentTabID"))) {
        chrome.browserAction.setPopup({popup: "popup.html"});
        chrome.browserAction.openPopup();
    }
});

// Listen for window close events
chrome.windows.onRemoved.addListener(function(windowId) {
    // If the current window is closed, open the popup
    if (windowId === parseInt(localStorage.getItem("currentWindowID"))) {
        chrome.browserAction.setPopup({popup: "popup.html"});
        chrome.browserAction.openPopup();
    }
});
// Listen for changes in the current tab
chrome.tabs.onActivated.addListener(function(activeInfo) {
    // Get the current active tab
    chrome.tabs.get(activeInfo.tabId, function(tab) {
      // If the user switches to a different tab, show an alert
      if (tab.url !== 'https://w3schools.com/') {
        alert('Please do not switch tabs or leave the application.');
      }
    });
  });
  
  // Listen for changes in the current window
  chrome.windows.onFocusChanged.addListener(function(windowId) {
    // If the user switches to a different window, close the active tab
    if (windowId !== chrome.windows.WINDOW_ID_NONE) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.remove(tabs[0].id, function() {
              alert("The active tab has been closed. The test has ended.");
            });
          });
    }
  });
  
// Get the user's IP address
function getUserIP() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.ipify.org?format=json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText).ip);
          } else {
            reject(xhr.statusText);
          }
        }
      };
      xhr.send();
    });
  }
  
  // Store the user's IP address in local storage
  function storeUserIP(ip) {
    chrome.storage.local.set({ ip: ip }, function() {
      console.log(`IP address stored: ${ip}`);
    });
  }
  
  // Store the requirements check information in local storage
  function storeRequirementsCheck(check) {
    chrome.storage.local.set({ requirementsCheck: check }, function() {
      console.log(`Requirements check stored: ${check}`);
    });
  }
  
  // Get the user's IP address and store it in local storage
  getUserIP()
    .then(storeUserIP)
    .catch(error => console.error(error));
  
  // Store the requirements check information in local storage
  storeRequirementsCheck({ audio: true, camera: true, internetStability: true });
  