import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FlatButton from 'material-ui/lib/flat-button';
import Toggle from 'material-ui/lib/toggle';
import TimePicker from 'material-ui/lib/time-picker/time-picker';
import ActionDone from 'material-ui/lib/svg-icons/action/done';
import HoursTable from '../components/HoursTable';
var WeekDayDropdown = require('../components/WeekDayDropdown');

const tabStyles = {
  headline: {
    fontSize: 20,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  horzLayout: {
    display:'inline-block',
    verticalAlign:'top',
    width:'20%'  
  },
  toggle: {
    display:'inline-block',
    verticalAlign:'top',
    width:'60px'  
  },
  newrow:{
      width:'700px'
  }  
};

const btnStyle = {
  margin: 12,
};

var defaultEntry  = { 
          type:"DOW", 
          day: "Monday", 
          open: new Date(), 
          close: new Date(), 
          app_id:"NEAT_ID", 
          customer:"neat", 
          queueType:"global",  
          queue:"All neat", 
          off: true 
};

var HoursTabContainer = React.createClass({
  propTypes: {
    regularHours: React.PropTypes.array,
    exceptionHours: React.PropTypes.array,
    onTabSelect: React.PropTypes.func.isRequired,
    onRegularHrsUpdate: React.PropTypes.func,
    onExceptionHrsUpdate: React.PropTypes.func,
    onSave:React.PropTypes.func,
    onCancel:React.PropTypes.func,
    onAddEntry:React.PropTypes.func,
    selected: React.PropTypes.string
  },  
  getInitialState: function() {
      return {
          newEntry : defaultEntry
      };
  },
  handleChange: function(value) { 
      //Check for any unsaved changes, prompt if unsaved
      this.props.onTabSelect(value);
  },
  handleAddRow: function() {
      //Show new row elements and set default values
      this.setState({
          newEntry : defaultEntry
      });
  },
  handleDaySelected : function(e, index, value) {
      console.log('New Entry Weekday selected:');
      console.log('index:' + index + ' value: ' + value);
      var entry = this.state.newEntry;
      entry.day = value;   
      this.setState({
          newEntry: entry
      });         
  },  
  
  render: function() {
      
      return (
          <div>
            <div>
            <Tabs >
                <Tab label="Weekly Hours" value="weekly">
                    <div>
                        <HoursTable rows={this.props.regularHours} />
                    </div>
                </Tab>
                <Tab label="Exceptions" value="exceptions">
                    <div>
                        TABLE 2 GOES HERE
                    </div>
                </Tab>            
            </Tabs>
            </div>
            <div className="newRow-div" style={tabStyles.newrow}>
                <Toggle toggled={this.state.newEntry.off} style={tabStyles.toggle}/>
                <WeekDayDropdown selected={this.state.newEntry.day}
                    onDaySelect={this.handleDaySelected}/>
                <TimePicker format="ampm" defaultTime={this.state.newEntry.open} style={tabStyles.horzLayout} />
                <TimePicker format="ampm" defaultTime={this.state.newEntry.close} style={tabStyles.horzLayout} />
                <FlatButton label=" " icon={<ActionDone />} />				
            </div>
            <div>
                <FlatButton label="Save" 
                    style={btnStyle} />
                <FlatButton label="Cancel" 
                    secondary={true} 
                    style={btnStyle} />
                <FlatButton label="Add" 
                    secondary={true} 
                    onTouchStart={this.handleAddRow}
                    style={btnStyle} />
            </div>
          </div>
      )
  }

});

module.exports = HoursTabContainer;