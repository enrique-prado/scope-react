var React = require('react');
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import TimePicker from 'material-ui/lib/time-picker/time-picker';
var WeekDayDropdown = require('../components/WeekDayDropdown');

const styles = {
  propContainerStyle: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
  hiddenColumn: {
      display: 'none'
  }
};

var originalData = [];


var HoursTable = React.createClass({
  propTypes: {
    rows: React.PropTypes.array,
    onHrsUpdate: React.PropTypes.func,
  },
  
  componentWillMount: function() {
      originalData = this.props.rows; // Make a copy of original data array in case we need to reset changes
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
  
  handleDaySelected : function(e, index, value) {
      console.log('Weekday selected:');
      console.log('index:' + index + ' value: ' + value);      
  },
  
  handleTimeChanged : function(e, value) {
    console.log('Time selected: ' + value );
  },
  
  handleCloseTimeChange : function(e) {
      console.log('Close Time selected: ' + e.target.value );
  },
  
    handleOnFocus : function(e) {
      console.log(' focus on text field ' + e.target.value );
      e.preventDefault();
  },

  render:function(){
    var self = this;
    var rowsCount = this.props.rows ? this.props.rows.length : 0;
    var hrs_list = this.props.rows.map(function(hour, index) {
        //var open = new Date(hour.open);
        //var close = new Date(hour.close);
        return (
            <TableRow key={index}>
                <TableRowColumn >{hour.row_id}</TableRowColumn>
                <TableRowColumn><Toggle toggled={hour.off}/></TableRowColumn>
                <TableRowColumn>
                    <WeekDayDropdown onDaySelect={self.handleDaySelected}
                        selected={hour.day} /> 
                </TableRowColumn>
                <TableRowColumn>
                    <TimePicker format="ampm" defaultTime={hour.open} onChange={self.handleTimeChanged} />
                </TableRowColumn>
                <TableRowColumn>
                    <TimePicker format="ampm" defaultTime={hour.close} onChange={self.handleTimeChanged} />
                </TableRowColumn>
            </TableRow>
        )
    });
    
    return(
      <Table
      height="300px"
      selectable={false}
      rowsCount={rowsCount}
      minHeight={290}
      >
        <TableHeader displaySelectAll={false}>
            <TableRow>
                <TableHeaderColumn >row_id</TableHeaderColumn>
                <TableHeaderColumn tooltip="Day Off when checked">Day off</TableHeaderColumn>
                <TableHeaderColumn tooltip="Day of the week">Day</TableHeaderColumn>
                <TableHeaderColumn tooltip="Start of work hours">Open</TableHeaderColumn>
                <TableHeaderColumn tooltip="End of work hours">Close</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody showRowHover={false} displayRowCheckbox={false} >
            {hrs_list}
        </TableBody>
      </Table>        
    );
  }

});

module.exports = HoursTable;
