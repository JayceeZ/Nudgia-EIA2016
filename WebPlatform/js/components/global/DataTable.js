/**
 * Created by alexandre on 24/06/16.
 */

/**
 *  Props : --> id : id to give to the component
 *          --> style : style to apply to the table
 *          --> className : class to apply to the table
 *          --> headers : {headers:[header1,header2,...], style:{style}, className:classname }
 *          --> rows : [{data:[row1data1,row1data2,..],style:{style}},{data:[row2data1,row2data2,...]},...]
 */

window.DataTable = React.createClass({
  getInitialState:function(){
    return {id:(this.props.id ? this.props.id : generateID())}
  },
  render:function(){
    var tableStyle = this.props.style ? this.props.style : {};
    var headers = [];
    for(var h in this.props.headers.headers)
      headers.push(<th className={this.props.headers.className ? this.props.headers.className : ""} style={this.props.headers.style ? this.props.headers.style : {}}>
                      {this.props.headers.headers[h]}
                  </th>)
    var rows = [];
    for(var r in this.props.rows){
      var cells = [];
      for(var data in this.props.rows[r].data)
        cells.push(<td>{this.props.rows[r].data[data]}</td>);
      rows.push(<tr style={this.props.rows[r].style ? this.props.rows[r].style : {}} >{cells}</tr>);
    }
    return(
      <table style={tableStyle} className={this.props.className ? this.props.className : ""}>
        <thead><tr>{headers}</tr></thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
});
