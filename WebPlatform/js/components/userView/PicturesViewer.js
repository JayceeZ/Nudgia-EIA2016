/**
 * Created by alextis on 19/07/16.
 */

window.PicturesViewer = React.createClass({
    render:function(){
      var pictures = [];
      for(var picId in this.props.userPictures){
        var alert = null;
        if((this.props.userPictures[picId].status.type == "driving" && this.props.userPictures[picId].status.detail != "good") || (this.props.userPictures[picId].status.type == "pokemon" && this.props.userPictures[picId].status.detail.indexOf("Failing") > -1))
          alert = <h6 className='popup-alert'>{this.props.userPictures[picId].status.detail}</h6>;
        else if(this.props.userPictures[picId].status.type == "pokemon")
          alert = <h6 className='popup-green-detail'>{this.props.userPictures[picId].status.detail}</h6>;
        var pic =
          <div className="z-depth-1" style={{"text-align":"center","padding":"5px 3px","margin-left":"5px","margin-right":"2px","margin-bottom":"5px"}}>
            <span>{this.props.userPictures[picId].timestamp}</span>
            <img src={this.props.userPictures[picId].url}
                 style={{width:"100%",display:"block",cursor:"pointer"}}
                 onClick={this.props.onPictureClick.bind(null,picId)}
            />
            {alert}
          </div>;
        pictures.push(pic);
      }
      return(
        <div style={{width:"100%",height:"100%",padding:"2px",margin:"0","overflow-y":"auto"}}>
          {pictures}
        </div>
      )
    }
});