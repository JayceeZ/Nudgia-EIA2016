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

  takePicture: function(callback){
    log.addLog("Take picture");
    if(picture.takingPicture == false) {
      picture.takingPicture = true;
      window.plugins.CameraPictureBackground.takePicture(
        function (url) {
          picture.onSuccess(url, callback)
        },
        picture.onError,
        picture.options
      );
    }
  },

  onSuccess: function(url, callback){
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
      notification.sendNotification();
    }
  },

  onError: function(){
    picture.takingPicture = false;
    log.addLogError("Error taking picture");
  }
};