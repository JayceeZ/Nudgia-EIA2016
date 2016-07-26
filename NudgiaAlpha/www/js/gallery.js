/**
 * Created by alextis on 25/07/16.
 */

var gallery = {
  gallerySelector:null,
  galleryModal: null,
  modalFooter: null,
  imgModal: null,

  shareUrls: {
    show: ['mail', 'facebook', 'twitter'],
    mail: 'mailto:?body=',
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
    twitter: 'https://twitter.com/intent/tweet?text='
  },

  initGallery:function(){
    gallery.gallerySelector = $("#app-gallery");
    gallery.galleryModal = $("#app-gallery-modal");
    gallery.modalFooter = gallery.galleryModal.find("#modal-footer");
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
    log.addLog("Modal for "+url);
    gallery.addShare(url);
    gallery.galleryModal.openModal();
  },

  getImageDataURL: function() {
    // Create an empty canvas element
    var img = document.getElementById("app-gallery-modal-img");
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/jpeg");

    return dataURL; //.replace(/^data:image\/(png|jpg);base64,/, "");
  },

  addShare: function(url) {
    var button = $('<button id="share" class="btn">Share</button>');
    button.on("click", function(evt) {
      sharer.shareFile(url);
    });
    gallery.modalFooter.empty();
    gallery.modalFooter.prepend(button);
  },

  buildShareButtons: function(url) {
    var buttons = '';
    var list = gallery.shareUrls.show;
    for(var i=0; i < list.length; i++) {
      var share = list[i];
      var href = gallery.shareUrls[share] + encodeURIComponent(sharer.defaultShareText + '\n' + url);
      log.addLog("Url for sharing is " + href);
      buttons += '<a class="waves-effect waves-light btn" href="' + href + '">' +
        '<img class="left" src="icons/'+ share +'.svg" />' +
        '</a>';
    }
    gallery.modalFooter.empty();
    gallery.modalFooter.prepend(buttons);
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