/**
 * Created by alextis on 26/07/16.
 */

var geoloc = {

  watcher:null,
  detectionCallback:null,
  previousLat:null,
  previousLon:null,
  previousT:null,
  previousSpeed:0,
  validSpeedCount:0,
  standbyCount:0,
  speedThreshold:1,
  log:null,

  initialize:function(detectionCb, log){
    geoloc.detectionCallback = detectionCb;
    geoloc.log = log;
  },

  startWatch:function(){
    geoloc.log("Starting geowatcher");
    geoloc.watcher = navigator.geolocation.watchPosition(
      geoloc.onSuccess,geoloc.onError,{ enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 });
  },

  clearWatch:function(){
    geoloc.log("Stopping geowatcher");
    navigator.geolocation.clearWatch(geoloc.watcher);
  },

  getDistance:function(lat1,lon1,lat2,lon2){
    var R = 6371000; // km
    var dLat = (lat2-lat1).toRad();
    var dLon = (lon2-lon1).toRad();
    lat1 = lat1.toRad();
    lat2 = lat2.toRad();

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  },

  onSuccess:function(position){
    /*var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var t = moment();
    var distance = 0, speedMS = 0, speedKH = 0;
    if(geoloc.previousLat){
      distance = geoloc.getDistance(lat,lon,geoloc.previousLat,geoloc.previousLon);
      var diffT = moment.duration(t.diff(geoloc.previousT));
      var dts = diffT.asSeconds();
      var dth = diffT.asHours();
      speedMS = distance/dts;
      speedKH = (distance/1000)/dth;
    }
    geoloc.previousLat = lat; geoloc.previousLon = lon; geoloc.previousT = t;*/
    geoloc.detection(position.coords.speed);
  },

  onError:function(error){
    geoloc.log("Error getting geoloc : "+error.message);
  },

  detection:function(speed){
     if(speed > geoloc.speedThreshold) {
       geoloc.validSpeedCount++;
       geoloc.standbyCount = 0;
     }
     else if(speed || speed == 0){
       geoloc.standbyCount++;
       if(geoloc.standbyCount > 2) {
         if (geoloc.validSpeedCount > 5) {
           if (geoloc.detectionCallback)
             geoloc.detectionCallback("Geoloc speed detection success","Geo");
         }
         geoloc.validSpeedCount = 0;
         geoloc.standbyCount = 0;
       }
     }
    //geoloc.log("Speed : "+speed+" , vsc = "+geoloc.validSpeedCount+" , stbc = "+geoloc.standbyCount);
  }

};