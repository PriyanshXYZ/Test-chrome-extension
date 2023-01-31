// Store the start time of the test
let startTime;

// Store the end time of the test
let endTime;

// Store the ID of the active tab
let activeTabId;

// Store the ID of the window
let activeWindowId;

// Listen for the browser action to be clicked
// chrome.action.onClick.addListener((tab)=> {
//   chrome.tabs.create({url: "https://www.youtube.com"});
//   // // Store the ID of the active tab
//   // activeTabId = tab.id;

//   // // Store the ID of the active window
//   // activeWindowId = tab.windowId;

//   // // Store the start time of the test
//   // startTime = Date.now();

//   // // Set the active window to full screen mode
//   // chrome.windows.update(activeWindowId, {state: "fullscreen"});

//   // // Prevent the user from closing the active tab
//   // chrome.tabs.executeScript(activeTabId, {
//   //   code: "window.onbeforeunload = function () { return 'You cannot close the tab during the test.'; };"
//   // });

//   // Listen for changes to the active tab
//   chrome.tabs.onActivated.addListener(function (activeInfo) {
//     // Show the popup if the active tab has changed
//     if (activeTabId !== activeInfo.tabId) {
//       chrome.browserAction.setPopup({tabId: activeTabId, popup: "popup.html"});
//     }
//   });
// });

// Listen for a message from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case "endTest":
      // Store the end time of the test
      endTime = Date.now();

      // Allow the user to close the tab
      chrome.tabs.executeScript(activeTabId, {
        code: "window.onbeforeunload = null;"
      });

      // Store the test data in local storage
      chrome.storage.local.set({
        startTime: startTime,
        endTime: endTime
      });

      // Reset the start time and end time
      startTime = null;
      endTime = null;
      break;
  }
});
