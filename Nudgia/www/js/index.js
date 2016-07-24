/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var dataFile;

var myReportIndex = 0;

var app = {
  debug: false,
  TIMER_VALUE: 1000,
  i: 0,
  // Application Constructor
  initialize: function () {
    app.bindEvents();
  },

  bindEvents: function () {
    window.document.addEventListener('deviceready', app.onDeviceReady, true);
  },

  onDeviceReady: function () {
    app.receivedEvent('deviceready');
    app.enableBackground();
    if(app.debug) {
      app.populateForDebug();
    }else{
      gallery.showGallery();
    }
    window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function(dir){
      dir.getFile("nudgiaData.txt", {create:true}, function(file){
        dataFile = file;
        writeFile("App is started");
      })
    });
    geolocation.watchLocation();
  },

  populateForDebug: function() {
    var appDOM = document.getElementById("app");
    if(appDOM) {
      appDOM.innerHTML =
        '<h1>WARN: PoC app for tests</h1>' +
        '<h2>Location</h2>' +
        '<pre id="locationdata"></pre>' +
        'Threshold (<span id="thresholdValue"></span>):' +
        '<br /><input type="range" name="threshold" id="threshold" step="0.1" value="1" min="0" max="10" style="width: 100%;" data-highlight="true" title=""/>' +
        '<h2>Picture</h2>' +
        '<img id="myPicture" class="myPicture" src="" alt="No myPicture yet" />' +
        '<div class="debug">' +
        '<pre id="debug"></pre>' +
        '</div>';

      var thresholdSliderDOM = window.document.getElementById("threshold");
      if (thresholdSliderDOM) {
        thresholdSliderDOM.addEventListener('change', myPicture.onThresholdChange);
      }
    }
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {

  },

  enableBackground: function() {
    cordova.plugins.backgroundMode.setDefaults({
      title: "Nudgia's magic is ON !",
      text: "You can display the app by clicking me"
    });
    cordova.plugins.backgroundMode.enable();
    if(cordova.plugins.backgroundMode.isEnabled()) {
      app.logDebug("Background mode enabled");
    }
  },

  __alert: function (message) {
    app.logDebug(message);
    alert(message);
  },

  logDebug: function (message) {
    if(app.debug) {
      var debugDOM = window.document.getElementById("debug");
      var timestamp = new Date();
      app.i += 1;
      if(debugDOM) {
        debugDOM.innerHTML = app.i + "# " + timestamp + " - " + message + "\n" + debugDOM.innerHTML;
      }
    }
  },

  logError: function (message) {
    app.__alert(message, true);
  }
};

function writeFile(data){
  if(!dataFile){
    alert("Error data file access");
    return;
  }
  data += "\n";
  dataFile.createWriter(function(fileWriter){
    fileWriter.seek(fileWriter.length);
    var blob = new Blob([data], {type:'text/plain'});
    fileWriter.write(blob);
  },function(){
    alert("Error writing file");
  });
}

app.initialize();

