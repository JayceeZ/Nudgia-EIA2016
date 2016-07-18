/**
 * Created by alexandre on 01/07/16.
 */

/**
 * Props :  --> id : id to give to the component
 *          --> content : content of the component
 *          --> tooltip : content of the tooltip
 *          --> position : (left,right,top,bottom) position of the tooltip compared to content (default : bottom)
 */

window.ToolTipped = React.createClass({
    getInitialState:function(){
        return {id:(this.props.id ? this.props.id : generateID()),show:false,contentWidth:0,contentHeight:0,selector:null};
    },
    componentDidMount:function(){
        this.setState({selector:$("#"+this.state.id)});
    },
    componentDidUpdate:function(){
        if(this.state.selector) {
            var content = this.state.selector.find(".tool-tipped-content");
            var cwidth = content.width();
            var cheight = content.height();
            if(cwidth != this.state.contentWidth || cheight != this.state.contentHeight)
                this.setState({contentWidth:cwidth,contentHeight:cheight});
        }
    },
    onMouseEnter:function(){
        this.setState({show:true});
    },
    onMouseLeave:function(){
        this.setState({show:false});
    },
    render:function(){
        var top = "",left = "",bottom = "", right = "";
        var position = this.props.position ? this.props.position : "bottom";
        if(position == "top") bottom = "-5";
        else if(position == "bottom") top = (this.state.contentHeight + 5)+"";
        else if(position == "left") {right = "-5"; top = "0"}
        else if(position == "right") {left = (this.state.contentWidth + 5)+""; top = "0"}
        return(
            <div id={this.state.id} className="tool-tipped">
                <div className="tool-tipped-content" onMouseOver={this.onMouseEnter} onMouseOut={this.onMouseLeave}>
                    {this.props.content}
                </div>
                <div className="tool-tip z-depth-1"
                     style={{display:(this.state.show ? "inline-block" : "none"),
                     position:"absolute",
                     top:top,
                     bottom:bottom,
                     left:left,
                     right:right,
                     zIndex:"3000",
                     "background-color":"white",
                     "color":"black",
                     "font-size":"12px",
                     "border-radius":"3px",
                     "width":"250px",
                     "padding":"5px"}}>
                    <span >{this.props.tooltip}</span>
                </div>
            </div>
        )
    }
});