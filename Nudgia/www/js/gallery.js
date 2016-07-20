var gallery = {
  goToPicture: function() {

  },

  showGallery: function() {
    window.imagePicker.getPictures(
      this.onGalleryLoaded,
      this.onLoadGalleryFailed,
      {
        maximumImagesCount: 10,
        width: 200
      }
    );
  },

  onGalleryLoaded: function(results) {

  },

  onLoadGalleryFailed: function() {

  }
};