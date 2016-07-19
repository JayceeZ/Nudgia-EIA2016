var picture = {
  SPEED_MARGIN: 0.5, // 0.5 walk test, TO_DETERMINE vehicle test
  lastSpeed: null,
  alreadyTakenOne: true,

  options: {
    name: "Image", // image suffix
    dirName: "CameraPictureBackground", // foldername
    orientation: "portrait", // landscape or portrait
    type: "front" // back or front
  },

  speedInput: function (speed) {
    app.logDebug("Speed input to picture taker [" + speed + "]");
    if (this.__shouldTakePhoto()) {
      this.takePicture();
    } else if (speed > this.SPEED_MARGIN) {
      this.alreadyTakenOne = false;
    }
    this.lastSpeed = speed;
  },

  __shouldTakePhoto: function () {
    var condition = this.lastSpeed && this.lastSpeed <= this.SPEED_MARGIN;
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

  onSuccess: function (imgUrl) {
    app.logDebug("Picture taken");
    var pictureDataDOM = document.getElementById("picture");
    pictureDataDOM.src = imgUrl;
  }

};