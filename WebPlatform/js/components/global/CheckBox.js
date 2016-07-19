/**
 * Created by alexandre on 27/06/16.
 */

/**
 * Props : --> id : id of the component
 *         --> label : text to display next to the checkbox
 *         --> onChange : called when checkbox is checked or unchecked
 */

window.CheckBox = React.createClass({
  getInitialState:function(){
    return {id:(this.props.id ? this.props.id : generateID())}
  },
  onClick:function(){
    if(this.props.onClick)
      this.props.onClick($("#"+this.state.id).is(":checked"))
  },
  render:function(){
    return(
      <div>
        <input type="checkbox" id={this.state.id} onClick={this.onClick} />
        <label htmlFor={this.state.id}>{this.props.label}</label>
      </div>
    )
  }
});
