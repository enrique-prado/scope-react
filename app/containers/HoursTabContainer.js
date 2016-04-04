import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import HoursTable from '../components/HoursTable';

const hrsTabStyles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

var HoursTabContainer = React.createClass({
  propTypes: {
    regularHours: React.PropTypes.array,
    exceptionHours: React.PropTypes.array,
    onTabSelect: React.PropTypes.func.isRequired,
    onRegularHrsUpdate: React.PropTypes.func,
    onExceptionHrsUpdate: React.PropTypes.func,
    selected: React.PropTypes.string
  },  
  handleChange: function(value) { 
      //Check for any unsaved changes, prompt if unsaved
      this.props.onTabSelect(value);
  },
  
  render: function() {
      
      return (
          <Tabs onChange={this.handleChange} value={this.props.selected}>
            <Tab label="Weekly Hours" value="weekly">
                <div>
                    <HoursTable rows={this.props.regularHours} />
                </div>
            </Tab>
            <Tab label="Exceptions" value="exceptions">
                <div>
                    TABLE 2 GOES HERE
                </div>
            </Tab>            
          </Tabs>
      )
  }

});

module.exports = HoursTabContainer;