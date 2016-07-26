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

  fillGallery: function(urls) {
    log.addLog("Filling gallery");
    for(var i = 0; i < urls.length; i++) {
      gallery.addPicture(urls[i]);
    }
  },

  __getImgDOM: function(url, name) {
    var dom = '<div width="100%"><img class="gallery-picture z-depth-1" src="'+url+'" width="100%" /></div>';
    return dom;
  },

  takeSelfie: function(){
    picture.takePicture(gallery.addPicture);
  },

  addPicture: function(url){
    var nameSplit = url.split('/');
    var name = nameSplit[nameSplit.length-1];
    gallery.gallerySelector.prepend(this.__getImgDOM(url, name));
  }

};