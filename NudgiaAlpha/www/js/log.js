/**
 * Created by alextis on 25/07/16.
 */

var log = {

  runLog:false,
  logOutput:null,

  initLog:function(){
    log.runLog = true;
    log.logOutput = $("#app-log");
    $("#app-gallery").height("60%");
    log.logOutput.height("30%");
  },

  logTime:function(){
    return moment().format("HH:mm:ss");
  },

  addLog:function(data){
    if(log.runLog) {
      log.logOutput.prepend("<p>" + log.logTime() + " : " + data + "</p>");
    }
  },

  addLogError:function(data){
    if(log.runLog)
      log.logOutput.prepend("<p class='log-error'>"+log.logTime()+" : "+data+"</p>");
  }
};