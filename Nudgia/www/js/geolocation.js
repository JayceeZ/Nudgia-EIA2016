var geolocation = {
    getLocation: function() {
        if(!navigator.geolocation) {
            app.logError("Geolocation is unavailable");
        } else {
            navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, { enableHighAccuracy: true });
        }
    },

    watchLocation: function() {
        navigator.geolocation.watchPosition(this.onSuccess, this.onError, { enableHighAccuracy: true } );
    },

    onSuccess: function(position) {
        var data = 'Latitude: '   + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n';
        if(position.coords.speed != null) {
            picture.speedInput(position.coords.speed);
        }
        var locationDataDOM = document.getElementById("locationdata");
        locationDataDOM.innerHTML = data;
    },

    onError: function(error) {
        app.logError('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }
};
