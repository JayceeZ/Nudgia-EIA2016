var picture = {
    SPEED_MARGIN: 1,
    lastSpeed: null,

    options: {
        name: "Image", // image suffix
        dirName: "CameraPictureBackground", // foldername
        orientation: "portrait", // landscape or portrait
        type: "front" // back or front
    },

    speedInput: function(speed) {
        if(this.lastSpeed && this.lastSpeed <= this.SPEED_MARGIN) {
            this.lastSpeed = parseFloat(speed);
            this.takePicture();
        }
    },

    takePicture: function() {
        window.plugins.CameraPictureBackground.takePicture(this.onSuccess, this.onError, this.options);
    },

    onSuccess: function(imgUrl) {
        var pictureDataDOM = document.getElementById("picture");
        pictureDataDOM.src = imgUrl;
    }

};