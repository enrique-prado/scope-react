var React = require('react');
var ReactDataGrid = require('react-data-grid/addons');

//Columns definition
var columns = [
    {
    key: 'off',
    name: 'Off',
    width: 80
    },
    {
    key: 'day',
    name: 'Day',
    },
    {
    key: 'open',
    name: 'Open',
    width: 80
    },   
    {
    key: 'close',
    name: 'Close',
    width: 80
    }    
]

var HoursTable = React.createClass({
  propTypes: {
    rows: React.PropTypes.array,
    onHrsUpdate: React.PropTypes.func,
  },

  rowGetter : function(rowIdx){
    return this.props.rows[rowIdx]
  },

  handleRowUpdated : function(e){
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows:rows});
  },

  render:function(){
    return(
      <ReactDataGrid
      enableCellSelect={true}
      columns={columns}
      rowGetter={this.rowGetter}
      rowsCount={this.props.rows.length}
      minHeight={500}
     />
    )
  }

});

module.exports = HoursTable;
