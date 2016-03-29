/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
import React from 'react';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';



var items = [];

class CustomerSelect extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {selected: 2};
  }
  
  componentWillMount() {
      var customers = this.getCustomerData();
      //items = customers;
  }
  
  getCustomerData() {
      
      items.push({value:1, label:"neat"});
      items.push({value:2, label:"SpokenDA"});
      items.push({value:3, label:"Guthy"});
      
      //return menuItems;
      return items;
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