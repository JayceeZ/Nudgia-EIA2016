/**
 * Created by alexandre on 20/06/16.
 */

/**
 *  Props : --> sidebars : [{id,title,icon,content},{...},...]
 *          --> width : width of collapsible sidebars
 *          --> height : height of sidebar
 *          --> onSidebarChange : call onSidebarChange(id) when there is a change in selected sidebar
 *          --> beforeOpen : called before sidebar is opened (a callback is sent to the function and must be called to open the sidebar)
 *          --> onOpened : called after sidebar is opened
 *          --> beforeClose : called before sidebar is closed (a callback is sent to the function and must be called to close the sidebar)
 *          --> onClosed : called after sidebar is closed
 */

window.Sidebar = React.createClass({
    getInitialState:function(){
        return {id:(this.props.id ? this.props.id : generateID()),selector:null, selected:0, opened:true, width:(this.props.width ? this.props.width : $(window).width()/3), height:(this.props.height ? this.props.height : $(window).height()*8/10)}
    },
    componentDidMount:function(){
        this.setState({selector:$('#'+this.state.id)});
        var _this = this;
        if(!this.props.width || !this.props.height) {
          $(window).resize(function () {
            _this.setState({width:(_this.props.width ? _this.props.width : $(window).width()/3),
                            height: (_this.props.height ? _this.props.height : $(window).height()*8/10)})
          });
        }
    },
    componentDidUpdate:function(){
        this.state.selector.find(".sidebar-icon").hover(function(){$(this).css("background-color","#EEEEEE")},function(){$(this).css("background-color","#FFFFFF")});
    },
    onIconClick:function(index){
        if(this.state.opened){
            if(this.state.selected == index)
                this.close();
            else
                this.selectSidebar(index);
        }else {
            this.open();
            this.selectSidebar(index);
        }
    },
    selectSidebar:function(index) {
      this.setState({selected: index});
      if (this.props.onSidebarChange)
        this.props.onSidebarChange(this.props.sidebars[index].id);
    },
    open:function(){
        this.setState({opened:true});
    },
    close:function(){
        this.setState({opened:false});
    },
    render:function(){
        var _this=this;
        var icons = [];
        for(var i = 0; i < this.props.sidebars.length; i++) {
            icons.push(<div className={"valign-wrapper sidebar-icon"+(this.state.opened && i == this.state.selected ? " blue darken-1 white-text" : "")}
                            style={{height:"40px",cursor:"pointer",padding:"0"}}>
                <i className="material-icons valign"
                   onClick={(function(index){return function(){_this.onIconClick(index)}})(i)}
                   style={{"margin-left":"auto","margin-right":"auto"}}
                >
                    {this.props.sidebars[i].icon}
                </i>
            </div>)
        }
        var content = [];
        for(i = 0; i < this.props.sidebars.length; i++) {
            content.push(<div className={i == this.state.selected ? "" : "hide"} style={{width:"100%"}}>
                            <div className="blue darken-1 white-text valign-wrapper" style={{height:"40px"}}>
                                <h5 className="valign" style={{"margin":"0 0 0 15px"}}>{this.props.sidebars[i].title}</h5>
                                <i className="material-icons valign right-align"
                                   style={{cursor:"pointer","margin-left":"auto","margin-right":"10px"}}
                                   onClick={this.close}>keyboard_arrow_left</i>
                            </div>
                            {this.props.sidebars[i].content}
                        </div>)
        }
        return(
            <div id={this.state.id} className="sidebar z-depth-1" style={{"background-color":"white","display":"inline-block","width":"auto",height:this.state.height+"px"}}>
                <div className="sidebar-menu" style={{width:"40px",display:"inline-block"}}>
                    {icons}
                </div>
                <div className="sidebar-content" style={{display:"inline-block","vertical-align":"top","height":"100%","overflow-y":(this.state.opened ? "scroll" : "hidden")}}>
                    <HorizontalCollapsible open={this.state.opened}
                                           content={content}
                                           width={this.state.width}
                                           beforeOpen={this.props.beforeOpen}
                                           onOpened={this.props.onOpened}
                                           beforeClose={this.props.beforeClose}
                                           onClosed={this.props.onClosed}
                    />
                </div>
            </div>
        )
    }
});
