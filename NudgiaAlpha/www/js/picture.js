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

  takePicture:function(){
      window.plugins.CameraPictureBackground.takePicture(picture.onSuccess, picture.onError , picture.options);
  },

  onSuccess:function(){
      log.addLog("Picture taken");
  },

  onError:function(){
      log.addLogError("Error taking picture");
  }

};