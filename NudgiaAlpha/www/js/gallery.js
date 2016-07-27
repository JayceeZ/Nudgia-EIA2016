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
    var div = $('<div class="col s6"></div>');
    var img = $('<img class="z-depth-1" src="'+urlThumb+'" alt="'+name+'" />');
    img.on('click', function(evt) {
      log.addLog("Opening modal for "+name);
      gallery.openModal(urlImage, name);
    });
    div.append(img);
    return div;
  },

  openModal: function(url, name) {
    gallery.imgModal.attr("src", url);
    log.addLog("Modal for "+url);
    gallery.addButtons(url, name);
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

    return canvas.toDataURL("image/jpeg"); //.replace(/^data:image\/(png|jpg);base64,/, "");
  },

  addButtons: function(url, name) {
    gallery.modalFooter.empty();
    gallery.addShare(url);
    gallery.addDelete(name);
  },

  addShare: function(url) {
    var button = $('<button id="share" class="btn">Share</button>');
    button.on("click", function(evt) {
      sharer.shareFile(url);
    });
    gallery.modalFooter.prepend(button);
  },

  addDelete: function(name) {
    var button = $('<button id="delete" class="btn">Delete</button>');
    button.on("click", function(evt) {
      fileHandler.deletePicture(name, gallery.removePicture);
      gallery.galleryModal.closeModal();
    });
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
    gallery.modalFooter.prepend(buttons);
  },

  takeSelfie: function(){
    picture.takePicture(gallery.addPicture);
  },

  removePicture: function(name) {
    log.addLog('Delete '+name);
    var image = $('[alt=\''+name+'\']');
    image.remove();
  },

  addPicture: function(urlThumb) {
    log.addLog("Add picture to gallery");
    var urlImage = urlThumb.replace("thumbsPictures/", "");
    var nameSplit = urlImage.split('/');
    var name = nameSplit.pop();
    log.addLog(urlImage + " thumb in " + urlThumb);
    gallery.gallerySelector.prepend(gallery.__getImgDOM(urlThumb, urlImage, name));
  }

};