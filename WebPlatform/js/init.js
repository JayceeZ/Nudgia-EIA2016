
L.Map = L.Map.extend({
  openPopup: function(popup) {
    //        this.closePopup();  // just comment this
    this._popup = popup;

    return this.addLayer(popup).fire('popupopen', {
      popup: this._popup
    });
  }
});


ReactDOM.render(<MainApp userPictures={userPictures} wallPictures={wallPictures}/>
    ,document.getElementById("app-content"));












