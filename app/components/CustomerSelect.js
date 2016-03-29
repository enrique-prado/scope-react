/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
import React from 'react';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';
import HoursDataService from '../../services/dataService';


var items = [];

class CustomerSelect extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {selected: 2};
  }
  
  componentWillMount() {
      items = this.getCustomerData();
  }
  
  getCustomerData() {
      var arr = HoursDataService.getCustomers();
      var l = arr.length;
      return arr;
  }

  handleChange(event, index, value) { 
      this.setState({selected:value});
  }

  render() {
    var options = items.map(function(customer) {
    return (
            <MenuItem key={customer.value} value={customer.value} primaryText={customer.label}/>
        )
    });
    return (
    <div>
        <SelectField value={this.state.selected} onChange={this.handleChange}>
            {options}
        </SelectField>
    </div>
    );
  }
}

export default CustomerSelect;