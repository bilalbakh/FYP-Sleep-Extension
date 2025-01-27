//Retrieve blocked site information
chrome.storage.sync.get(["blockedSites", "softBlock"], (items) => {
  let blockedSites = [];
  if (items.blockedSites) {
    blockedSites = items.blockedSites.split(",");
    for (let i = 0; i < blockedSites.length; i++) {
      blockedSites[i] = blockedSites[i].trim();
    }
  } else {
    blockedSites = [];
  }
  const softBlock = items.softBlock;

  blockedSites.forEach((site) => {
    if (softBlock) {
      window.location.href = chrome.runtime.getURL("softblock.html");
    } else {
      window.location.href = chrome.runtime.getURL("hardblock.html");
    }
  });
});
