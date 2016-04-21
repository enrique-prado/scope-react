var React = require('react');
var CustomerDropdown = require('../components/CustomerDropdown');
import HoursDataService from '../../services/dataService';
var SchedTypeRadioBtn = require('../components/SchedTypeRadioBtn');
var SchedMenuNav = require('../components/SchedMenuNav');
var HoursTabContainer = require('../containers/HoursTabContainer');
    
const appStyles = {
    topnav: {
        height:'20%',
        width:'100%'
    },
    menunav: {
        height:'300px',
        width: '200px',
        float:'left'
    },
    content: {
        width:'700px',
        float:'left'
    },
    radiobtns: {
        display:'inline-block',
        verticalAlign:'top',
        marginTop:'15px',
        paddingLeft:'10px'
    },
    dropdown: {
        display:'inline-block',
        verticalAlign:'top'  
    }
}

//TODO: Replace this with real table lookup
var custIds = {};
custIds['neat'] = 'NEAT_ID';
custIds['SpokenDA'] = 'SPKN_ID';
custIds['Guthy'] = 'GUTHY_ID';


var HrsApp = React.createClass({
  //LIFE CYCLE EVENTS 
  getInitialState: function(){
    return { 
        selectedCustomer: "",
        schedType: "global",
        activeHrsTab: "weekly",
        selectedMenuEntry: "",
        disableUI:true,
        customers: [],
        schedEntries: [],
        regularHours: [],
        exceptionHours: []
    };
  },

  componentDidMount: function() {
      var self = this;
      HoursDataService.getCustomers().then(function(result) {
        self.setState({
            customers : result         
        });
        if (result.length > 0) {
            self.setState({
                selectedCustomer: result[0].label //Select first customer 
            });
        }
    });
  },
  
  componentDidUpdate: function(prevProps, prevState) {
      console.log("componentDidUpdate CALLED");
      console.log('prev Customer: ' + prevState.selectedCustomer + 
        " current: " + this.state.selectedCustomer);
      console.log('prev Sched Type: ' + prevState.schedType + 
        " current: " + this.state.schedType);        
      console.log('prev Menu: ' + prevState.selectedMenuEntry + 
        " current: " + this.state.selectedMenuEntry);   
             
      if ((prevState.selectedCustomer !== this.state.selectedCustomer) || (prevState.schedType !== this.state.schedType)) {
        this.populateSchedNavMenu();
      }
      
      if (prevState.selectedMenuEntry !== this.state.selectedMenuEntry)  {
        this.populateHoursTable();
      }
  },
  
  // USER DRIVER EVENTS
  handleSelectCustomer: function(event, index, value) {
    this.setState({ selectedCustomer: value });
    this.setState({regularHours : [] }) // Clear table
    console.log("Selected Customer is " + value);
  },  
  
  handleSchedTypeChange: function(event, value) {
      this.setState({schedType: value});
      this.setState({regularHours : [] }) // Clear table
      console.log("Sched Type changed to " + value);
  },
  
  handleHoursTabChange: function(value) {
      this.setState({activeHrsTab: value});
      console.log("activeHrsTab changed to " + value);
  },
  
  handleMenuEntrySelect: function(event, index) {
      console.log("Entering.... handleMenuEntrySelect");
      console.log("index = " + index);
      this.setState({regularHours : [] }) // Clear table TODO: This is inefficient, find out a way to make timepicker control refresh
      
      //console.log("event.target.textContent =" + event.target.textContent);
      this.setState({selectedMenuEntry: index})
  },
  
  handleAddNewHourRow: function(newRow) {
      console.log("handleAddNewHourRow called");
      console.log('off = ' + newRow.off + ' , day = ' + newRow.day + ', hours = ' + newRow.open + ' - ' + newRow.close);
      //Add new row to array in memory but not to DB
      var newEntry = {};
      newEntry.row_id = "NEW_ID" //NEW_ID denotes it's a new row not yet commited to DB
      newEntry.type = 'DOW';
      newEntry.off = newRow.off;
      newEntry.day = newRow.day;
      newEntry.open = newRow.open;
      newEntry.close = newRow.close;
      newEntry.appId = custIds[this.state.selectedCustomer]; //TODO: Query customer (app_id)
      newEntry.custName = this.state.selectedCustomer;
      newEntry.qType = this.state.schedType;
      newEntry.qName = this.state.selectedMenuEntry;
      newEntry.deleted = false;
      newEntry.updated = false;
      
      //update hours array
      var updatedHours = this.state.regularHours;
      updatedHours.push(newEntry);
      this.setState({
          regularHours : updatedHours
      });
      this.setState({
          disableUI: false // Enable Save and Cancel buttons
      });         
  },
  
  handleSaveHours : function() {
      //User wants to commit changes to DB
      //First insert new hour entries
      this.addNewHourEntries();
      this.updateChangedEntries();
      //TODO: Clear hours array
      //Refresh from DB to get new row_ids.
      this.populateHoursTable();
  },
  handleCancelHours : function() {
      //Throw away any unsaved changes to DB by simply querying and repopulating table
      //TODO: Clear array first.
      this.populateHoursTable();
  },
  
  handleHoursUpdate : function(key, updatedRow) {
    //merge updated row with current row and rerender by setting state
    var updatedRows = this.state.regularHours;
    updatedRow.updated = true; // Flag row as dirty
    Object.assign(updatedRows[key], updatedRow);
    this.setState({
        regularHours : updatedRows
    });
    this.setState({
        disableUI: false // Enable Save and Cancel buttons
    });    
  },  
  
  // HELPER METHODS
  addNewHourEntries : function() {
      //Insert new entries to DB
      this.state.regularHours.forEach (function(entry, index) {
        if (entry.row_id === 'NEW_ID') { // This means this is a new unsaved row
            console.log('About to call insertHoursForCustomer');
            HoursDataService.insertHoursForCustomer(entry)
            .then(function(result) {
                console.log('Inserting hr entry, Result:' + result);
                });   
        }  
      });
  },
  updateChangedEntries : function() {
      //Only update rows that changed
      this.state.regularHours.forEach (function(entry, index) {
        if ((entry.row_id != 'NEW_ID') && (entry.updated)) { 
            console.log('About to call updateHoursForCustomer');
            HoursDataService.updateHoursForCustomer(entry)
            .then(function(result) {
                console.log('Inserting hr entry, Result:' + result);
                });   
        }  
      });
  },  
  populateSchedNavMenu: function() {
      console.log('populateSchedNavMenu CALLED')
      //Refreshes Sched Nav Menu on the left
      var self = this;
       HoursDataService.getSchedEntries(this.state.selectedCustomer, this.state.schedType)
       .then(function(result) {
           self.setState({
               schedEntries : result
           });
           if (result.length > 0) {
               self.setState({
                   selectedMenuEntry : result[0].queue //select first entry
               });
           }
       });
  },
  
  populateHoursTable: function() {
      console.log('populateHoursTable CALLED');
      //Refreshes working hours table on the right pane
      var self = this;
      HoursDataService.getHours(this.state.selectedCustomer, this.state.schedType, this.state.selectedMenuEntry)
      .then(function(result) {
          self.setState({
              regularHours : result
          });
          self.setState({
              disableUI: true // Disable Save and Cancel buttons
          });
      });
  },  
  
  //UI RENDERING
  render: function() {
    var customer_id = this.state.customer_id;

    return (
      <div className="hrs-section" >
        <div className="topNav" style={appStyles.topnav}>
            <div className="dropdown-div" style={appStyles.dropdown}>
                <CustomerDropdown onCustomerSelect={this.handleSelectCustomer} 
                    customers={this.state.customers} selected={this.state.selectedCustomer} />
            </div>
            <div className="topNav-right" style={appStyles.radiobtns}>
                <SchedTypeRadioBtn onSchedTypeSelect={this.handleSchedTypeChange} defaultSelected={this.state.schedType} />
            </div>
        </div>  
        <div className="leftNav" style={appStyles.menunav}>
            <SchedMenuNav selected={this.state.selectedMenuEntry} entries={this.state.schedEntries} 
                onEntrySelect={this.handleMenuEntrySelect}  />
        </div>
        <div className="tablesPane" style={appStyles.content}>
            <HoursTabContainer onTabSelect={this.handleHoursTabChange}
                selected={this.state.activeHrsTab}
                UIDisable={this.state.disableUI}
                regularHours={this.state.regularHours}
                onRegularHrsUpdate={this.handleHoursUpdate}
                onSave={this.handleSaveHours}
                onCancel={this.handleCancelHours}
                onNewRowAccepted={this.handleAddNewHourRow} />
        </div>                    
      </div>
    );
  }
});

module.exports = HrsApp;