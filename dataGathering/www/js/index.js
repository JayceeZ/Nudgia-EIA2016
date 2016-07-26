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

var logOutput = $("#app-log");
var screenON = false;

var pictureOptions = {
    dirName: "DataPictures", // foldername
      orientation: "portrait", // landscape or portrait
      type: "front" // back or front
};

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
        addLog("App started");
        /*if ("geolocation" in navigator) {
            addLog("Starting geowatcher");
            var geoWatcher = navigator.geolocation.watchPosition(
              geoSuccess,geoError,{ enableHighAccuracy: true, maximumAge: 15000, timeout: 10000 });
        } else {
            addLogError("geolocation is NOT available");
        }*/
        /*setInterval(function(){
            navigator.accelerometer.getCurrentAcceleration(acceleroSuccess, acceleroFail, null);
        }, 500);*/
        cordova.plugins.backgroundMode.enable();
        Screen.status(screenStatusRetrieved,function(){addLogError("Error retrieving screen status")});
        watchScreenStatus();
        setInterval(takePicture,5000);
    }

};

function logTime(){
    return moment().format("HH:mm:ss");
}

function addLog(log){
    logOutput.prepend("<p>"+logTime()+" : "+log+"</p>");
}

function addLogError(log){
    logOutput.prepend("<p class='log-error'>"+logTime()+" : "+log+"</p>");
}

function geoSuccess(position){
    addLog("Geoloc : lon = "+position.coords.longitude+" , lat = "+position.coords.latitude+" , speed = "+(position.coords.speed ? position.coords.speed :"nope")+" , t = "+(position.coords.timestamp ? position.coords.timestamp : "nope"));
}

function geoError(error){
    addLogError("Error getting geoloc : "+error.message);
}

//var pAx = 0, pAy = 0, pAz = 0;

function acceleroSuccess(acc){
    addLog("Ax = "+acc.x+" ,Ay = "+acc.y+" ,Az = "+acc.z);
}

function acceleroFail(){
    addLogError("Failed to retrieve acceleration");
}

function watchScreenStatus(){
    setTimeout(function(){
        Screen.status(screenStatusRetrieved,function(){addLogError("Error retrieving screen status")});
    },1000)
}

function screenStatusRetrieved(status){
    if(status == "on"){
        if(screenON == false){
            screenON = true;
            addLog("Screen is ON");
        }
    }
    else{
        if(screenON == true){
            screenON = false;
            addLog("Screen is OFF");
        }
    }
    watchScreenStatus();
}

var picOptions = {
    name:"TestPicture",
    dirName: "CameraPictureBackground", // foldername
      orientation: "portrait", // landscape or portrait
      type: "front" // back or front
};

function takePicture(){
    if(screenON)
        window.plugins.CameraPictureBackground.takePicture(pictureTaken, pictureFailed , picOptions);
}

function pictureTaken(imgUrl){
    addLog("Picture taken : "+imgUrl);
}

function pictureFailed(){
    addLogError("Picture failed");
}


app.initialize();