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
var DEBUG = false;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      if(DEBUG) {
          log.initLog();
          log.addLog("App is started");
      }
      cordova.plugins.backgroundMode.setDefaults({
        title: "Nudgia's magic is ON !",
        text: "You can display the app by clicking me"
      });
      cordova.plugins.backgroundMode.enable();
      fileHandler.initialize(app.fileHandlerInited);
    },

    blockUser: function(bool) {
      var domObject = $('#user-block');
      if(bool) {
        domObject.removeClass('hidden');
      } else {
        domObject.addClass('hidden');
      }
    },

    fileHandlerInited:function(){
      gallery.initGallery();
      $(document).on("backbutton", gallery.closeModal);
      nudgiaSensorsHandler.initialize(function(){app.takeSelfie(true)},log.addLog);

      var selfieButton = $("#selfie-button");
      selfieButton.click(function() {
        app.takeSelfie(false, true);
      });
      selfieButton.attr("display", "block");
    },

    takeSelfie: function(faceDetect, silent) {
      picture.takePicture(gallery.addPicture, faceDetect, !silent);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

app.initialize();