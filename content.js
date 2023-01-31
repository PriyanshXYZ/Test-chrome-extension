// content script
// Use the fullscreen API to activate fullscreen mode
function openFullscreen() {
  console.log("Clicked");
  window.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById("permission-btn");
    button.addEventListener('click', () => {
      document.body.requestFullscreen();
    });
  });
}

// Trigger the fullscreen mode
// document.getElementById("permission-btn").addEventListener("click", openFullscreen());
openFullscreen();

  
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
    const requirements = ["Audio", "Camera", "Internet stability"];
    const results = [];
  
    for (const requirement of requirements) {
      // Perform the appropriate check for each requirement
      switch (requirement) {
        case "Audio":
          if (navigator.mediaDevices.getUserMedia) {
            results.push(requirement + ": OK");
          } else {
            results.push(requirement + ": Not OK");
          }
          break;
        case "Camera":
          if (navigator.mediaDevices.getUserMedia) {
            results.push(requirement + ": OK");
          } else {
            results.push(requirement + ": Not OK");
          }
          break;
        case "Internet stability":
          // Code to check internet stability
          checkInternetStability(requirement, results);
          break;
        default:
          break;
      }
    }
    function checkInternetStability(requirement , results) {
        let startTime, endTime;
        const URL = "https://www.w3schools.com/";
      
        startTime = performance.now();
        fetch(URL)
          .then((response) => {
            endTime = performance.now();
            const latency = endTime - startTime;
            if (latency > 500) {
              results.push(requirement + ": Not OK");
            } else {
              results.push(requirement + ": OK");
            }
          })
          .catch((error) => {
            console.log(error);
            return;
          });
      }
      
    // Store the results in local storage
    localStorage.setItem("requirementCheckResults", JSON.stringify(results));
    return results;
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
  
  // Initialize the requirement check and other features when the extension is activated
  function init() {
    openFullscreen();
    checkRequirements();
    showPopup();
  }
  
  init();
  
  