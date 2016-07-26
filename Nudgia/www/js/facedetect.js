/**
 * Created by isoard on 7/24/16.
 */

var faceDetect = {
  tracker: new tracking.ObjectTracker(['face', 'eye', 'mouth']),
  hiddenPicture: null,

  init: function() {
    faceDetect.tracker.on('track', function (event) {
      app.logDebug("Track event " + JSON.stringify(event));
      if (event.data.length === 0) {
        // No targets were detected in this frame.
        app.logDebug("No objects found");

        window.resolveLocalFileSystemURL(faceDetect.hiddenPicture, function (file) {
          file.remove(function () {
            app.logDebug(faceDetect.hiddenPicture + " deleted because no faces");
          });
        });

      } else {
        app.logDebug("Objects found");
        event.data.forEach(function (data) {
          // Plots the detected targets here.
          app.logDebug("Objects: " + JSON.toString(data));
          notification.sendNotification();
        });
      }
    });
    faceDetect.picture = document.getElementById("picture");
    faceDetect.picture.addEventListener("load", function () {
      tracking.track("#picture", faceDetect.tracker);
    });
    app.logDebug("Listener for objects added");
  },

  detectFace: function(imgUrl) {
    app.logDebug("Face detection");
    faceDetect.picture.src = imgUrl;
  }
};