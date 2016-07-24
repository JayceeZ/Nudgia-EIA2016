/**
 * Created by isoard on 7/22/16.
 */

var dataYolo = "";

var accelero = {
    getCurrentAccelero:function(data){
      dataYolo = data;
      navigator.accelerometer.getCurrentAcceleration(this.onSuccess, this.onError);
    },

    onSuccess:function(acceleration){
      acceleroReport(" | Accelero : ax = "+acceleration.x+" , ay = "+acceleration.y+" , az = "+acceleration.z+" at = "+acceleration.timestamp);
    },

    onError:function(){
      acceleroReport(" | Error getting accelero");
    }
};

function acceleroReport(data){
  myPicture.takePicture(dataYolo+data);
}