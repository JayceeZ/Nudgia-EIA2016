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
  TIMER_VALUE: 1000,
  deviceready: true,
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
    app.deviceready = true;
    geolocation.watchLocation();
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var thresholdSliderDOM = document.getElementById("threshold");
    thresholdSliderDOM.addEventListener('change', picture.onThresholdChange);
  },

  __alert: function (message) {
    this.logDebug(message);
    alert(message);
  },

  logDebug: function (message) {
    var debugDOM = document.getElementById("debug");
    debugDOM.innerHTML = message + "\n" + debugDOM.innerHTML;
  },

  logError: function (message) {
    this.__alert(message, true);
  }
};

app.initialize();