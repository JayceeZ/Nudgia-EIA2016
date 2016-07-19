/**
 * Created by alextis on 19/07/16.
 */

window.onPopupPictureClick = null;

window.UserView = React.createClass({
    getInitialState:function(){
      return{openPictureModal:null , modalPictureId:null, mapPictureFocus:null}
    },
    getOpenPictureModal:function(opener){
      this.setState({openPictureModal:opener});
    },
    componentDidMount:function(){
      onPopupPictureClick = this.popupImageClick;
    },
    getMapFocus:function(focus){
      this.setState({mapPictureFocus:focus});
    },
    popupImageClick:function(picId){
      var _this = this;
      this.setState({modalPictureId:picId},function(){
        _this.state.openPictureModal();
      })
    },
    pictureViewerClick:function(picId){
      this.state.mapPictureFocus(picId);
    },
   render:function(){
       return(
           <div className="fill-height">
             <MapContainer getMapFocus={this.getMapFocus} userPictures={this.props.userPictures} />
             <PicturesViewer userPictures={this.props.userPictures}
                             onPictureClick={this.pictureViewerClick}
             />
             <PictureModal userPictures={this.props.userPictures}
                           pictureId={this.state.modalPictureId}
                           getOpen={this.getOpenPictureModal}
                           windowHeight={this.props.windowHeight}
             />
           </div>
       )
   }
});


