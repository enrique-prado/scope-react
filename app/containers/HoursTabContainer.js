import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

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
    onRegularHrsUpdate: React.PropTypes.func,
    onExceptionHrsUpdate: React.PropTypes.func,
    selected: React.PropTypes.any
  },  
  handleChange: function(event, index, value) { 
      //Check for any unsaved changes, prompt if unsaved
      this.props.onRegularHrsSelect(event, index, value);
  },
  
  render: function() {
      
      return (
          <Tabs onChange={this.handleChange}>
            <Tab label="Weekly Hours" value="weekly">
                <div>
                    TABLE 1 GOES HERE
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