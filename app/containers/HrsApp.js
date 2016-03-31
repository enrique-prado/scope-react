var React = require('react');
var CustomerDropdown = require('../components/CustomerDropdown');
import HoursDataService from '../../services/dataService';
var SchedTypeRadioBtn = require('../components/SchedTypeRadioBtn');

var HrsApp = React.createClass({
  getInitialState: function(){
    return { 
        selectedCustomer: 1,
        customers: [],
        schedType: "global"
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
        <div className="leftNav">
            <table id='hrs-leftNavTable'>
                <thead>
                <tr>
                    <th>Sched Type</th>
                </tr>
                </thead>
            <tbody className="notranslate">
                            
            </tbody>
            </table>        
        </div>                    
      </div>
    );
  }
});

module.exports = HrsApp;