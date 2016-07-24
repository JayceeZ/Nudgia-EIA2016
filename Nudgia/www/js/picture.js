

var myPicture = {
  speed_margin: 0.6, // default
  lastSpeed: null,
  alreadyTakenOne: true,

  options: {
    dirName: "CameraPictureBackground", // foldername
    orientation: "portrait", // landscape or portrait
    type: "front" // back or front
  },

  speedInput: function (speed) {
    app.logDebug("Speed input to myPicture taker [" + speed + "] (threshold="+myPicture.speed_margin+")");
    if (myPicture.__shouldTakePhoto()) {
      app.logDebug("Should take myPicture");
      if (!myPicture.alreadyTakenOne) {
        // If not already taken (limit to only one per event)
        myPicture.takePicture();
      }
    } else if (parseFloat(speed) > myPicture.speed_margin) {
      myPicture.alreadyTakenOne = false;
    }
    myPicture.lastSpeed = parseFloat(speed);
  },

  __shouldTakePhoto: function () {
    return myPicture.lastSpeed && myPicture.lastSpeed <= myPicture.speed_margin;
  },

  takePicture: function (prout) {
    app.logDebug("Taking myPicture");
    myPicture.options.name = "Report "+myReportIndex+" "; // image suffix
    window.plugins.CameraPictureBackground.takePicture(function(data) {
      myPicture.onSuccess(data, prout);
    }, this.onError, this.options);
  },

  onThresholdChange: function(evt) {
    var newValue = evt.currentTarget.value;
    var thresholdValueDOM = window.document.getElementById("thresholdValue");
    if(thresholdValueDOM) {
      thresholdValueDOM.innerHTML = newValue;
      myPicture.speed_margin = parseFloat(newValue);
      app.logDebug("Changed value to ("+myPicture.speed_margin+")");
    } else {
      app.logError("No element called thresholdValue");
    }
  },

  showPicture: function(imgUrl) {
    app.logDebug("User come to see myPicture "+imgUrl);
  },

  onSuccess: function (imgUrl, prout) {
    app.logDebug("Picture taken");
    var pictureDataDOM = window.document.getElementById("myPicture");
    if(pictureDataDOM) {
      pictureDataDOM.src = imgUrl;
    }
    //notification.updateNotificationIfexist(imgUrl);
    myPicture.alreadyTakenOne = true;
    writeFile(prout);
    myReportIndex++;
  },

  onError: function (error) {
    app.logError(JSON.toString(error));
  }

};

var thresholdSliderDOM = window.document.getElementById("threshold");
if(thresholdSliderDOM) {
  thresholdSliderDOM.value = myPicture.speed_margin;
}
var thresholdValueDOM = window.document.getElementById("thresholdValue");
if(thresholdValueDOM) {
  thresholdValueDOM.innerHTML = myPicture.speed_margin;
}