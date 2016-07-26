var pictureTaker = {
  speed_margin: 0.6, // default
  lastSpeed: null,
  alreadyTakenOne: true,

  options: {
    dirName: "Nudgia", // foldername
    orientation: "portrait", // landscape or portrait
    type: "front", // back or front,
    name: "nudgia"  // prefix to files
  },

  speedInput: function (speed) {
    app.logDebug("Speed input to picture taker [" + speed + "]  [alreadytakenOne="+pictureTaker.alreadyTakenOne+"] [threshold="+pictureTaker.speed_margin+"]");
    if (pictureTaker.__shouldTakePhoto() && !pictureTaker.alreadyTakenOne) {
      // If not already taken (limit to only one per event)
      app.logDebug("Should take picture");
      pictureTaker.alreadyTakenOne = true;
      pictureTaker.takePicture();
    } else if (parseFloat(speed) > pictureTaker.speed_margin) {
      pictureTaker.alreadyTakenOne = false;
    }
    pictureTaker.lastSpeed = parseFloat(speed);
  },

  __shouldTakePhoto: function () {
    return pictureTaker.lastSpeed && pictureTaker.lastSpeed <= pictureTaker.speed_margin;
  },

  takePicture: function () {
    app.logDebug("Taking picture");
    window.plugins.CameraPictureBackground.takePicture(pictureTaker.onSuccess, pictureTaker.onError, pictureTaker.options);
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

  onSuccess: function (imgUrl) {
    app.logDebug("Picture taken");
    faceDetect.detectFace(imgUrl);
  },

  onError: function (error) {
    app.logError(JSON.toString(error));
  }

};