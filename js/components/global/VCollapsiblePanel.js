/**
 * Created by alexandre on 30/06/16.
 */

/**
 * Props :  --> id : id to give to the component
 *          --> header
 *          --> content : content to show when panel un-collapse (can be a component)
 *          --> duration
 *          --> backgroundColor :
 */

window.VCollapsiblePanel = React.createClass({
   getInitialState:function(){
       return({id:(this.props.id ? this.props.id : generateID()),open:false})
   },
    onHeaderClick:function(){
      this.setState({open:!this.state.open});
    },
    render:function(){
        return(
            <div className="v-collapsible-panel z-depth-1"
                 style={{"background-color":(this.props.backgroundColor ? this.props.backgroundColor : "white"),
                    "border":"1px solid #ddd","border-bottom":"0"
                 }}
            >
                <div className="v-collapsible-panel-header"
                     style={{"cursor":"pointer","border-bottom":"solid 1px #ddd","min-height": "3rem", "line-height": "3rem","padding": "0 1rem"}}
                     onClick={this.onHeaderClick}>
                    {this.props.header}
                </div>
                <div className="v-collapsible-panel-content" style={{"border-bottom":"solid 1px #ddd"}}>
                    <VerticalCollapsible open={this.state.open}
                                         content={this.props.content}
                                         backgroundColor={this.props.backgroundColor}
                                         duration={this.props.duration}
                                         disableDepth={true}
                    />
                </div>
            </div>
        )
    }
});