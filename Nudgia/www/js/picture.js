

var pictureTaker = {
  speed_margin: 0.6, // default
  lastSpeed: null,
  alreadyTakenOne: true,

  options: {
    dirName: "CameraPictureBackground", // foldername
    orientation: "portrait", // landscape or portrait
    type: "front" // back or front
  },

  speedInput: function (speed) {
    app.logDebug("Speed input to picture taker [" + speed + "] (threshold="+pictureTaker.speed_margin+")");
    if (pictureTaker.__shouldTakePhoto()) {
      app.logDebug("Should take picture");
      if (!pictureTaker.alreadyTakenOne) {
        // If not already taken (limit to only one per event)
        pictureTaker.takePicture();
      }
    } else if (parseFloat(speed) > pictureTaker.speed_margin) {
      pictureTaker.alreadyTakenOne = false;
    }
    pictureTaker.lastSpeed = parseFloat(speed);
  },

  __shouldTakePhoto: function () {
    return pictureTaker.lastSpeed && pictureTaker.lastSpeed <= pictureTaker.speed_margin;
  },

  takePicture: function (somethingElse) {
    app.logDebug("Taking myPicture");
    pictureTaker.options.name = "Report "+app.myReportIndex+" "; // image suffix
    window.plugins.CameraPictureBackground.takePicture(function(data) {
      pictureTaker.onSuccess(data, somethingElse);
    }, this.onError, this.options);
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
    app.logDebug("User come to see myPicture "+imgUrl);
  },

  onSuccess: function (imgUrl, somethingElse) {
    app.logDebug("Picture taken");
    if(app.debug) {
      var pictureDataDOM = window.document.getElementById("picture");
      if (pictureDataDOM) {
        pictureDataDOM.src = imgUrl;
      }
      notification.sendNotification(imgUrl);
      app.myReportIndex++;
    }
    faceDetect.detectFace(imgURL);
    pictureTaker.alreadyTakenOne = true;
  },

  onError: function (error) {
    app.logError(JSON.toString(error));
  }

};

var thresholdSliderDOM = window.document.getElementById("threshold");
if(thresholdSliderDOM) {
  thresholdSliderDOM.value = pictureTaker.speed_margin;
}
var thresholdValueDOM = window.document.getElementById("thresholdValue");
if(thresholdValueDOM) {
  thresholdValueDOM.innerHTML = pictureTaker.speed_margin;
}