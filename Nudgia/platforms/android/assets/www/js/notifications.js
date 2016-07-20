var notification = {
  TAKE_ONE: {
    title: "Hey, I took a picture of you :p",
    text: "Click me to watch it"
  },
  TAKE_MULTIPLES: {
    title: "Hey, I took some pictures of you :p",
    text: "Click me to watch them"
  },
  notificationId: null,

  sendNotification: function() {
    app.logDebug("Sending notification");
    this.notificationId = 1;
    window.cordova.plugins.notification.local.schedule({
      id: 1,
      title: this.TAKE_ONE.title,
      text: this.TAKE_ONE.title
    });
    app.logDebug("Notification sent");
  },

  updateNotificationIfexist: function() {
    if(this.notificationId) {
      window.cordova.plugins.notification.local.update({
        id: this.notificationId,
        title: this.TAKE_MULTIPLES.title,
        text: "Click me to watch them"
      });
    } else {
      this.sendNotification();
    }
  },

  addListenerToNotification: function(callback) {
    cordova.plugins.notification.local.on("click", callback);
  }
};