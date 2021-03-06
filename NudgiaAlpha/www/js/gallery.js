/**
 * Created by alextis on 25/07/16.
 */

var gallery = {
  gallerySelector:null,
  galleryModal: null,
  modalFooter: null,
  modalContent: null,
  currentImageModal: null,
  imgModal: null,
  noPicture: true,

  initGallery:function(){
    log.addLog("Init Gallery");
    gallery.gallerySelector = $("#app-gallery");
    gallery.galleryModal = $("#app-gallery-modal");
    gallery.modalFooter = gallery.galleryModal.find("#modal-footer");
    gallery.modalContent = gallery.galleryModal.find("#modal-content");
    gallery.imgModal = gallery.modalContent.find('#app-gallery-modal-img');

    gallery.imgModal.on("swiperight", gallery.previousPictureModal);
    gallery.imgModal.on("swipeleft", gallery.nextPictureModal);

    fileHandler.listPictures(gallery.fillGallery);
  },

  fillGallery: function(names) {
    log.addLog("Filling gallery");
    for(var i = 0; i < names.length; i++) {
      gallery.addPicture(names[i]);
    }
    if(gallery.noPicture) {
      gallery.gallerySelector.append('<h3 class="white z-depth-1 col s12 center">No Pictures Yet</h3>');
    }
    app.blockUser(false);
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
    log.addLog("Modal for " + url);
    gallery.currentImageModal = name;
    gallery.imgModal.attr("src", url);
    // meta
    var metaImgModal = gallery.modalContent.find('#meta');
    metaImgModal.text(gallery.buildMeta(name));
    gallery.buildFooter(url, name);
    gallery.galleryModal.openModal();
  },

  closeModal: function() {
    log.addLog("Close gallery modal");
    gallery.galleryModal.closeModal();
  },

  previousPictureModal: function() {
    log.addLog('Swipe previous');
    var previous = gallery.gallerySelector.prev('[alt="'+gallery.currentImageModal+'"]');
    log.addLog(previous.attr('src'));
  },

  nextPictureModal: function() {
    log.addLog('Swipe next');

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

  buildFooter: function(url, name) {
    gallery.modalFooter.empty();
    gallery.modalFooter.append(gallery.buildButtonShare(url));
    gallery.modalFooter.append(gallery.buildButtonDelete(name));
  },

  buildMeta: function(name) {
    var rawDate = name.split('-')[1].split('.')[0];
    var date = moment(rawDate, 'YYYYMMDDHHmmss', true);
    var metaContent = 'Date: ' + date.format("HH:mm ddd, DD MMMM YYYY");
    return metaContent;
  },

  buildButtonShare: function(url) {
    var button = $('<div id="share" class="right btn">Share</div>');
    button.on("click", function(evt) {
      sharer.shareFile(url);
    });
    return button;
  },

  buildButtonDelete: function(name) {
    var button = $('<div id="delete" class="btn red">Delete</div>');
    button.on("click", function(evt) {
      fileHandler.deletePicture(name, gallery.removePicture);
      gallery.galleryModal.closeModal();
    });
    return button;
  },

  removePicture: function(name) {
    log.addLog('Delete '+name);
    var image = $('[alt=\''+name+'\']');
    image.remove();
    if(!gallery.gallerySelector.find('img').length) {
      gallery.noPicture = true;
      gallery.gallerySelector.append('<h3 class="white z-depth-1 col s12 center">No Pictures Yet</h3>');
    }
    app.blockUser(false);
  },

  addPicture: function(name) {
    log.addLog("Add picture to gallery");
    if(gallery.noPicture) {
      gallery.gallerySelector.empty();
    }
    var urlImage = fileHandler.pictureDir+name;
    var urlThumb = fileHandler.pictureDir+fileHandler.thumbsDir+name;
    log.addLog(urlImage + " thumb in " + urlThumb);
    gallery.gallerySelector.prepend(gallery.__getImgDOM(urlThumb, urlImage, name));
    gallery.noPicture = false;
  }

};