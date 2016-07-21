/**
 * Created by alextis on 20/07/16.
 */

window.WallView = React.createClass({
  getInitialState:function(){
    return({modalPictureId:null,openModal:null});
  },
  componentDidMount:function(){
    this.props.getOpenPicture(this.onPictureClick);
  },
  getModalOpen:function(opener){
    this.setState({openModal:opener});
  },
  onPictureClick:function(picId){
    var _this = this;
    this.setState({modalPictureId:picId},function(){
      _this.state.openModal();
    })
  },
  upvoteClick:function(picId){
    this.props.wallPictures[picId].userUpvoted = true;
    this.props.wallPictures[picId].score++;
    this.setState({});
  },
  render:function(){
    var column1 = [];
    var column2 = [];
    var column3 = [];
    var column4 = [];
    var i = 0;
    var sorted = getSortedPictures(this.props.wallPictures);
    for(var index in sorted){
      var pic = sorted[index].id;
      var targetColumn = column1;
      if(i%4 == 1) targetColumn = column2;
      if(i%4 == 2) targetColumn = column3;
      if(i%4 == 3) targetColumn = column4;
      var upvoted = this.props.wallPictures[pic].userUpvoted ? true: false;
      var picDisplay = <div className="z-depth-1" style={{width:"100%",padding:"10px",margin:"15px 0"}}>
                          <div>
                            <img src={this.props.wallPictures[pic].url} width="100%" style={{cursor:"zoom-in"}} onClick={this.onPictureClick.bind(null,pic)}/>
                          </div>
                          <div className="valign-wrapper" style={{"text-align":"center","height":"40px"}}>
                            <span className="valign" style={{"margin-right":"20px"}}>
                              {upvoted
                                ? <div className="valign-wrapper" style={{height:"36px"}}><i style={{color:"green","margin":"0 auto"}} className="material-icons valign">sentiment_very_satisfied</i></div>
                                : <Button text={<i className="material-icons">sentiment_very_satisfied</i>}
                                          color="green"
                                          style={{padding:"0 10px"}}
                                          onClick={this.upvoteClick.bind(null,this.props.wallPictures[pic].id)}
                              />
                              }
                            </span>
                            <span className="valign">
                              Funny points : {this.props.wallPictures[pic].score}
                            </span>

                          </div>
                       </div>;
      targetColumn.push(picDisplay);
      i++;
    }
    return(
      <div style={{width:"100%",height:"100%","overflow-y":"auto"}}>
        <div style={{height:"20%","background-color":"#4CAF50"}}>
          <div className="col s4 valign-wrapper" style={{height:"100%","padding-left":"40px"}}>
              <Button text="My pictures" color="blue" className="valign" onClick={this.props.showUserView} />
          </div>
          <div className="col s4 valign-wrapper" style={{height:"100%","text-align":"center"}}>
            <h5 className="valign" style={{width:"100%","color":"white","border-radius":"5px","padding":"20px 0"}} >WALL OF FUN</h5>
          </div>
          <div className="col s4" style={{height:"100%"}}>

          </div>
        </div>
        <div style={{height:"80%"}}>
          <div className="col s3">
            {column1}
          </div>
          <div className="col s3">
            {column2}
          </div>
          <div className="col s3">
            {column3}
          </div>
          <div className="col s3">
            {column4}
          </div>
        </div>
        <WallModal wallPictures={this.props.wallPictures}
                   pictureId={this.state.modalPictureId}
                   getOpen={this.getModalOpen}
                   windowHeight={this.props.windowHeight}
                   upvoteClick={this.upvoteClick}
        />
      </div>
    )
  }
});


var WallModal = React.createClass({
  render:function(){
    var content = null;
    if(this.props.pictureId){
      var picture = this.props.wallPictures[this.props.pictureId];
      var upvoted = picture.userUpvoted ? true: false;
      content = <div style={{"text-align":"center"}}>
          <div>
            <img src={picture.url} style={{height:this.props.windowHeight*55/100}} />
          </div>
          <div style={{display:'inline-block',"margin":"0 auto"}}>
            <div className="valign-wrapper" style={{"text-align":"center","height":"40px"}}>
                <span className="valign" style={{"margin-right":"20px",display:'inline-block'}}>
                  {upvoted
                    ? <div className="valign-wrapper" style={{height:"36px"}}><i style={{color:"green","margin":"0 auto"}} className="material-icons valign">sentiment_very_satisfied</i></div>
                    : <Button text={<i className="material-icons">sentiment_very_satisfied</i>}
                              color="green"
                              style={{padding:"0 10px"}}
                              onClick={this.props.upvoteClick.bind(null,picture.id)}
                      />
                  }
                </span>
                <span className="valign" style={{display:'inline-block',"vertical-align":"center"}}>
                  Funny points : {picture.score}
                </span>
              </div>
          </div>
        </div>;
    }
    return(
      <Modal content={content} getOpen={this.props.getOpen}  />
    )
  }
});