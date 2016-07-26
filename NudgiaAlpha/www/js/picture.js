/**
 * Created by alextis on 25/07/16.
 */

var picture = {

  options :{
    name:"NudgiaPicture",
    dirName: "CameraPictureBackground", // foldername
    orientation: "portrait", // landscape or portrait
    type: "front" // back or front
  },

  takePicture:function(callback){
    window.plugins.CameraPictureBackground.takePicture(
      function() {
        picture.onSuccess(callback)
      },
      picture.onError,
      picture.options
    );
  },

  onSuccess:function(callback){
    log.addLog("Picture taken");
    if(callback) {
      callback();
    }
  },

  onError:function(){
    log.addLogError("Error taking picture");
  }

};