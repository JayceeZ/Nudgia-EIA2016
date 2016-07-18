/**
 * Created by alexandre on 23/06/16.
 */

/**
 * Props : --> id : id to give to the component
 *         --> type : linear or circular (default : linear)
 *         --> color : red, blue, green or yellow (not implemented for linear) (default : blue)
 *         --> value : % of loading, for linear only, if not given : linear animation
 */

window.LoadingAnimation = React.createClass({
    getInitialState:function(){
      return {id:(this.props.id ? this.props.id : generateID())}
    },
    render:function() {
      return (<div>
                {(this.props.type && this.props.type == "circular"
                    ? <div className="preloader-wrapper active">
                        <div className={"spinner-layer spinner-"+(this.props.color ? this.props.color : "blue")+"-only"}>
                          <div className="circle-clipper left">
                            <div className="circle"></div>
                          </div>
                          <div className="gap-patch">
                            <div className="circle"></div>
                          </div>
                          <div className="circle-clipper right">
                            <div className="circle"></div>
                          </div>
                        </div>
                    </div>
                    : <div className="progress">
                        <div className={this.props.value ? "determinate" : "indeterminate"} style={this.props.value ? {width:this.props.value+"%"} : null}></div>
                      </div>
                )}
            </div>
      )
    }
});
