var React = require('react');
var CustomerDropdown = require('../components/CustomerDropdown');
import HoursDataService from '../../services/dataService';

var HrsApp = React.createClass({
  getInitialState: function(){
    return { 
        customer_id: null,
        customers: [] 
    };
  },

  handleSelectCustomer: function( value) {
    this.setState({ customer_id: value });
  },
  
  componentWillMount: function() {
      this.state.customers = HoursDataService.getCustomers();
  },

  render: function() {
    var customer_id = this.state.customer_id;

    return (
      <div >
        <CustomerDropdown customers={this.state.customers}  />
      </div>
    );
  }
});

module.exports = HrsApp;