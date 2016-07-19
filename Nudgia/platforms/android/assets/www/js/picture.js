var picture = {
    SPEED_MARGIN: 0.5, // 0.5 walk test, TO_DETERMINE vehicle test
    lastSpeed: null,
    alreadyTakenOne: true,

    options: {
        name: "Image", // image suffix
        dirName: "CameraPictureBackground", // foldername
        orientation: "portrait", // landscape or portrait
        type: "front" // back or front
    },

    speedInput: function(speed) {
        app.logDebug("Speed input to picture taker [" + speed + "]");
        if(this.lastSpeed && this.lastSpeed <= this.SPEED_MARGIN) {
            this.alreadyTakenOne = true;
            this.takePicture();
        } else {
            this.alreadyTakenOne = false;
        }
        this.lastSpeed = speed;
    },

    takePicture: function() {
        app.logDebug("Taking picture");
        window.plugins.CameraPictureBackground.takePicture(this.onSuccess, this.onError, this.options);
    },

    onSuccess: function(imgUrl) {
        app.logDebug("Picture taken");
        var pictureDataDOM = document.getElementById("picture");
        pictureDataDOM.src = imgUrl;
    }

};