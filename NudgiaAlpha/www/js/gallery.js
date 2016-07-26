/**
 * Created by alextis on 25/07/16.
 */

var gallery = {

  gallerySelector:null,
  galleryModal: null,
  imgModal: null,

  initGallery:function(){
    gallery.gallerySelector = $("#app-gallery");
    gallery.galleryModal = $('#app-gallery-modal');
    gallery.imgModal = gallery.galleryModal.find("#app-gallery-modal-img");
    fileHandler.listPictures(gallery.fillGallery);

    var selfieButton = $("#selfie-button");
    selfieButton.click(gallery.takeSelfie);
    selfieButton.attr("display", "block");
  },

  fillGallery: function(urls) {
    log.addLog("Filling gallery");
    for(var i = 0; i < urls.length; i++) {
      gallery.addPicture(urls[i]);
    }
  },

  __getImgDOM: function(urlThumb, urlImage, name) {
    var dom = new Image();
    dom.classList.add("gallery-picture");
    dom.src = urlThumb;
    dom.addEventListener('click', function() {
      gallery.openModal(urlImage);
    });
    return dom;
  },

  openModal: function(url) {
    gallery.imgModal.attr("src", url);
    gallery.galleryModal.openModal();
  },

  takeSelfie: function(){
    picture.takePicture(gallery.addPicture);
  },

  addPicture: function(urlThumb) {
    log.addLog("Add picture to gallery");
    var nameSplit = urlThumb.split('/');
    var name = nameSplit.pop();
    var urlImage = urlThumb.replace("thumbsPictures/Thumbs", "");
    log.addLog(urlImage + " thumb in " + urlThumb);
    gallery.gallerySelector.prepend(gallery.__getImgDOM(urlThumb, urlImage, name));
  }

};