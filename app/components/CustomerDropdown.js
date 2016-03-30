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
    onCustomerSelect: React.PropTypes.func
  },  
  handleChange: function(event, index, value) { 
      this.setState({selected:value});
  },

  render: function() {
    var customer_list = this.props.customers.map(function(customer) {
    return (
            <MenuItem key={customer.value} value={customer.value} primaryText={customer.label}/>
        )
    });
    return (
    <div>
        <SelectField value={this.props.selected} onChange={this.props.onCustomerSelect}>
            {customer_list}
        </SelectField>
    </div>
    );
  }
});


module.exports = CustomerDropdown;