// saves options to chrome.storage
const saveOptions = () => {
  const bedtime = document.getElementById("bedtime").value;
  const reminder = document.getElementById("reminder").value;
  const repeatDays = Array.from(
    document.querySelectorAll('input[name="repeat-day"]:checked')
  ).map((checkbox) => checkbox.value);
  const blockedSitesInput = document.getElementById("blockedSites").value;
  const blockedSites = blockedSitesInput
    .split(",")
    .map((site) => site.trim())
    .map((site) => {
      // Remove protocol and www to get the domain only
      return site.replace(/^(https?:\/\/)?(www\.)?/, "");
    })
    .join(", ");
  const softBlock = document.getElementById("softBlock").checked;
  const notificationFrequency = document.getElementById(
    "notificationFrequency"
  ).value;
  const notificationStyle = document.getElementById("notificationStyle").value;
  const customMessage = document.getElementById("customMessage").value;
  const pauseExtension = document.getElementById("pauseExtension").checked;
  const darkMode = document.getElementById("darkMode").checked;

  chrome.storage.sync.set(
    {
      bedtime,
      reminder,
      repeatDays,
      blockedSites,
      softBlock,
      notificationFrequency,
      notificationStyle,
      customMessage,
      pauseExtension,
      darkMode,
    },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(() => {
        status.textContent = "";
        location.replace(location.href);
      }, 750);
    }
  );
};

// restores options from chrome.storage
const restoreOptions = () => {
  chrome.storage.sync.get(
    {
      bedtime: "",
      reminder: "",
      repeatDays: [],
      blockedSites: "",
      softBlock: false,
      notificationFrequency: "",
      notificationStyle: "",
      customMessage: "",
      pauseExtension: false,
      darkMode: false,
    },
    (items) => {
      document.getElementById("bedtime").value = items.bedtime;
      document.getElementById("reminder").checked = items.reminder;
      document.getElementById("blockedSites").value = items.blockedSites;
      document.getElementById("softBlock").checked = items.softBlock;
      document.getElementById("notificationFrequency").value =
        items.notificationFrequency;
      document.getElementById("notificationStyle").value =
        items.notificationStyle;
      document.getElementById("customMessage").value = items.customMessage;
      document.getElementById("pauseExtension").checked = items.pauseExtension;
      document.getElementById("darkMode").checked = items.darkMode;

      const repeatCheckboxes = document.querySelectorAll(
        'input[name="repeat-day"]'
      );
      repeatCheckboxes.forEach((checkbox) => {
        checkbox.checked = items.repeatDays.includes(checkbox.value);
      });
    }
  );
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);

//Based on Code from https://developer.chrome.com/docs/extensions/develop/ui/options-page#:~:text=Users%20can%20access%20the%20options,then%20selecting%20the%20options%20link.
