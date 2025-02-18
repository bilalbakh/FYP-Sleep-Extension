// Modify content.js to properly check current URL:
chrome.storage.sync.get(["blockedSites", "softBlock"], (items) => {
  const currentUrl = window.location.hostname.replace(/^www\./, "");
  const blockedSites = items.blockedSites;
  alert(blockedSites);

  if (blockedSites.includes(currentUrl)) {
    if (items.softBlock) {
      window.location.href = chrome.runtime.getURL("pages/softblock.html");
    } else {
      window.location.href = chrome.runtime.getURL("pages/hardblock.html");
    }
  }
});
