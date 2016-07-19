/**
 * Created by alexandre on 02/06/16.
 */

/**
 * Props : --> id : id to give to the component
 *         --> type : type of input
 *         --> placeholder : placeholder for the input
 *         --> defaultValue : value placed in the input when initiated
 *         --> label : label for the input
 *         --> getSetValue : call getSetValue(this.setValue) when componenet is mounted
 *         --> getReset : call getReset(this.reset) when component is mounted
 *         --> onChange : callback(value) when there is a change in the input
 *         --> validate : if true, show valid/invalid colors depending of input type and user entry
 *         --> validateSuccess : custom valid input message
 *         --> validateError : custom invalid input message
 *         --> invalid : if true, input will have invalid color
 *         --> disabled : if true, input will be disabled
 *         --> autoComplete : [{val:val1,tip:tip1},{val:val2},...]
 *         --> autoCompleteMaxDisplay
 *         --> autoCompleteMaxHeight       
 */

window.InputField = React.createClass({
    getInitialState:function(){
        return {id:(this.props.id ? this.props.id : generateID()),selector:null,
                value: this.props.defaultValue ? this.props.defaultValue : "", autoComplete:[]}
    },
    componentDidMount:function(){
        if(this.props.getReset)
            this.props.getReset(this.reset);
        if(this.props.getSetValue)
            this.props.getSetValue(this.setValue);
        Materialize.updateTextFields();
        var _this = this;
        this.setState({selector:$("#"+this.state.id)},function(){
            if(_this.props.autoComplete){
                _this.state.selector.focus(function(){_this.autoCompleteCheck()});
                $(window).click(function(){_this.setState({autoComplete:[]})});
                _this.state.selector.click(function(event){event.stopPropagation()});
            }
        });
    },
    setValue:function(value){
        var _this = this;
        this.setState({value:value,autoComplete:[]},function(){
            if(_this.props.onChange)
                _this.props.onChange(value);
        });
    },
    onChange:function(e){
        var _this = this;
        this.setState({value: e.target.value},function(){
            if(_this.props.autoComplete)
                _this.autoCompleteCheck();
        });
        if(this.props.onChange)
            this.props.onChange(e.target.value);
    },
    autoCompleteCheck:function(){
        var val = this.state.value;
        var l = val.length;
        var autoComplete = [];
        if(l > 0) {
            for (var i in this.props.autoComplete) {
                var data = this.props.autoComplete[i];
                if(data.val == val){
                    autoComplete = [];
                    break;
                }
                if(l <= data.val.length && data.val.substring(0,l).toLowerCase() == val.toLowerCase())
                    autoComplete.push(data);
                if(this.props.autoCompleteMaxDisplay && autoComplete.length == this.props.autoCompleteMaxDisplay)
                    break;
            }
        }
        this.setState({autoComplete:autoComplete});
    },
    reset:function(){
        this.setState({value:(this.props.defaultValue ? this.props.defaultValue : "")});  
    },
    render:function(){
        var className = "";
        if(this.props.invalid)
            className = "validate invalid";
        else if(this.props.validate)
            className = "validate";
        var showAutoComplete = false;
        var autoCompleteData = [];
        if(this.props.autoComplete && this.state.selector && this.state.selector.is(":focus")){
            for(var data in this.state.autoComplete)
                autoCompleteData.push(this.state.autoComplete[data]);
            if(autoCompleteData.length > 0) showAutoComplete = true;
        }
        return(
            <div className="input-field">
                <input  id={this.state.id}
                        type={this.props.type ? this.props.type : "text"}
                        placeholder={this.props.placeholder ? this.props.placeholder : ""}
                        value={this.state.value}
                        onChange={this.onChange}
                        className={className}
                        disabled={this.props.disabled ? 'disabled' : false}
                />
                <label for={this.state.id}
                       data-success={this.props.validateSuccess ? this.props.validateSuccess : ""}
                       data-error={this.props.validateError ? this.props.validateError : ""}
                >
                    {this.props.label ? this.props.label : ""}
                </label>
                {showAutoComplete ? <AutoCompleteCollection content={autoCompleteData} 
                                                            onClick={this.setValue} 
                                                            maxHeight={this.props.autoCompleteMaxHeight}/> 
                                  : null}
            </div>
        )
    }
});

var AutoCompleteCollection = React.createClass({
    onClick:function(data){
        this.props.onClick(data);
    },
    render:function(){
        var content = [];
        for(var c in this.props.content){
            var val = this.props.content[c].val;
            var valContent = <div style={{padding:"10px 20px"}}>{val}</div>;
            var tip = this.props.content[c].tip;
            content.push({content:(tip ? <ToolTipped content={valContent} tooltip={tip} position="right" /> : valContent),data:val});
        }
        return(
            <div style={{display:(content.length > 0 ? "block" : "none"),
                         position:"absolute",top:"3.1rem",
                         zIndex:3000}}>
                <div style={{"max-height":(this.props.maxHeight ? this.props.maxHeight+"px": ""),
                         "overflow-y":(this.props.maxHeight ? "auto" : "")}}>
                    <Collection content={content} onClick={this.onClick} style={{position:"static"}} itemStyle={{padding:0}}/>
                </div>
            </div>
        )
    }
});