/**
 * Created by alextis on 19/07/16.
 */

window.PictureModal = React.createClass({
  render:function(){
    var content = null;
    if(this.props.pictureId){
      content = <img src={this.props.userPictures[this.props.pictureId].url} width={this.props.windowHeight*60/100} />
    }
    return(
      <Modal content={content} getOpen={this.props.getOpen} />
    )
  }
});