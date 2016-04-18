/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
var React = require('react');
var SelectField = require('material-ui/lib/SelectField');
var MenuItem = require('material-ui/lib/menus/menu-item');

const styles = {
    dropdownCtl: {
        display:'inline-block',
        verticalAlign:'top',
        width:'200px'
    }
}

var CustomerDropdown = React.createClass({
  propTypes: {
    customers: React.PropTypes.array,
    onCustomerSelect: React.PropTypes.func.isRequired,
    selected: React.PropTypes.any
  },  
  handleChange: function(event, index, value) { 
      //Call parent's handler which handles state logic
      this.props.onCustomerSelect(event, index, value);
  },

  render: function() {
    var customer_list = this.props.customers.map(function(customer) {
    return (
            <MenuItem key={customer.value} value={customer.label} primaryText={customer.label}/>
        )
    });
    return (
    <div>
        <SelectField value={this.props.selected} onChange={this.handleChange} style={styles.dropdownCtl}>
            {customer_list}
        </SelectField>
    </div>
    );
  }
});


module.exports = CustomerDropdown;