/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
var React = require('react');
var SelectField = require('material-ui/lib/SelectField');
var MenuItem = require('material-ui/lib/menus/menu-item');

var CustomerDropdown = React.createClass({
  propTypes: {
    customers: React.PropTypes.array,
    onCustomerSelect: React.PropTypes.func.isRequired
  },  
  handleChange: function(event, index, value) { 
      //Call parent's handler which handle's state
      this.props.onCustomerSelect(event, index, value);
  },

  render: function() {
    var customer_list = this.props.customers.map(function(customer) {
    return (
            <MenuItem key={customer.value} value={customer.value} primaryText={customer.label}/>
        )
    });
    return (
    <div>
        <SelectField value={this.props.selected} onChange={this.handleChange}>
            {customer_list}
        </SelectField>
    </div>
    );
  }
});


module.exports = CustomerDropdown;