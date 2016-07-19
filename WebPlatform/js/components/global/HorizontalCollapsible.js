/**
 * Created by alexandre on 20/06/16.
 */

/**
 *  Props : --> id : id to give to the component
 *          --> open : if true, open the panel, else, close the panel
 *          --> width : width of the panel
 *          --> content : panel's content
 *          --> contentClass : class to add to content panel
 *          --> duration : duration of transitions
 *          --> beforeOpen : called before panel is opened (a callback is sent to the function and must be called to open the panel)
 *          --> onOpened : called after panel is opened
 *          --> beforeClose : called before panel is closed (a callback is sent to the function and must be called to close the panel)
 *          --> onClosed : called after panel is closed
 */

window.HorizontalCollapsible = React.createClass({
    getInitialState:function(){
        return {id:(this.props.id ? this.props.id : generateID()),wselector:null,cselector:null,status:"opened"}
    },
    componentDidMount:function(){
        var wselector = $('#'+this.state.id);
        var cselector= $("#"+this.state.id+"-content-container");
        this.setState({wselector:wselector,cselector:cselector});
    },
    componentDidUpdate:function(){
        if(this.state.status != "transition") {
            if (this.props.open && this.state.status == "closed")
                this.open();
            else if (this.props.open == false && this.state.status == "opened")
                this.close();
        }
    },
    open:function(){
      var _this = this;
      this.setState({status:"transition"},function() {
        if (_this.props.beforeOpen)
          _this.props.beforeOpen(_this.opening);
        else _this.opening();
      })
    },
    opening:function(){
      var _this = this;
      var wrapper = this.state.wselector;
      wrapper.animate({width:"+="+this.props.width+"px"},(this.props.duration ? this.props.duration : 500),function(){
        _this.setState({status:"opened"},function(){
          if(_this.props.onOpened)
            _this.props.onOpened();
        });
      })

    },
    close:function(){
      var _this = this;
      this.setState({status:"transition"},function() {
        if (_this.props.beforeClose)
          _this.props.beforeClose(_this.closing);
        else _this.closing();
      })
    },
    closing:function(){
      var _this = this;
      var wrapper = this.state.wselector;
      var container = this.state.cselector;
      container.width(container.width());
      wrapper.animate({width:"-="+wrapper.width()+"px"},(this.props.duration ? this.props.duration : 500),function(){
        wrapper.css("width","0");
        _this.setState({status:"closed"},function(){
          if(_this.props.onClosed)
            _this.props.onClosed();
        });
      })
    },
    render:function(){
        return(
                <div id={this.state.id} className="content-wrapper" style={this.state.status == "transition" ? {"overflow-x":"hidden"} : null}>
                    <div id={this.state.id+"-content-container"} style={{width:this.props.width}} className={"content-container "+(this.props.contentClass ? this.props.contentClass : "")+(this.state.status == "closed" ? " hide" : "")}>
                        {this.props.content ? this.props.content : null}
                    </div>
                </div>
        )
    }
});
