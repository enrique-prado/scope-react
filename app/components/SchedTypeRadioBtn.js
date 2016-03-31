/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
var React = require('react');
var RadioButton = require('material-ui/lib/radio-button');
var RadioButtonGroup = require('material-ui/lib/radio-button-group');

const styles = {
  wide: {
    maxWidth: 1500,
  },
  radioButton: {
    marginBottom: 16,
    marginRight:10,
    width:'100px',
    display: 'inline-block'
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
    <div >
        <RadioButtonGroup name="schedTypeBtnGrp" onChange={this.handleChange} defaultSelected={this.props.defaultSelected} style={styles.wide} >
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