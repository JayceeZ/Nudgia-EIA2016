/**
 * Created by alexandre on 13/06/16.
 */

/**
 * Props :  --> id : id to give to the component
 *          --> header : text or component to put as header (opener of the dropdown)
 *          --> content : [{content:content1,data:data1},{content:content2,data:data2}, ...]
 *                          items to show in the dropdown
 *          --> onClick : callback(data) when an item is clicked
 *          --> style : custom styles to apply to container
 *          --> belowOrigin : If true, the dropdown will show below the activator. Default: false
 */

window.DropDown = React.createClass({
    getInitialState:function(){
        return {id:(this.props.id ? this.props.id : generateID()), headerId: generateID(), contentId: generateID()}
    },
    componentDidMount:function(){
        $('#'+this.state.headerId).dropdown({belowOrigin:this.props.belowOrigin ? this.props.belowOrigin : false});
        var items = $('#'+this.state.contentId+" a");
        var _this = this;
        for(var i=0; i < items.length; i++) {
            items[i].onclick = function () {
                _this.onClick($(this).data('click'))
            };
        }
    },
    onClick:function(data){
        if(this.props.onClick)
            this.props.onClick(data);
    },
    render:function(){
        var style = this.props.style ? this.props.style : {};
        var content = [];
        for(var item in this.props.content)
            content.push(<li><a href="#!" data-click={this.props.content[item].data}>{this.props.content[item].content}</a></li>)
        return(
            <div id={this.state.id} style={style}>
               <a id={this.state.headerId} className="dropdown-button" href="#" data-activates={this.state.contentId}>{this.props.header}</a>
               <ul id={this.state.contentId} className="dropdown-content">
                   {content}
               </ul>
            </div>
        )
    }
});