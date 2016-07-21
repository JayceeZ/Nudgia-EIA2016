/**
 * Created by alextis on 19/07/16.
 */

window.PictureModal = React.createClass({
  render:function(){
    var alert = null;
    var content = null;
    if(this.props.pictureId){
      var picId = this.props.pictureId;
      if((this.props.userPictures[picId].status.type == "driving" && this.props.userPictures[picId].status.detail != "good") || (this.props.userPictures[picId].status.type == "pokemon" && this.props.userPictures[picId].status.detail.indexOf("Failing") > -1))
        alert = <h6 className='popup-alert'>{this.props.userPictures[picId].status.detail}</h6>;
      else if(this.props.userPictures[picId].status.type == "pokemon")
        alert = <h6 className='popup-green-detail'>{this.props.userPictures[picId].status.detail}</h6>;
      content =
        <div style={{"text-align":"center"}}>
          <h5 style={{"margin-top":"0"}}>{this.props.userPictures[this.props.pictureId].timestamp}</h5>
          <div>
            <img className="modal-picture"
                 src={this.props.userPictures[this.props.pictureId].url}
                 style={{height:this.props.windowHeight*50/100}}
            />
          </div>
          <div>{alert}</div>
          <div className="modal-buttons-container">
            <div>
              <img src="styles/images/facebookButton.png" />
              <img src="styles/images/twitterButton.png" />
              <img src="styles/images/instagramButton.png" />
            </div>
            <div>
              <Button text="Post on the Wall of Fun" noUppercase={true} color="green" />
            </div>
          </div>
        </div>;
    }
    return(
      <Modal content={content} getOpen={this.props.getOpen} />
    )
  }
});