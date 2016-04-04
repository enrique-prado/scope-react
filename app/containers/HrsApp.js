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
        selectedCustomer: "Neat",
        schedType: "global",
        activeHrsTab: "weekly",
        customers: [],
        schedEntries: []
    };
  },

  componentDidMount: function() {
      this.setState({
        customers : HoursDataService.getCustomers()
    });
  },
  
  componentDidUpdate: function(prevProps, prevState) {
      if ((prevState.selectedCustomer !== this.state.selectedCustomer) || (prevState.schedType !== this.state.schedType)) {
        this.populateSchedNavMenu();
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
  
  // OTHER METHODS
  populateSchedNavMenu: function() {
      //Refreshes Sched Nav Menu on the left
      this.setState({
          schedEntries : HoursDataService.getSchedEntries(this.state.selectedCustomer, this.state.schedType)
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
            <SchedMenuNav entries={this.state.schedEntries} />
        </div>
        <div className="tablesPane" >
            <HoursTabContainer onTabSelect={this.handleHoursTabChange} selected={this.state.activeHrsTab} />
        </div>                    
      </div>
    );
  }
});

module.exports = HrsApp;