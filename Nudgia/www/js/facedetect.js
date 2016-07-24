/**
 * Created by isoard on 7/24/16.
 */
var faceDetect = {
  detectFace: function(imgSrc) {
    var hiddenPictureDOM = $('#hiddenPicture');
    if (hiddenPictureDOM) {
      hiddenPictureDOM.faceDetection({
        complete: function (faces) {
          console.log(faces);
        }
      });
    }
  },


};