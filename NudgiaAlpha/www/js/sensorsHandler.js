/**
 * Created by alextis on 27/07/16.
 */

var nudgiaSensorsHandler = {

  detectioncb:null,
  log:null,

  initialize:function(detectioncb,log){
    nudgiaSensorsHandler.detectioncb = detectioncb;
    nudgiaSensorsHandler.log = log;
    geoloc.initialize(detectioncb,log);
    accelero.initialize(detectioncb,log);
    screenStatus.initialize(nudgiaSensorsHandler.screenOncb,nudgiaSensorsHandler.screenOffcb,log);
    nudgiaSensorsHandler.startWatchers();
  },

  startWatchers:function(){
    geoloc.startWatch();
    accelero.startWatch();
  },

  stopWatchers:function(){
    geoloc.clearWatch();
    accelero.clearWatch();
  },

  screenOncb:function(){
    nudgiaSensorsHandler.startWatchers();
    nudgiaSensorsHandler.detectioncb();
  },

  screenOffcb:function(){
    nudgiaSensorsHandler.stopWatchers();
  }

};