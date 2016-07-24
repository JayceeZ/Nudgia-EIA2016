var geolocation = {
  getLocation: function () {
    if (!navigator.geolocation) {
      app.logError("Geolocation is unavailable");
    } else {
      app.logDebug("Getting location (once)");
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, {enableHighAccuracy: true});
    }
  },

  watchLocation: function () {
    app.logDebug("Watching location");
    navigator.geolocation.watchPosition(this.onSuccess, this.onError, {enableHighAccuracy: true, maximumAge: 35000, timeout:30000});
  },

  onSuccess: function (position) {
    app.logDebug("Location update received");
    /*if (position.coords.speed !== null) {
      myPicture.speedInput(position.coords.speed);
    }
    var locationDataDOM = window.document.getElementById("locationdata");
    if(locationDataDOM) {
      locationDataDOM.innerHTML = 'Latitude: ' + position.coords.latitude + '\n' +
        'Longitude: ' + position.coords.longitude + '\n' +
        'Altitude: ' + position.coords.altitude + '\n' +
        'Accuracy: ' + position.coords.accuracy + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        'Heading: ' + position.coords.heading + '\n' +
        'Speed: ' + position.coords.speed + '\n' +
        'Timestamp: ' + position.timestamp + '\n';
    }*/
    geolocReport("Geoloc : lon = "+position.coords.longitude+" , lat = "+position.coords.latitude+" , speed = "+(position.coords.speed ? position.coords.speed :"nope")+" , t = "+(position.coords.timestamp ? position.coords.timestamp : "nope"))

  },

  onError: function (error) {
    app.logError('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    geolocReport("Error getting geoloc");
  }

};

function geolocReport(data){
  accelero.getCurrentAccelero("Report : "+myReportIndex+" | "+ data);
}
