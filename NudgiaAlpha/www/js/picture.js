/**
 * Created by alextis on 25/07/16.
 */

var picture = {

  options :{
    name:"NudgiaPicture",
    dirName: "Nudgia", //  (DO NOT CHANGE hardcoded in the plugin)
    orientation: "portrait", // landscape or portrait
    type: "front" // back or front
  },

  takePicture: function(callback){
    log.addLog("Take picture");
    window.plugins.CameraPictureBackground.takePicture(
      function(url) {
        picture.onSuccess(url, callback)
      },
      picture.onError,
      picture.options
    );
  },

  onSuccess: function(url, callback){
    log.addLog("Picture taken");
    if(callback) {
      callback(url);
    }
  },

  onError: function(){
    log.addLogError("Error taking picture");
  }
};