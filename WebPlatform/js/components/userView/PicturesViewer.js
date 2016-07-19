/**
 * Created by alextis on 19/07/16.
 */

window.PicturesViewer = React.createClass({
    render:function(){
      var pictures = [];
      for(var picId in this.props.userPictures){
        var alert = null;
        if(this.props.userPictures[picId].drivingStatus != "good")
          alert = <span style={{color:"red"}}>{this.props.userPictures[picId].drivingStatus}</span>;
        var pic =
          <div style={{"text-align":"center","padding":"5px 0","border-top":"1px solid #bce8f1","border-bottom":"1px solid #bce8f1","border-collapse":"collapse"}}>
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
        <div style={{width:"20%",height:"100%",padding:"2px",margin:"0","overflow-y":"auto",display:"inline-block"}}>
          {pictures}
        </div>
      )
    }
});