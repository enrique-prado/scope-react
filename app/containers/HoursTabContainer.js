import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FlatButton from 'material-ui/lib/flat-button';
import Toggle from 'material-ui/lib/toggle';
import TimePicker from 'material-ui/lib/time-picker/time-picker';
import ActionDone from 'material-ui/lib/svg-icons/action/done';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import ContentClear from 'material-ui/lib/svg-icons/content/clear';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import HoursTable from '../components/HoursTable';
var WeekDayDropdown = require('../components/WeekDayDropdown');
var DualDayPicker = require('../components/DualDayPicker');

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
  dualPicker: {
      display: 'inline-block',
      width: '100px',
    verticalAlign:'top',
    paddingTop: '15px'
    

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
  float: 'right'
};

//TODO: Make these configurable and localizable
var defaultDOWEntry  = {  
          type:"DOW", 
          day: "Monday", 
          open: new Date('Jan 1, 2016 09:00:00'),
          close: new Date('Jan 1, 2016 17:00:00'),
          off: true 
};

var defaultExceptionEntry = {
          type:"DATE", 
          day: new Date(), 
          open: new Date('Jan 1, 2016 09:00:00'),
          close: new Date('Jan 1, 2016 17:00:00'),
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
          newEntry : defaultDOWEntry,
          showNewEntryRow : false
      };
  },
  handleTabSelected: function(value) {
      this.handleRowRejected(); // Dismiss Add new row if it happens to be up.
      this.props.onTabSelect(value); // call parent handler
  },
  handleAddRow: function() {
      //Make new row elements appear
      this.setState({
          showNewEntryRow : true
      });
      //Set default row values
      var defaultEntry = this.props.selected == 'DOW' ? defaultDOWEntry : defaultExceptionEntry;
      this.setState({
          newEntry : defaultEntry
      });
      
  },
  handleRowAccepted : function(e) {
      //Call parent so it can add new row to array
      this.props.onNewRowAccepted(this.state.newEntry);
      //Hide new row elements 
      this.setState({
          showNewEntryRow : false
      });
  },
  handleRowRejected : function() {
      // Dismiss new row without adding it to table
      this.setState({
          showNewEntryRow : false
      });      
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
  handleNewRowDateSelected: function(e, value) {
      console.log('New Entry Date selected:');
      console.log('value: ' + value);
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
    //TODO:Check to see if new row needs to be accepted first
    // TODO: Also commit any changes to updated rows
    this.props.onSave();  
  },
  handleCancelHours : function() {
    // Throw away any uncommitted changes, call parent to do this.
    //TODO: Reject new row if it's visible
    this.props.onCancel();  
  },
    
  render: function() {
      var add_row = null; //add_row either renders the new row ui elements OR the Add button
      if (this.state.showNewEntryRow == true) {
        add_row = (
                    <div className="newRow-div" style={tabStyles.newrow}>
                        <Toggle defaultToggled={this.state.newEntry.off}
                            onToggle={this.handleNewRowDayOffToggle} 
                            style={tabStyles.toggle}/>
                        <div style={tabStyles.dualPicker}> 
                            <DualDayPicker daySelected={this.state.newEntry.day}
                                onDaySelect={this.handleNewRowDaySelected}
                                onDateSelect={this.handleNewRowDateSelected}
                                valueType={this.props.selected}
                            />
                        </div>
                        <TimePicker format="ampm" 
                            defaultTime={this.state.newEntry.open}
                            onChange={this.handleOpenHrChange} 
                            style={tabStyles.horzLayout} />
                        <TimePicker format="ampm" 
                            defaultTime={this.state.newEntry.close} 
                            onChange={this.handleCloseHrChange} 
                            style={tabStyles.horzLayout} />
                        <IconButton onClick={this.handleRowAccepted}>
                            <ActionDone color={Colors.green300} hoverColor={Colors.green700} />
                        </IconButton>                              
                        <IconButton onClick={this.handleRowRejected}>
                            <ContentClear color={Colors.grey300} hoverColor={Colors.red700} />
                        </IconButton>                            				
                    </div>             
        );
      }
      else {
        add_row = (
                    <div>
                        <IconButton onClick={this.handleAddRow}>
                            <ContentAdd color={Colors.green300} hoverColor={Colors.green700} />
                        </IconButton>                      
                    </div>
          );
      }
      
      return (
          <div>
            <div>
            <Tabs onChange={this.handleTabSelected} >
                <Tab label="Weekly Hours" value="DOW">
                    <div>
                        <HoursTable rows={this.props.regularHours}
                            valueType="DOW" 
                            onHrsUpdate={this.props.onRegularHrsUpdate}/>
                    </div>
                    {add_row}
                </Tab>
                <Tab label="Exceptions" value="DATE">
                    <div>
                        <HoursTable rows={this.props.exceptionHours}
                            valueType="DATE" 
                            onHrsUpdate={this.props.onExceptionHrsUpdate}/>                    
                   </div>
                    {add_row}
                </Tab>            
            </Tabs>
            </div>

            <div>
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