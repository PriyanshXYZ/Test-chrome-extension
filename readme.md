# Test Extension

A browser extension that provides a controlled environment for testing purposes. This extension is designed to work with specific URLs, and provides a full-screen mode for the browser, prevents opening multiple tabs, and captures user-related information for testing purposes.

## Features
- Works only in selected URLs during a specific time/trigger.
- Opens the browser in full screen mode.
- Shows a pop-up when someone switches between two tabs or applications.
- Prevents opening more than one tab.
- Prevents closing the tab by the normal close button and shortcut keys. The user can only close the tab by clicking on the "End Test" button.
- Does an initial requirement check when the extension is activated, including:
  - Audio
  - Camera
  - Internet stability
- Captures user-related information in local storage, including:
  - IP address
  - Results of the requirement check

## Installation
To install this extension, follow these steps:

1. Clone this repository to your local machine.
2. Go to your browser's extensions page (e.g. chrome://extensions in Google Chrome).
3. Turn on the Developer mode.
4. Click on "Load Unpacked" and select the cloned repository folder.
5. The extension should now be installed and available for use.

## Usage
To use this extension, follow these steps:

1. Navigate to a URL that the extension is set to work with.
2. The browser will automatically open in full screen mode.
3. You will not be able to open more than one tab, or close the current tab by the normal close button or shortcut keys.
4. The extension will perform an initial requirement check for Audio, Camera, and Internet stability.
5. Information related to the user (e.g. IP address, requirement check results) will be captured in local storage.

## Contributions
I welcome contributions to this project. If you have any suggestions or bug reports, please open an issue or submit a pull request.


