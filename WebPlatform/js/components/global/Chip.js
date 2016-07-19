/**
 * Created by alexandre on 23/06/16.
 */

/**
 * Props : --> id : id of the component
 *         --> text : text of the chip
 *         --> image : display an image (from the given url) within the chip (on the left)
 *         --> close : if true, add a close icon which allow to close the chip
 */

window.Chip = React.createClass({
    getInitialState:function(){
      return {id:(this.props.id ? this.props.id : generateID())}
    },
    render:function(){
      return(
        <div className={"chip "+(this.props.text != "" ? "" : "hide")}>
          {this.props.image ? <img src={this.props.image} alt="Contact Person" /> : null}
          {this.props.text}
          {this.props.close ? <i className="material-icons">close</i> : null}
        </div>
      )
    }
});
