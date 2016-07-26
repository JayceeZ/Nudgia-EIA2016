/**
 * Created by alextis on 25/07/16.
 */

var gallery = {

  gallerySelector:null,

  initGallery:function(){
    gallery.gallerySelector = $("#app-gallery");
    $("#selfie-button").click(gallery.takeSelfie);
    fileHandler.listPictures(gallery.fillGallery);
  },

  fillGallery:function(urls){
    log.addLog("Filling gallery");
    for(var i = 0; i < urls.length ; i ++){
      var img = '<img class="gallery-picture z-depth-1" src="'+urls[i]+'" width="100%" />';
      gallery.gallerySelector.prepend(img);
    }
  },

  takeSelfie:function(){
    window.plugins.CameraPictureBackground.takePicture(
      gallery.addPicture, picture.onError , picture.options);
  },

  addPicture:function(url){
    var img = '<img class="gallery-picture z-depth-1" src="'+url+'" width="100%" />';
    gallery.gallerySelector.prepend(img);
  }

};