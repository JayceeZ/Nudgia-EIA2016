var notification = {

  sendNotification: function(message) {
    cordova.plugins.notification.local.schedule({
      id: 1,
      title: "Production Jour fixe",
      text: "Duration 1h",
      firstAt: monday_9_am,
      every: "week",
      sound: "file://sounds/reminder.mp3",
      icon: "http://icons.com/?cal_id=1",
      data: {meetingId: "123#fg8"}
    });
  },

  addListenerToNotification: function(callback) {
    cordova.plugins.notification.local.on("click", callback);
  }
};