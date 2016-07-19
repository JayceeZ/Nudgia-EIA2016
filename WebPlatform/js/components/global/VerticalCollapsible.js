/**
 * Created by alexandre on 29/06/16.
 */

/**
 * Props :  --> id : id to give to the component
 *          --> content : content to show when panel un-collapse (can be a component)
 *          --> open :
 *          --> duration
 *          --> backgroundColor :
 *          --> disableDepth
 */

window.VerticalCollapsible = React.createClass({
  getInitialState:function(){
    return {id:(this.props.id ? this.props.id : generateID()), status:"closed", wselector:null, cselector:null}
  },
  componentDidMount:function(){
    var ws = $("#"+this.state.id);
    var cs = $("#"+this.state.id+" .v-collapsible-content");
    this.setState({wselector:ws,
                   cselector:cs
    });
  },
  componentDidUpdate:function(){
    if(this.state.status != "transition"){
      if((this.props.open && this.state.status == "closed") || (this.props.open == false && this.state.status == "opened")){
         var transition = this.state.status == "opened" ? "closed" : "opened";
         var _this = this;
         this.setState({status:"transition"},function(){
           var height = transition == "opened" ? this.state.cselector.height() : this.state.wselector.height();
           var change = (transition == "opened" ? "+" : "-") + "=" + height + "px";
           _this.state.wselector.animate({height:change},(_this.props.duration ? _this.props.duration : 500),function(){
              _this.setState({status:transition});
           })
         }) 
      }else if(this.state.status == "opened"){
        this.state.wselector.height(this.state.cselector.height());
      }
    }
  },
  render:function(){
    return(
      <div id={this.state.id}
           className={"v-collapsible-wrapper "+(this.props.disableDepth ? "" : "z-depth-1")}
           style={{"background-color":(this.props.backgroundColor ? this.props.backgroundColor : "white"),
                   "overflow-y":(this.state.status == "transition" ? "hidden" : ""),"height":"0"
           }}
      >
          <div className="v-collapsible-content"
               style={{"display":(this.state.status == "closed" ? "none" : "block")}}
          >
            {this.props.content}
          </div>
      </div>
    )
  }
});
