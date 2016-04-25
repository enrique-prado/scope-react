/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
var React = require('react');
var SelectField = require('material-ui/lib/SelectField');
var MenuItem = require('material-ui/lib/menus/menu-item');

const wdStyles = {
  horzLayout: {
    display:'inline-block',
    verticalAlign:'top',
  },
  dropdown: {
    width:'120px'  
  }  
};

var weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

var WeekDayDropdown = React.createClass({
  propTypes: {
    onDaySelect: React.PropTypes.func.isRequired,
    selected: React.PropTypes.any
  },  
  handleChange: function(event, index, value) { 
      //Call parent's handler which handles state logic
      this.props.onDaySelect(event, index, value);
  },

  render: function() {
    var days_list = weekDays.map(function(day, index) {
    return (
            <MenuItem key={index + 1} value={day} primaryText={day}/>
        )
    });
    return (
    <div className="dowDropdown-div" style={wdStyles.horzLayout}>
        <SelectField value={this.props.selected} onChange={this.handleChange} style={wdStyles.dropdown}>
            {days_list}
        </SelectField>
    </div>
    );
  }
});


module.exports = WeekDayDropdown;