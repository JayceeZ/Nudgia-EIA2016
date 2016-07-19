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
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-geolocation": "2.2.0",
    "cordova-plugin-camerapicturebackground": "0.0.3",
    "cordova-plugin-compat": "1.0.0"
}
// BOTTOM OF METADATA
});