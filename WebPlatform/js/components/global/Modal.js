/**
 * Created by alexandre on 02/06/16.
 */

/**
 * Props : --> id : id to give to the component
 *         --> className : className to add to the modal 
 *         --> content : modal content
 *         --> footer : modal footer
 *         --> undismissible : modal can't be dismissed by clicking outside it
 *         --> getOpen : when modal is mounted, it will send a function to open it to getOpen()
 *         --> getClose : when modal is mounted, it will send a function to close it to getClose()
 */

window.Modal = React.createClass({
    getInitialState:function(){
        return {id:(this.props.id ? this.props.id : generateID())}
    },
    componentDidMount(){
        var selector = $("#"+this.state.id);
        if(this.props.getOpen){
            var options = {};
            if(this.props.undismissible)
                options.dismissible = false;
            this.props.getOpen(function(){
                selector.openModal(options);
            })
        }
        if(this.props.getClose){
            this.props.getClose(function(){
                selector.closeModal();
            })
        }
    },
    render:function(){
       return(
           <div id={this.state.id} className={"modal "+(this.props.className ? this.props.className : "")}>
               <div className="modal-content">
                   {this.props.content}
               </div>
               {this.props.footer ? <div className="modal-footer">{this.props.footer}</div> : null}
           </div>
       )
    }
});
