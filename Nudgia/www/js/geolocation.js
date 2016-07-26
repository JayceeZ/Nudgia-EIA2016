var geolocation = {
  watchLocation: function () {
    app.logDebug("Watching location");
    navigator.geolocation.watchPosition(geolocation.onSuccess, geolocation.onError, {enableHighAccuracy: true});
  },

  onSuccess: function (position) {
    app.logDebug("Location update received");
    if (position.coords.speed !== null) {
      pictureTaker.speedInput(position.coords.speed);
    }
    if(app.debug) {
      var locationDataDOM = window.document.getElementById("locationdata");
      if (locationDataDOM) {
        locationDataDOM.innerHTML = 'Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude + '\n' +
          'Altitude: ' + position.coords.altitude + '\n' +
          'Accuracy: ' + position.coords.accuracy + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
          'Heading: ' + position.coords.heading + '\n' +
          'Speed: ' + position.coords.speed + '\n' +
          'Timestamp: ' + position.timestamp + '\n';
      }
    }
  },

  onError: function (error) {
    app.logError('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  },
};
