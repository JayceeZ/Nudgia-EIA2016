/**
 * Created by isoard on 7/24/16.
 */

var faceDetect = {
  tracker: new tracking.ObjectTracker(['face', 'eye', 'mouth']),
  currentImg: null,

  init: function() {
    faceDetect.tracker.on('track', function (event) {
      if (event.data && event.data.length === 0) {
        // No targets were detected in this frame.
        app.logDebug("No objects found");

        resolveLocalFileSystemURL(faceDetect.currentImg, function (file) {
          file.remove(function () {
            app.logDebug(faceDetect.currentImg + " deleted because no faces");
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
    app.logDebug("Listener for objects added");
  },

  detectFace: function(imgUrl) {
    app.logDebug("Face detection");
    faceDetect.currentImg = imgUrl;
    if(!imgUrl) {
      var pictureDOM = document.getElementById("picture");
      pictureDOM.addEventListener("load", function () {
        tracking.track("#picture", faceDetect.tracker);
      });
    } else {
      var oReq = new XMLHttpRequest();
      app.logDebug("Image at "+imgUrl);
      oReq.open("GET", imgUrl, true);
      oReq.responseType = "arraybuffer";
      oReq.onload = function (oEvent) {
        app.logDebug(oReq.response);
        var arrayBuffer = oReq.response; // Note: not oReq.responseText
        if (arrayBuffer) {
          var clamped = new Uint8ClampedArray(arrayBuffer, 0, arrayBuffer.length);
          faceDetect.tracker.track(clamped);
        }
      };
      oReq.send(null);
    }
  }
};