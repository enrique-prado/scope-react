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
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
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
    onHrsUpdate: React.PropTypes.func.isRequired
  },
  
  componentWillMount: function() {
      originalData = this.props.rows; // Make a copy of original data array in case we need to reset changes
  },

  handleRowSelected : function(rowIdx){
    return this.props.rows[rowIdx]
  },
  
  handleDayOffToggle : function(key, e, value) {
      console.log('handleDayOffToggle toggled: ' + value);
      console.log('e: ' + e );
      console.log('Row key: ' + key );
      console.log('Correspoding row_id: ' + this.props.rows[key].row_id);  
      var updatedRow = this.props.rows[key];
      updatedRow.off = value;
      this.props.onHrsUpdate(key, updatedRow);
  },

  handleDaySelected : function(key, e, index, value) {
      console.log('Weekday selected:');
      console.log('index:' + index + ' value: ' + value);      
      console.log('e: ' + e );
      console.log('Row key: ' + key );
      console.log('Correspoding row_id: ' + this.props.rows[key].row_id);
      var updatedRow = this.props.rows[key];
      updatedRow.day = value;
      this.props.onHrsUpdate(key, updatedRow);      
  },
  
  handleOpenTimeChanged : function(key, e, value) {
    console.log('Open Time selected: ' + value );
    console.log('Row key: ' + key );
    console.log('Correspoding row_id: ' + this.props.rows[key].row_id);
    var updatedRow = this.props.rows[key];
    updatedRow.open = value;
    this.props.onHrsUpdate(key, updatedRow);    
  },
  
  handleCloseTimeChange : function(key, e, value) {
    console.log('Close Time selected: ' + value );
    console.log('Row key: ' + key );
    console.log('Correspoding row_id: ' + this.props.rows[key].row_id);
    var updatedRow = this.props.rows[key];
    updatedRow.close = value;
    this.props.onHrsUpdate(key, updatedRow);        
  },
  
  handleDeleteRow : function(key, e) {
    console.log('Delete Row clicked:' );
    console.log('Row key: ' + key );
    console.log('Correspoding row_id: ' + this.props.rows[key].row_id);
    var updatedRow = this.props.rows[key];
    updatedRow.deleted = true;
    this.props.onHrsUpdate(key, updatedRow);       
  },
  
  //HELPER FUNCTIONS

  
  //UI
  
  render:function(){
    var self = this;
    var rowsCount = this.props.rows ? this.props.rows.length : 0;
    var hrs_list = this.props.rows.map(function(hour, index) {
        if (!hour.deleted) {
            return (
                <TableRow key={index}>
                    <TableRowColumn >{hour.row_id}</TableRowColumn>
                    <TableRowColumn>
                        <Toggle defaultToggled={hour.off}
                                onToggle={self.handleDayOffToggle.bind(self, index)}/>
                    </TableRowColumn>
                    <TableRowColumn>
                        <WeekDayDropdown onDaySelect={self.handleDaySelected.bind(self, index)}
                                selected={hour.day} /> 
                    </TableRowColumn>
                    <TableRowColumn>
                        <TimePicker format="ampm" defaultTime={hour.open} onChange={self.handleOpenTimeChanged.bind(self, index)} />
                    </TableRowColumn>
                    <TableRowColumn>
                        <TimePicker format="ampm" defaultTime={hour.close} onChange={self.handleCloseTimeChange.bind(self, index)} />
                    </TableRowColumn>
                    <TableRowColumn>
                        <IconButton onClick={self.handleDeleteRow.bind(self, index)}>
                            <ActionDelete color={Colors.green300} hoverColor={Colors.green700} />
                        </IconButton>
                    </TableRowColumn>
                        
                </TableRow>
            )
        }
    });
    
    return(
      <Table
      height="auto"
      selectable={false}
      rowsCount={rowsCount}
      minHeight={290}
      >
        <TableHeader displaySelectAll={false}>
            <TableRow>
                <TableHeaderColumn >row_id</TableHeaderColumn>
                <TableHeaderColumn tooltip="Toggle off to take entire day off">Active</TableHeaderColumn>
                <TableHeaderColumn tooltip="Day of the week">Day</TableHeaderColumn>
                <TableHeaderColumn tooltip="Start of work hours">Open</TableHeaderColumn>
                <TableHeaderColumn tooltip="End of work hours">Close</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} displayRowCheckbox={false} >
            {hrs_list}
        </TableBody>
      </Table>        
    );
  }

});

module.exports = HoursTable;
