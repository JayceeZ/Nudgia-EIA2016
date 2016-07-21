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
        var buttonContent = <div className="valign-wrapper"><h5 className="valign">Wall of Fun</h5></div>;
       return(
           <div className="fill-height">
             <div style={{height:"20%","background-color":"#4CAF50"}}>
               <div className="col s2 valign-wrapper" style={{height:"100%","padding-left":"40px"}}>
                 <Button text={buttonContent}
                         color="blue"
                         onClick={this.props.showWallClick}
                         style={{height:"80%","margin":"10% 10px"}}/>
               </div>
               <div className="col s9" style={{height:"100%","padding":"5px"}}>
                 <WallOverviewTopBar wallPictures={this.props.wallPictures} showWallClick={this.props.showWallClick} />
               </div>
               <div className="col s1" style={{height:"100%"}}>

               </div>
             </div>
             <div style={{width:"80%", height:"80%",float:"left"}}>
               <MapContainer getMapFocus={this.getMapFocus} userPictures={this.props.userPictures} />
             </div>
             <div style={{width:"20%", height:"80%",float:"right"}}>
               <PicturesViewer userPictures={this.props.userPictures}
                               onPictureClick={this.pictureViewerClick}
               />
             </div>
             <PictureModal userPictures={this.props.userPictures}
                           pictureId={this.state.modalPictureId}
                           getOpen={this.getOpenPictureModal}
                           windowHeight={this.props.windowHeight}
             />
           </div>
       )
   }
});


