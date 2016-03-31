/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
var React = require('react');
var RadioButton = require('material-ui/lib/radio-button');
var RadioButtonGroup = require('material-ui/lib/radio-button-group');

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

var SchedTypeRadioBtn = React.createClass({
  propTypes: {
    onSchedTypeSelect: React.PropTypes.func.isRequired,
    defaultSelected: React.PropTypes.string
  },  
  handleChange: function(event, value) { 
      //Call parent's handler which handles state logic
      this.props.onSchedTypeSelect(event, value);
  },

  render: function() {

    return (
    <div>
        <RadioButtonGroup name="schedTypeBtnGrp" onChange={this.handleChange} defaultSelected={this.props.defaultSelected}>
            <RadioButton
                value="global"
                label="Global"
                style={styles.radioButton}
            />
            <RadioButton
                value="dn"
                label="DN"
                style={styles.radioButton}
            />
            <RadioButton
                value="queue"
                label="Skill"
                style={styles.radioButton}
            />
        </RadioButtonGroup>
    </div>
    );
  }
});


module.exports = SchedTypeRadioBtn;