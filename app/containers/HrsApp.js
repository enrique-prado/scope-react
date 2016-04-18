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
        selectedCustomer: "neat",
        schedType: "global",
        activeHrsTab: "weekly",
        selectedMenuEntry: "",
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
    });
  },
  
  componentDidUpdate: function(prevProps, prevState) {
      console.log('in componentDidUpdate, num of customers is ' + this.state.customers.length );

      if ((prevState.selectedCustomer !== this.state.selectedCustomer) || (prevState.schedType !== this.state.schedType)) {
        this.populateSchedNavMenu();
      }
      
      if (prevState.selectedMenuEntry !== this.state.selectedMenuEntry)  {
        this.populateHoursTable();
        
        //this.testHourEntry();        
      }
  },
  
  // USER DRIVER EVENTS
  handleSelectCustomer: function(event, index, value) {
    this.setState({ selectedCustomer: value });
    console.log("Selected Customer is " + value);
  },  
  
  handleSchedTypeChange: function(event, value) {
      this.setState({schedType: value});
      console.log("Sched Type changed to " + value);
  },
  
  handleHoursTabChange: function(value) {
      this.setState({activeHrsTab: value});
      console.log("activeHrsTab changed to " + value);
  },
  
  handleMenuEntrySelect: function(event, index) {
      console.log("Entering.... handleMenuEntrySelect");
      console.log("index = " + index);
      //console.log("event.target.textContent =" + event.target.textContent);
      this.setState({selectedMenuEntry: index})
  },
  
  handleAddEntry: function() {
      console.log("handleAddEntry called");
  },
  
  // OTHER METHODS
  populateSchedNavMenu: function() {
      //Refreshes Sched Nav Menu on the left
      var self = this;
       HoursDataService.getSchedEntries(this.state.selectedCustomer, this.state.schedType)
       .then(function(result) {
           self.setState({
               schedEntries : result
           });
       });
  },
  
  populateHoursTable: function() {
      //Refreshes working hours table on the right pane
      var self = this;
      HoursDataService.getHours(this.state.selectedCustomer, this.state.schedType, this.state.selectedMenuEntry)
      .then(function(result) {
          self.setState({
              regularHours : result
          });
      });
  },  
  
  testHourEntry: function() {
    //Testing api
    var hrEntry = {
        day: "6",
        open: "08:00:00",
        close: "18:00:00",
        appId: custIds[this.state.selectedCustomer],
        custName: this.state.selectedCustomer,
        qType : this.state.schedType,
        qName : this.state.selectedMenuEntry,
        state : 0
    }

    HoursDataService.insertHoursForCustomer(hrEntry)
    .then(function(result) {
        console.log('TESTING inserting hr entry, Result:' + result);
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
                regularHours={this.state.regularHours} />
        </div>                    
      </div>
    );
  }
});

module.exports = HrsApp;