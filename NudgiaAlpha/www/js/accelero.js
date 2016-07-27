/**
 * Created by alextis on 26/07/16.
 */

var accelero = {

  watcher:null,
  detectionCallback:null,
  log:null,
  acceleroThreshold:22,

  initialize:function(detectionCb, log){
    accelero.detectionCallback = detectionCb;
    accelero.log = log;
  },

  startWatch:function(){
    accelero.log("Starting accelero watcher");
    accelero.watcher = navigator.accelerometer.watchAcceleration(
      accelero.onSuccess,accelero.onError,{ frequency:300 });
  },

  clearWatch:function(){
    accelero.log("Stopping accelero watcher");
    navigator.accelerometer.clearWatch(accelero.watcher);
  },

  getNorm:function(x,y,z){
    return Math.sqrt(Math.abs(x*x)+Math.abs(y*y)+Math.abs(z*z));
  },

  onSuccess:function(acc){
    accelero.detection(accelero.getNorm(acc.x,acc.y,acc.z));
  },

  onError:function(error){
    accelero.log("Error getting accelero : "+error.message);
  },

  detection:function(value){
    if(value > accelero.acceleroThreshold){
      accelero.detectionCallback("Accelero detection success : "+value,"Acc");
    }
  }

};