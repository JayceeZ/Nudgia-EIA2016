/**
 * Created by alextis on 18/07/16.
 */

window.MainApp = React.createClass({
    getInitialState:function(){
      return {windowHeight:$(window).height()}
    },
    componentDidMount:function(){
      var _this = this;
      $(window).resize(function(){
        _this.setState({windowHeight:$(this).height()});
      });
    },
   render:function(){
       return(
           <div>
               <UserView userPictures={this.props.userPictures}
                         wallPictures={this.props.wallPictures}
                         windowHeight={this.state.windowHeight}
               />
           </div>
       )
   }
});
