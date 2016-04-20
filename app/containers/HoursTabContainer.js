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
    regularHours: React.PropTypes.array.isRequired,
    exceptionHours: React.PropTypes.array,
    onTabSelect: React.PropTypes.func.isRequired,
    onRegularHrsUpdate: React.PropTypes.func,
    onExceptionHrsUpdate: React.PropTypes.func,
    onSave:React.PropTypes.func,
    onCancel:React.PropTypes.func,
    onNewRowAccepted:React.PropTypes.func.isRequired,
    UIDisable:React.PropTypes.bool,
    selected: React.PropTypes.string
  },  
  getInitialState: function() {
      return {
          newEntry : defaultEntry
      };
  },
  handleAddRow: function() {
      //Show new row elements TODO
      
      //Set default row values
      this.setState({
          newEntry : defaultEntry
      });
  },
  handleRowAccepted : function(e) {
      //Call parent so it can add new row to array
      this.props.onNewRowAccepted(this.state.newEntry);
      
      //Hide new row elements TODO
  },
  handleNewRowDayOffToggle : function(e, value) {
      console.log('New day off toggle: ' + value);
      var entry = this.state.newEntry;
      entry.off = value;   
      this.setState({
          newEntry: entry
      });           
  },
  handleNewRowDaySelected : function(e, index, value) {
      console.log('New Entry Weekday selected:');
      console.log('index:' + index + ' value: ' + value);
      var entry = this.state.newEntry;
      entry.day = value;   
      this.setState({
          newEntry: entry
      });         
  },  
  handleOpenHrChange: function(e, newDate) { 
      var entry = this.state.newEntry;
      entry.open = newDate;
      this.setState({
          newEntry : entry
      });
  },  
  handleCloseHrChange: function(e, newDate) { 
      var entry = this.state.newEntry;
      entry.close = newDate;
      this.setState({
          newEntry : entry
      });
  },
  handleSaveHours : function() {
    //Check to see if new row needs to be accepted first
    // Also commit any changes to updated rows
    //TODO: Reuse for exceptions by passing type param?
    this.props.onSave();  
  },
  handleCancelHours : function() {
    //TODO: Reuse for exceptions by passing type param?
    // Throw away any uncommitted changes, call parent to do this.
    this.props.onCancel();  
  },        
  render: function() {
      
      return (
          <div>
            <div>
            <Tabs >
                <Tab label="Weekly Hours" value="weekly">
                    <div>
                        <HoursTable rows={this.props.regularHours} onHrsUpdate={this.props.onRegularHrsUpdate}/>
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
                <Toggle defaultToggled={this.state.newEntry.off}
                    onToggle={this.handleNewRowDayOffToggle} 
                    style={tabStyles.toggle}/>
                <WeekDayDropdown selected={this.state.newEntry.day}
                    onDaySelect={this.handleNewRowDaySelected}/>
                <TimePicker format="ampm" 
                    defaultTime={this.state.newEntry.open}
                    onChange={this.handleOpenHrChange} 
                    style={tabStyles.horzLayout} />
                <TimePicker format="ampm" 
                    defaultTime={this.state.newEntry.close} 
                    onChange={this.handleCloseHrChange} 
                    style={tabStyles.horzLayout} />
                <FlatButton label=" " 
                    onClick={this.handleRowAccepted} 
                    icon={<ActionDone />} />				
            </div>
            <div>
                <FlatButton label="Add"
                    secondary={true} 
                    onClick={this.handleAddRow}
                    style={btnStyle} />            
                <FlatButton label="Save"
                    disabled={this.props.UIDisable} 
                    secondary={true} 
                    onClick={this.handleSaveHours} 
                    style={btnStyle} />
                <FlatButton label="Cancel" 
                    disabled={this.props.UIDisable} 
                    secondary={true} 
                    onClick={this.handleCancelHours} 
                    style={btnStyle} />
            </div>
          </div>
      )
  }

});

module.exports = HoursTabContainer;