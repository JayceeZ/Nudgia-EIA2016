/**
 * Created by alextis on 19/07/16.
 */

window.WallOverviewTopBar = React.createClass({
  getInitialState:function(){
    return{sliderSelector:null}
  },
  componentDidMount:function(){

  },
  onWallPictureClick:function(picId){
    this.props.showWallClick(picId);
  },
  render:function(){
    var wallPictures = [];
    var sortedPictures = getSortedPictures(this.props.wallPictures);
    for(var i = 0; i < sortedPictures.length && i < 10; i++){
      wallPictures.push(<img className="z-depth-1"
                             src={sortedPictures[i].url}
                             style={{height:"100%","margin-right":"5px","cursor":"pointer","border":"1px solid white"}}
                             onClick={this.onWallPictureClick.bind(null,sortedPictures[i].id)}
      />)
    }
    return(
      <div style={{width:"100%",height:"100%"}}>
        <div style={{width:"97%",height:"100%",float:"left", "overflow":"hidden"}} >
          <div id="top-bar-wall-slider" style={{width:"150%",height:"100%",padding:"5px"}}>
            {wallPictures}
          </div>
        </div>
        <div style={{width:"3%",height:"100%",float:"right",padding:"5px 0"}}>
          <div className="valign-wrapper" style={{cursor:"pointer",width:"100%",height:"100%","background-color":"white"}}>
            <i className="material-icons valign"  >keyboard_arrow_right</i>
          </div>
        </div>
      </div>
    )
  }
});