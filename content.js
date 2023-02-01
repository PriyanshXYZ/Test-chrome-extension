// Use the fullscreen API to activate fullscreen mode
// Get the "Enter Fullscreen" and "End Test" buttons
const permissionButton = document.querySelector('#permissionButton');
const endTestButton = document.querySelector('.end-test-button');

// Handle the "Enter Fullscreen" button click
permissionButton.addEventListener('click', function() {
  checkFullScreen();
  checkRequirements();
  showPopup();
});
  
// Handle the "End Test" button click
endTestButton.addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.remove(tabs[0].id, function() {
      alert("The active tab has been closed. The test has ended.");
    });
  });
});


  // Prevent multiple tabs from being opened
  window.onbeforeunload = function () {
    alert("You can only have one tab open.");
  };
  
  // Disable normal close button and shortcut keys
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";
  });
  
  // Check for audio, camera, and internet stability
  function checkRequirements() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        window.localStream = stream;
        window.localAudio.srcObject = stream;
        window.localAudio.autoplay = true;
      })
      .catch((err) => {
        console.error(`you got an error: ${err}`);
      });
  }
  
  // Show a pop-up when the user switches between tabs or applications
  function showPopup() {
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        // Show the pop-up
        alert("You have switched the tab!");
      }
    });
  }
  function checkFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  }
  
  
  