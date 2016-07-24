

var pictureTaker = {
  speed_margin: 0.6, // default
  lastSpeed: null,
  alreadyTakenOne: true,

  options: {
    dirName: "CameraPictureBackground", // foldername
    orientation: "portrait", // landscape or portrait
    type: "front", // back or front,
    name: "Nudgia "+app.myReportIndex+" " // image suffix
  },

  speedInput: function (speed) {
    app.logDebug("Speed input to picture taker [" + speed + "] (threshold="+pictureTaker.speed_margin+")");
    if (pictureTaker.__shouldTakePhoto()) {
      app.logDebug("Should take picture");
      if (!pictureTaker.alreadyTakenOne) {
        // If not already taken (limit to only one per event)
        pictureTaker.alreadyTakenOne = true;
        pictureTaker.takePicture();
      }
    } else if (parseFloat(speed) > pictureTaker.speed_margin) {
      app.logDebug("Allow picture");
      pictureTaker.alreadyTakenOne = false;
    }
    pictureTaker.lastSpeed = parseFloat(speed);
  },

  __shouldTakePhoto: function () {
    return pictureTaker.lastSpeed && pictureTaker.lastSpeed <= pictureTaker.speed_margin;
  },

  takePicture: function (somethingElse) {
    app.logDebug("Taking picture");
    window.plugins.CameraPictureBackground.takePicture(function(data) {
      pictureTaker.onSuccess(data, somethingElse);
    }, pictureTaker.onError, pictureTaker.options);
  },

  onThresholdChange: function(evt) {
    var newValue = evt.currentTarget.value;
    var thresholdValueDOM = window.document.getElementById("thresholdValue");
    if(thresholdValueDOM) {
      thresholdValueDOM.innerHTML = newValue;
      pictureTaker.speed_margin = parseFloat(newValue);
      app.logDebug("Changed value to ("+pictureTaker.speed_margin+")");
    } else {
      app.logError("No element called thresholdValue");
    }
  },

  showPicture: function(imgUrl) {
    app.logDebug("User come to see picture "+imgUrl);
  },

  onSuccess: function (imgUrl) {
    app.logDebug("Picture taken");
    if(app.debug) {
      var pictureDataDOM = window.document.getElementById("picture");
      if (pictureDataDOM) {
        pictureDataDOM.src = imgUrl;
      }
      notification.sendNotification(imgUrl);
    }
    faceDetect.detectFace(imgURL);
  },

  onError: function (error) {
    app.logError(JSON.toString(error));
  }

};