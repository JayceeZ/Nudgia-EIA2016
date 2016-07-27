/**
 * Created by alextis on 27/07/16.
 */

var screenStatus = {

  screenOn:true,
  screenOncb:null,
  screenOffcb:null,
  log:null,

  initialize:function(screenOncb,screenOffcb,log){
    screenStatus.screenOncb = screenOncb;
    screenStatus.screenOffcb = screenOffcb;
    screenStatus.log = log;
    screenStatus.watchScreenStatus();
  },

  watchScreenStatus:function(){
    setTimeout(function(){
      Screen.status(screenStatus.screenStatusRetrieved,function(){screenStatus.log("Error retrieving screen status")});
    },1000)
  },

  screenStatusRetrieved:function(status){
    if(status == "on"){
      if(screenStatus.screenON == false){
        screenStatus.log("Screen is ON");
        screenStatus.screenON = true;
        screenStatus.screenOncb();
      }
    }
    else{
      if(screenStatus.screenON == true){
        screenStatus.log("Screen is OFF");
        screenStatus.screenON = false;
        screenStatus.screenOffcb();
      }
    }
    screenStatus.watchScreenStatus();
  }

};