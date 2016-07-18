/**
 * Created by alexandre on 01/06/16.
 */

/**
 * Props :  --> id : id to give to the component
 *          --> header : header content of the panel (can be a component)
 *          --> content : content to show when panel un-collapse (can be a component)
 */

window.CollapsiblePanel = React.createClass({
    getInitialState:function(){
        return {id:(this.props.id ? this.props.id : generateID())}
    },
    componentDidMount:function(){
        $('#'+this.state.id).collapsible({accordion: false});
    },
   render : function(){
        return(
            <ul id={this.state.id} className="collapsible" data-collapsible="accordion">
                <li>
                    <div className="collapsible-header">{this.props.header}</div>
                    <div className="collapsible-body">{this.props.content}</div>
                </li>
            </ul>
        )
   }
});
