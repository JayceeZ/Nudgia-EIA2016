/**
 * Created by alextis on 25/07/16.
 */

var fileHandler = {

  pathPrefix:"file://",
  pictureDir:"",
  thumbsDir:"thumbsPictures/",

  initialize:function(successcb){
    window.plugins.CameraPictureBackground.takePicture(function(url){
      fileHandler.onInitSuccess(url,successcb);
    },fileHandler.onInitError , {getUrl:true});
  },

  onInitSuccess:function(url,successcb){
     log.addLog("Initializing file handler");
     var splitted = url.split('/');
     for(var i = 0; i < splitted.length ; i++)
       fileHandler.pictureDir += splitted[i] + "/";
     fileHandler.pictureDir += picture.options.dirName + "/";
     log.addLog("dir url : "+fileHandler.pictureDir);
     successcb();
  },

  onInitError:function(){
    log.addLogError("Error getting picture for the fileHandler");
  },

  listPictures:function(successCallback){
      var path = fileHandler.pathPrefix+fileHandler.pictureDir;
      window.resolveLocalFileSystemURL(path,
        function (fileSystem) {
          var reader = fileSystem.createReader();
          reader.readEntries(
            function (entries) {
              var picturesPaths = [];
              for(var i = 0; i < entries.length ; i ++){
                if(entries[i].name.indexOf("NudgiaPicture") > -1)
                  picturesPaths.push(entries[i].name);
              }
              successCallback(picturesPaths);
            },
            function (err) {
              log.addLogError("List pictures error 2 : "+JSON.stringify(err));
            }
          );
        }, function (err) {
          log.addLogError("List pictures error 1 : "+JSON.stringify(err));
        }
      );
    },

  deletePicture: function(filename, successcb) {
    log.addLog("Try delete " + filename);
    var pathImage = fileHandler.pathPrefix + fileHandler.pictureDir;
    var pathThumb = pathImage + fileHandler.thumbsDir;
    fileHandler.removeFile(pathImage, filename, function(filename) {
      fileHandler.removeFile(pathThumb, filename, successcb);
    });
  },

  removeFile: function(path, filename, successcb) {
    window.resolveLocalFileSystemURL(path, function(dir) {
      dir.getFile(filename, {create:false}, function(fileEntry) {
        fileEntry.remove(function() {
          log.addLog("File "+filename+" successfully removed");
          if(successcb) {
            successcb(filename);
          }
        }, function(error) {
          log.addLogError("Error deleting file "+filename);
        });
      }, function() {
        log.addLogError("File "+filename+" doesn't exist in "+ path);
      });
    }, function() {
      log.addLogError("Folder "+path+" doesn't exist");
    });
  }

};