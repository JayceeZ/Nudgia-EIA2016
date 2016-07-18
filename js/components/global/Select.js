/**
 * Created by alexandre on 01/06/16.
 */

/**
 * Props : --> id : id to give to the component
 *         --> options : { val1 : name1, val2 : name2 } options for the select
 *         --> label : label for the select
 *         --> placeholder : placeholder for the select
 *         --> className : custom className for the select
 *         --> style : custom styles for the select
 *         --> onChange : callback({val:selectedVal,name:selectedName}) when there is a change in selected option
 *         --> defaultSelect : the value of the option to select when component is mounted
 *         --> getReset : send the reset function (which select placeholder) to getReset
 *         --> getSelectOption : send the select option by value function to getSelectOption
 */
window.Select = React.createClass({
    getInitialState:function(){
      return {id:(this.props.id ? this.props.id : generateID()),selector:null}
    },
    componentDidMount:function() {
        this.setState({selector: $('#' + this.state.id)},this.initComponent);
        if(this.props.getReset)
            this.props.getReset(this.reset);
    },
    componentDidUpdate:function(){
        this.update();
    },
    reset:function(){
        if(this.props.placeholder)
            this.selectOptionByValue("");
        else
            this.state.selector.prop("selectedIndex",-1);
    },
    initComponent: function(){
        this.update();
        var _this = this;
        this.state.selector.on('change',function(){
            _this.onChange({val:$(this).val(),name:$(this).text()});
        });
        if(this.props.defaultSelect){
            this.selectOptionByValue(this.props.defaultSelect);
        }
        if(this.props.getSelectOption)
            this.props.getSelectOption(this.selectOptionByValue);
    },
    selectOptionByValue: function(value){
        this.state.selector.val(value);
        this.update();
    },
    update: function(){
        this.state.selector.material_select();
    },
    onChange: function(option){
        if(this.props.onChange)
            this.props.onChange(option);
    },
    render: function(){
        var options = [];
        var label = null;
        var style = this.props.style ? this.props.style : {};
        if(this.props.placeholder)
            options.push(<option value="" disabled selected>{this.props.placeholder}</option>);
        if(this.props.options){
            for(var option in this.props.options)
                options.push(<option value={option}>{this.props.options[option]}</option>);
        }
        if(this.props.label){
            label = <label>{this.props.label}</label>;
        }else
            style["margin-top"] = 0;
        return(
            <div className={"input-field "+this.props.className ? this.props.className : ""} style={style}>
                <select id={this.state.id}>
                    {options}
                </select >
                {label}
            </div>
        )
    }
});