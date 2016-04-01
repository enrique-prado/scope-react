var React = require('react');
var CustomerDropdown = require('../components/CustomerDropdown');
import HoursDataService from '../../services/dataService';
var SchedTypeRadioBtn = require('../components/SchedTypeRadioBtn');
var SchedMenuNav = require('../components/SchedMenuNav');

    const appStyles = {
        menunav: {
            width:'300px'
        }
    }

var HrsApp = React.createClass({
  getInitialState: function(){
    return { 
        selectedCustomer: "Neat",
        customers: [],
        schedType: "global",
        schedEntries: []
    };
  },

  componentDidMount: function() {
      this.setState({
        customers : HoursDataService.getCustomers()
    });
  },
  
  handleSelectCustomer: function(event, index, value) {
    this.setState({ selectedCustomer: value });
    console.log("Selected Customer is " + value);
  },  
  
  handleSchedTypeChange: function(event, value) {
      this.setState({schedType: value});
      console.log("Sched Type changed to " + value);
  },
  
  componentDidUpdate: function(prevProps, prevState) {
      if ((prevState.selectedCustomer !== this.state.selectedCustomer) || (prevState.schedType !== this.state.schedType)) {
        this.populateSchedNavMenu();
      }
  },
  
  populateSchedNavMenu: function() {
      //Refreshes Sched Nav Menu on the left
      this.setState({
          schedEntries : HoursDataService.getSchedEntries(this.state.selectedCustomer, this.state.schedType)
      });
  },

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
      </div>
    );
  }
});

module.exports = HrsApp;