/**
 * Created by alextis on 19/07/16.
 */

window.WallOverviewTopBar = React.createClass({
  getInitialState:function(){
    return{sliderSelector:null}
  },
  componentDidMount:function(){

  },
  render:function(){
    var buttonContent = <div className="valign-wrapper"><h5 className="valign">Wall of Fun</h5></div>;
    var wallPictures = [];
    var sortedPictures = getSortedPictures(this.props.wallPictures);
    for(var i = 0; i < 8; i++){
      wallPictures.push(<img className="z-depth-1"
                             src={sortedPictures[i].url}
                             style={{height:"100%","margin-right":"5px","cursor":"pointer"}}/>)
    }
    return(
      <div style={{height:"20%",width:"100%"}}>
        <div style={{width:"15%",height:"100%",float:"left"}}>
          <Button text={buttonContent} color="green" style={{height:"80%","margin":"10% 10px"}}/>
        </div>
        <div style={{width:"85%",height:"100%",float:"right", "overflow-x":"hidden"}} >
          <div id="top-bar-wall-slider" style={{width:"150%",height:"100%",padding:"10px 0"}}>
            {wallPictures}
          </div>
        </div>
      </div>
    )
  }
});