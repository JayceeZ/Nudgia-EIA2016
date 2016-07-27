var notification = {
  TAKE_ONE: {
    title: "Hey, I took a picture of you :p",
    text: "Click me to watch it"
  },

  sendNotification: function() {
    log.addLog("Sending notification");
    window.cordova.plugins.notification.local.schedule({
      id: 1,
      title: this.TAKE_ONE.title,
      text: this.TAKE_ONE.title
    });
    log.addLog("Notification sent");
  },

  addListenerToNotifications: function(callback) {
    cordova.plugins.notification.local.on("click", callback);
  }
};