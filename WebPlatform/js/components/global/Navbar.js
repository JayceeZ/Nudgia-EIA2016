/**
 * Created by alexandre on 21/06/16.
 */

/**
 * props : --> content : [component,text,component,...] components (or text) to put in the navbar
 *         --> height
 *         --> backgroundColor
 *         --> textColor
 */

window.Navbar = React.createClass({
    getInitialState:function(){
        return {}
    },
    render:function(){
      var content = [];
      if(this.props.logo)
          content.push(<li style={{height:(this.props.height ? this.props.height+"px" : ""),"margin-left":"10px","margin-right":"10px"}}>
              <div style={{display:"inline-block","vertical-align":"middle","line-height":"initial"}}>
                <img src={this.props.logo} width="25" height="25"/></div></li>)
      if(this.props.content)
        for(var i = 0;i < this.props.content.length; i++)
          content.push(<li style={{height:(this.props.height ? this.props.height+"px" : "")}}>
                        <a style={{"vertical-align":"middle","color":(this.props.textColor ? this.props.textColor : "#333")}}>
                          <div style={{"line-height":"initial"}}>{this.props.content[i]}</div></a></li>)
      return(
          <nav style={{"background-color":(this.props.backgroundColor ? this.props.backgroundColor : "white"),
                        "height":(this.props.height ? this.props.height : ""),
                        "line-height":(this.props.height ? this.props.height : "")}}>
            <div className="nav-wrapper">
              <ul className="left">
                  {content}
              </ul>
            </div>
          </nav>
      )
    }
});
