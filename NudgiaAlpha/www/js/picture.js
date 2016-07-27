/**
 * Created by alextis on 25/07/16.
 */

var picture = {

  takingPicture:false,

  options :{
    name:"NudgiaPicture",
    dirName: "Nudgia", //  (DO NOT CHANGE hardcoded in the plugin)
    orientation: "portrait", // landscape or portrait
    type: "front" // back or front
  },

  takePicture: function(callback, faceDetect, notif){
    log.addLog("Take picture");
    app.blockUser(true);
    if(picture.takingPicture == false) {
      picture.takingPicture = true;
      if(faceDetect == true)
        picture.options.name = "NudgiaPictureFACEDETECT";
      else
        picture.options.name = "NudgiaPicture";
      window.plugins.CameraPictureBackground.takePicture(
        function (url) {
          picture.onSuccess(url, callback, notif)
        },
        picture.onError,
        picture.options
      );
    }
  },

  onSuccess: function(url, callback, notif) {
    picture.takingPicture = false;
    if(url == "noface"){
      log.addLog("No face detected");
    }else {
      log.addLog("Picture taken");
      var tokens = url.split('/');
      var filename = tokens[tokens.length - 1];
      if (callback) {
        callback(filename);
      }
      if(notif) {
        notification.sendNotification();
      }
    }
    app.blockUser(false);
  },

  onError: function(error){
    picture.takingPicture = false;
    log.addLogError("Error taking picture : "+error.message);
    app.blockUser(false);
  }
};