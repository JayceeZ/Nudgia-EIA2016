var picture = {
  speed_margin: 0.1, // default
  lastSpeed: null,
  alreadyTakenOne: true,

  options: {
    name: "Image", // image suffix
    dirName: "CameraPictureBackground", // foldername
    orientation: "portrait", // landscape or portrait
    type: "front" // back or front
  },

  speedInput: function (speed) {
    app.logDebug("Speed input to picture taker [" + speed + "] (threshold="+this.speed_margin+")");
    if (this.__shouldTakePhoto()) {
      app.logDebug("Should take picture");
      if (!this.alreadyTakenOne) {
        // If not already taken (limit to only one per event)
        this.takePicture();
      }
    } else if (parseFloat(speed) > this.speed_margin) {
      this.alreadyTakenOne = false;
    }
    this.lastSpeed = parseFloat(speed);
  },

  __shouldTakePhoto: function () {
    return this.lastSpeed && this.lastSpeed <= this.speed_margin;
  },

  takePicture: function () {
    app.logDebug("Taking picture");
    window.plugins.CameraPictureBackground.takePicture(this.onSuccess, this.onError, this.options);
  },

  onThresholdChange: function(evt) {
    var newValue = evt.currentTarget.value;
    var thresholdValueDOM = document.getElementById("thresholdValue");
    if(thresholdValueDOM) {
      thresholdValueDOM.innerHTML = newValue;
      picture.speed_margin = parseFloat(newValue);
      app.logDebug("Changed value to ("+picture.speed_margin+")");
    } else {
      app.logError("No element called thresholdValue");
    }
  },

  showPicture: function(imgUrl) {
    app.logDebug("User come to see picture "+imgUrl);
  },

  onSuccess: function (imgUrl) {
    app.logDebug("Picture taken");
    var pictureDataDOM = document.getElementById("picture");
    if(pictureDataDOM) {
      pictureDataDOM.src = imgUrl;
    }
    notification.updateNotificationIfexist(imgUrl);
    this.alreadyTakenOne = true;
  },

  onError: function (error) {
    app.logError(JSON.toString(error));
  }

};

var thresholdSliderDOM = document.getElementById("threshold");
if(thresholdSliderDOM) {
  thresholdSliderDOM.value = picture.speed_margin;
}
var thresholdValueDOM = document.getElementById("thresholdValue");
if(thresholdValueDOM) {
  thresholdValueDOM.innerHTML = picture.speed_margin;
}