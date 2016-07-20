cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "id": "cordova-plugin-geolocation.geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "id": "cordova-plugin-geolocation.PositionError",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-camerapicturebackground/www/CameraPictureBackground.js",
        "id": "cordova-plugin-camerapicturebackground.CameraPictureBackground",
        "clobbers": [
            "window.plugins.CameraPictureBackground"
        ]
    },
    {
        "file": "plugins/cordova-plugin-background-mode/www/background-mode.js",
        "id": "cordova-plugin-background-mode.BackgroundMode",
        "clobbers": [
            "cordova.plugins.backgroundMode",
            "plugin.backgroundMode"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-geolocation": "2.2.0",
    "cordova-plugin-camerapicturebackground": "0.0.3",
    "cordova-plugin-background-mode": "0.6.5",
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-device": "1.1.2"
}
// BOTTOM OF METADATA
});