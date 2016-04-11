/**
 * In this file, we create a React component
 * which incorporates components providedby adazzle React Data Grid.
 */
import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble';

let SelectableList = SelectableContainerEnhance(List);

function wrapState(ComposedComponent) {
  const StateWrapper = React.createClass({
    getInitialState() {
      return {selectedIndex: 1};
    },
    handleUpdateSelectedIndex(e, index) {
      this.setState({
        selectedIndex: index,
      });
    },
    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          valueLink={{value: this.state.selectedIndex, requestChange: this.handleUpdateSelectedIndex}}
        />
      );
    },
  });
  return StateWrapper;
}

//SelectableList = wrapState(SelectableList);

var SchedMenuNav = React.createClass({
    propTypes: {
        selected: React.PropTypes.string,
        entries: React.PropTypes.array,
        onEntrySelect: React.PropTypes.func.isRequired
    },
    handleSelect: function(event, index) { 
      //Call parent's handler which handles state logic
      this.props.onEntrySelect(event, index);
    },
    
    render: function() {
        var sched_entries = this.props.entries.map(function(entry, index) {
            return (
                <ListItem key={index} value={entry.queue} primaryText={entry.queue} rightIcon={<CommunicationChatBubble/>} />
            )
        });
        return (
        <div>
            <SelectableList 
                valueLink={{value: this.props.selected, requestChange: this.handleSelect}}
                subheader="Entries" >
                {sched_entries}
            </SelectableList>
        </div>
        );
    }
});

module.exports = SchedMenuNav;
