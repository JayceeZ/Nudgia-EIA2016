/**
 * Created by alexandre on 02/06/16.
 */

/**
 * Props :  --> id : id to give to the component
 *          --> content : [{content:content1,data:data1},{content:content2,data:data2}, ...] 
 *                          items to show in the collection (content can be text or component)
 *          --> onClick : callback(data) when an item is clicked
 *          --> style : custom style for the container
 *          --> itemStyle : custom styles to apply to items
 */

window.Collection = React.createClass({
    getInitialState:function(){
        return {id:(this.props.id ? this.props.id : generateID())}
    },
    componentDidUpdate:function(){
        
    },
    onClick:function(item){
        if(this.props.onClick)
            this.props.onClick(item);
    },
    render:function(){
       var content = [];
        var style = this.props.style ? this.props.style : {};
        if(!style["margin"]) style["margin"] = "0";
        if(!style["overflow"]) style["overflow"] = "visible";
       for(var c in this.props.content)
            content.push(<a href="#!" className="collection-item" style={this.props.itemStyle ? this.props.itemStyle : {}} onClick={this.props.content[c].data ? this.onClick.bind(null,this.props.content[c].data) : ""} >
                            {this.props.content[c].content}
                         </a>)
       return(
           <div id={this.state.id} className="collection" style={style}>
               {content}
           </div>
       )
    }
});