var React = require('react');
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TextField from 'material-ui/lib/text-field';

const styles = {
  propContainerStyle: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

//Columns definition
var columns = [
    {
    key: 'off',
    name: 'Off',
    editable: true,
    width: 80
    },
    {
    key: 'day',
    name: 'Day',
    editable: true,
    width: 100
    },
    {
    key: 'open',
    name: 'Open',
    editable: true,
    width: 80
    },   
    {
    key: 'close',
    name: 'Close',
    editable: true,
    width: 80
    }    
]

var HoursTable = React.createClass({
  propTypes: {
    rows: React.PropTypes.array,
    onHrsUpdate: React.PropTypes.func,
  },

  handleRowSelected : function(rowIdx){
    return this.props.rows[rowIdx]
  },

  handleRowUpdated : function(e){
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows:rows});
  },

  render:function(){
    var rowsCount = this.props.rows ? this.props.rows.length : 0;
    var hrs_list = this.props.rows.map(function(hour, index) {
        return (
            <TableRow key={index}>
                <TableRowColumn>{hour.off}</TableRowColumn>
                <TableRowColumn>{hour.day}</TableRowColumn>
                <TableRowColumn>{hour.open}</TableRowColumn>
                <TableRowColumn>{hour.close}</TableRowColumn>
            </TableRow>
        )
    });
    
    return(
      <Table
      height="300px"
      selectable={true}
      onRowSelection={this._onRowSelection}
      rowsCount={rowsCount}
      minHeight={500}
      >
        <TableHeader>
            <TableRow>
                <TableHeaderColumn tooltip="Day Off when checked">Day off</TableHeaderColumn>
                <TableHeaderColumn tooltip="Day of the week">Day</TableHeaderColumn>
                <TableHeaderColumn tooltip="Start of work hours">Open</TableHeaderColumn>
                <TableHeaderColumn tooltip="End of work hours">Close</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={true} showRowHover={true} >
            {hrs_list}
        </TableBody>
      </Table>        
    );
  }

});

module.exports = HoursTable;
