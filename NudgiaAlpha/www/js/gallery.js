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
      var nameSplit = urls[i].split('/');
      var name = nameSplit[nameSplit.length-1];
      var img = '<div width="100%">'+name+'</div><div width="100%"><img class="gallery-picture z-depth-1" src="'+urls[i]+'" width="100%" /></div>';
      gallery.gallerySelector.prepend(img);
    }
  },

  takeSelfie:function(){
    window.plugins.CameraPictureBackground.takePicture(
      gallery.addPicture, picture.onError , picture.options);
  },

  addPicture:function(url){
    var nameSplit = url.split('/');
    var name = nameSplit[nameSplit.length-1];
    var img = '<div width="100%">'+name+'</div><div width="100%"><img class="gallery-picture z-depth-1" src="'+url+'" width="100%" /></div>';
    gallery.gallerySelector.prepend(img);
  }

};