var React = require('react');
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
};



var WrkHoursTable = React.createClass({
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
    var hrs_rows = this.props.rows.map(function(hour, index) {
        return (
            <tr key={index}>
                <td><Toggle toggled={hour.off}/></td>
                <td>
                    <WeekDayDropdown onDaySelect={self.handleDaySelected}
                        selected={hour.day} /> 
                </td>
                <td>
                    <TimePicker format="ampm" onChange={self.handleTimeChanged} />
                </td>
                <td>
                    <TextField defaultValue={hour.close} onChange={self.handleCloseTimeChange}
                        onFocus={self.handleOnFocus} disabled={false}  />
                </td>
            </tr>
        )
    });
    
    return(
      <table>
        <thead>
        <tr>
            <th>Day off</th>
            <th>Day</th>
            <th>Open</th>
            <th>Close</th>
       </tr>
       </thead>
       <tbody>
            {hrs_rows}
       </tbody>
      </table>        
    );
  }

});

module.exports = WrkHoursTable;
