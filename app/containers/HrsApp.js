var React = require('react');
var CustomerDropdown = require('../components/CustomerDropdown');
import HoursDataService from '../../services/dataService';

var HrsApp = React.createClass({
  getInitialState: function(){
    return { 
        selected: 1,
        customers: [] 
    };
  },

  handleSelectCustomer: function(event, index, value) {
    this.setState({ selected: value });
    console.log("Selected Customer is " + value.toString());
  },
  
  componentDidMount: function() {
      this.setState({
        customers : HoursDataService.getCustomers()
    });
  },

  render: function() {
    var customer_id = this.state.customer_id;

    return (
      <div >
        <CustomerDropdown onCustomerSelect={this.handleSelectCustomer} customers={this.state.customers} selected={this.state.selected} />
      </div>
    );
  }
});

module.exports = HrsApp;