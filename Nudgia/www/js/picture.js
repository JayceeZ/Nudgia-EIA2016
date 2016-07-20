var picture = {
  speed_margin: 0.8, // default
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
      this.takePicture();
    } else if (speed > this.speed_margin) {
      this.alreadyTakenOne = false;
    }
    this.lastSpeed = speed;
  },

  __shouldTakePhoto: function () {
    var condition = this.lastSpeed && this.lastSpeed <= this.speed_margin;
    if (!this.alreadyTakenOne) {
      // If not already taken (limit to only one per event)
      if (condition) {
        return true;
      } else {
        this.alreadyTakenOne = false;
      }
    }
    return false;
  },

  takePicture: function () {
    this.alreadyTakenOne = true;
    app.logDebug("Taking picture");
    window.plugins.CameraPictureBackground.takePicture(this.onSuccess, this.onError, this.options);
  },

  onThresholdChange: function(evt) {
    var newValue = evt.currentTarget.value;
    app.logDebug("Changed value to ("+newValue+")");
    var thresholdValueDOM = document.getElementById("thresholdValue");
    if(thresholdValueDOM) {
      thresholdValueDOM.innerHTML = newValue;
      picture.speed_margin = newValue;
    } else {
      app.logError("No element called thresholdValue");
    }
  },

  onSuccess: function (imgUrl) {
    app.logDebug("Picture taken");
    var pictureDataDOM = document.getElementById("picture");
    pictureDataDOM.src = imgUrl;
  }

};

var thresholdSliderDOM = document.getElementById("threshold");
thresholdSliderDOM.value = picture.speed_margin;
var thresholdValueDOM = document.getElementById("thresholdValue");
thresholdValueDOM.innerHTML = picture.speed_margin;