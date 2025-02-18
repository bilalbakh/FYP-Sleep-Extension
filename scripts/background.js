function checkBedtime() {
  chrome.storage.sync.get(["bedtime", "repeatDays"], (items) => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentTime = now.toTimeString().slice(0, 5);

    if (
      items.bedtime &&
      items.repeatDays.includes(currentDay) &&
      currentTime >= items.bedtime
    ) {
      // Enable blocking
    }
  });
}

function sendReminder() {
  chrome.storage.sync.get(["customMessage", "notificationStyle"], (items) => {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "Images/hello_extensions.png",
      title: "Sleep Reminder",
      message: items.customMessage || "Time to prepare for bed!",
    });
  });
}
