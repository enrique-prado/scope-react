var React = require('react');
var CustomerDropdown = require('../components/CustomerDropdown');
import HoursDataService from '../../services/dataService';
var SchedTypeRadioBtn = require('../components/SchedTypeRadioBtn');
var SchedMenuNav = require('../components/SchedMenuNav');
var HoursTabContainer = require('../containers/HoursTabContainer');
    const appStyles = {
        menunav: {
            width:'300px'
        }
    }

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
      //Refreshes Sched Nav Menu on the left
      this.setState({
          regularHours : HoursDataService.getHours(this.state.selectedCustomer, this.state.schedType, this.state.selectedMenuEntry)
      });
  },  

  //UI RENDERING
  render: function() {
    var customer_id = this.state.customer_id;

    return (
      <div className="hrs-section" >
        <div className="topNav">
            <div className="topNav-left">
                <CustomerDropdown onCustomerSelect={this.handleSelectCustomer} 
                    customers={this.state.customers} selected={this.state.selectedCustomer} />
            </div>
            <div className="topNav-right">
                <SchedTypeRadioBtn onSchedTypeSelect={this.handleSchedTypeChange} defaultSelected={this.state.schedType} />
            </div>
        </div>  
        <div className="leftNav" style={appStyles.menunav}>
            <SchedMenuNav selected={this.state.selectedMenuEntry} entries={this.state.schedEntries} 
                onEntrySelect={this.handleMenuEntrySelect}  />
        </div>
        <div className="tablesPane" >
            <HoursTabContainer onTabSelect={this.handleHoursTabChange} selected={this.state.activeHrsTab}
                regularHours={this.state.regularHours} />
        </div>                    
      </div>
    );
  }
});

module.exports = HrsApp;