/**
 * Created by alextis on 18/07/16.
 */

window.MainApp = React.createClass({
    getInitialState:function(){
      return {windowHeight:$(window).height(), currentView:"user", openWallPicture:null}
    },
    componentDidMount:function(){
      var _this = this;
      $(window).resize(function(){
        _this.setState({windowHeight:$(this).height()});
      });
    },
    getOpenWallPicture:function(opener){
      this.setState({openWallPicture:opener});
    },
    showUserView:function(){
      this.setState({currentView:"user"})
    },
    showWallView:function(picId){
      var _this = this;
      this.setState({currentView:"wall"},function(){
        if(picId){
          _this.state.openWallPicture(picId);
        }
      })
    },
   render:function(){
       return(
           <div>
             <div style={{height:"100%",width:"100%",display:(this.state.currentView == "user" ? "block": "none")}}>
               <UserView userPictures={this.props.userPictures}
                         wallPictures={this.props.wallPictures}
                         windowHeight={this.state.windowHeight}
                         showWallClick={this.showWallView}
               />
             </div>
             <div style={{height:"100%",width:"100%",display:(this.state.currentView == "wall" ? "block": "none")}}>
                <WallView wallPictures={this.props.wallPictures}
                          windowHeight={this.state.windowHeight}
                          showUserView={this.showUserView}
                          getOpenPicture={this.getOpenWallPicture}
                />
             </div>
           </div>
       )
   }
});
