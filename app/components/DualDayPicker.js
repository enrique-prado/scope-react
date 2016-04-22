/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
var React = require('react');
var WeekDayDropdown = require('../components/WeekDayDropdown');
import DatePicker from 'material-ui/lib/date-picker/date-picker';

const styles = {
    timeStyle: {
        display:'inline-block',
        verticalAlign:'top',
        width:'200px'
    }
}

var DualDayPicker = React.createClass({
  propTypes: {
    daySelected: React.PropTypes.any,
    onDaySelect: React.PropTypes.func.isRequired,
    onDateSelect: React.PropTypes.func.isRequired,
    valueType: React.PropTypes.string
  },  
  handleDOWChange: function(event, index, value) { 
      //Call parent's handler which handles state logic
      this.props.onDaySelect( event, index, value);
  },
  handleDateChange: function(event, index, value) { 
      //Call parent's handler which handles state logic
      this.props.onDateSelect( event, index, value);
  },  

  render: function() {
      var dateComponent = null;
      console.log('valueType = ' + this.props.valueType);
      if (this.props.valueType === 'DOW') {
          dateComponent = <WeekDayDropdown onDaySelect={this.handleDOWChange}
                                    selected={this.props.daySelected} /> 
      }
      else {
          dateComponent = <DatePicker onChange={this.handleDateChange}
                                value={this.props.daySelected}
                                mode="landscape" />
      }

    return (
        dateComponent
    );
  }
});


module.exports = DualDayPicker;