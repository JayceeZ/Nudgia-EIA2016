var notification = {

  sendNotification: function(pictureId) {
    cordova.plugins.notification.local.schedule({
      id: 1,
      title: "Hey, I took a picture of you :p",
      text: "Click me to watch it",
      sound: "file://sounds/reminder.mp3",
      icon: "http://icons.com/?cal_id=1",
      data: {pictureId: pictureId}
    });
    /*
    cordova.plugins.notification.local.update({
      id: 10,
      title: "Meeting in 5 minutes!"
    });
    */
  },

  addListenerToNotification: function(callback) {
    cordova.plugins.notification.local.on("click", callback);
  }
};