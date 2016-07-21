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
var app = {
  debug: true,
  TIMER_VALUE: 1000,
  // Application Constructor
  initialize: function () {
    this.bindEvents();
    setInterval(app.timedThings, app.TIMER_VALUE);
  },

  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function () {
    app.receivedEvent('deviceready');
    if(app.debug) {
      app.populateForDebug();
    }else{
      gallery.showGallery();
    }
    app.enableBackground();
    geolocation.watchLocation();
  },

  populateForDebug: function() {
    var appDOM = document.getElementById("app");
    appDOM.innerHTML =
        '<h1>WARN: PoC app for tests</h1>' +
        '<h2>Location</h2>' +
        '<pre id="locationdata"></pre>' +
        'Threshold (<span id="thresholdValue"></span>):' +
        '<br /><input type="range" name="threshold" id="threshold" step="0.1" value="1" min="0" max="10" style="width: 100%;" data-highlight="true" title=""/>' +
        '<h2>Picture</h2>' +
        '<img id="picture" class="picture" src="" alt="No picture yet" />' +
        '<div class="debug">' +
        '<pre id="debug"></pre>' +
        '</div>';

    var thresholdSliderDOM = document.getElementById("threshold");
    thresholdSliderDOM.addEventListener('change', picture.onThresholdChange);
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
    this.logDebug(message);
    alert(message);
  },

  logDebug: function (message) {
    if(app.debug) {
      var debugDOM = document.getElementById("debug");
      if(debugDOM) {
        debugDOM.innerHTML = message + "\n" + debugDOM.innerHTML;
      }
    }
  },

  logError: function (message) {
    this.__alert(message, true);
  }
};

app.initialize();