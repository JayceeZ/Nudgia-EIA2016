/**
 * Created by alexandre on 03/06/16.
 */
/**
 * Props : --> id : id to give to the component
 *         --> text : button text
 *         --> onClick : callback function when button is clicked
 *         --> color : color of the button
 *         --> style : custom style to add to the button
 *         --> className : additional classname to give to the button
 *         --> iconLeft : button icon left
 *         --> iconRight : button icon right
 *         --> disabled : disable the button
 */

window.Button = React.createClass({
    getInitialState:function(){
        return {id:(this.props.id ? this.props.id : generateID())}
    },
    render:function(){
        var classname=this.props.className+" waves-effect waves-light btn";
        if(this.props.color)
            classname += " "+this.props.color;
        if(this.props.disabled)
            classname += " disabled";
        return(
            <a className={classname} onClick={this.props.disabled ? undefined : this.props.onClick} style={this.props.style}>
                {this.props.iconLeft ? <i class="material-icons left">{this.props.iconLeft}</i> : null}
                {this.props.iconRight ? <i class="material-icons right">{this.props.iconRight}</i> : null}
                {this.props.text}
            </a>
        )
    }
});