/**
 * Created by alexandre on 07/06/16.
 */

/**
 * Props : --> id : id to give to the component
 *         --> title : modal's title
 *         --> message : modal's message
 *         --> validations : [{data:data1,text:text1},{data:data2,text:text2}, ...] validations buttons for the modal
 *         --> onValidate : call onValidate(data) when a validation button is clicked
 *         --> onCancel : called when button cancel is clicked
 *         --> cancelText : cancel button's text
 *         --> getOpen : when modal is mounted, it will send a function to open it to getOpen()
 */

window.ValidationModal = React.createClass({
    getInitialState:function(){
        return {id:(this.props.id ? this.props.id : generateID()),closeForm:null}
    },
    getClose:function(close){
        this.setState({closeForm:close});
    },
    onCancel:function(){
        this.state.closeForm();  
    },
    onValidation:function(data){
        if(this.props.onValidate)
            this.props.onValidate(data);
        this.state.closeForm();
    },
    render:function(){
        var validations = [];
        var _this = this;
        for(var v in this.props.validations) {
            var validation = this.props.validations[v];
            var onclick = (function(valid){
                return function(){
                    _this.onValidation(valid.data);
                };
            })(validation);

            validations.unshift(<Button text={validation.text} color="green" onClick={onclick} style={{"margin-right":"5px"}}/>);
        }
        return(
            <Modal content={<div>
                                {this.props.title ? <h5>{this.props.title}</h5> : null}
                                {this.props.message ? <p>{this.props.message}</p> : null}
                            </div>}
                    footer={<div>
                                <Button text={this.props.cancelText ? this.props.cancelText : "Cancel"}
                                        color="red"
                                        onClick={this.onCancel}/>
                                {validations}
                            </div>}
                    getOpen={this.props.getOpen}
                    getClose={this.getClose}
                    undismissible={true}
            />
        )
    }
});
