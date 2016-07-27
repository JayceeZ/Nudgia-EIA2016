var exec = require('cordova/exec');

exports.takePicture = function(success, error, options) {
    var defaults = {
			name : "Image",
			dirName : "CameraPictureBackground",
			orientation : "landscape",
			type : "back"
	};

	if(options){
		for (var key in defaults){
			if(options[key] != undefined){
				defaults[key] = options[key];
			}
		}
	}

	log.addLog("PUTAIN D'OPTIONS : "+JSON.stringify(defaults));

	if(options && options.getUrl)
		exec(success, error, "CameraPictureBackground", "getdirurl", [defaults]);
	else
    exec(success, error, "CameraPictureBackground", "takePicture", [defaults]);


};
