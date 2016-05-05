var React = require('react');
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
//import TextField from 'material-ui/lib/text-field';
//import Toggle from 'material-ui/lib/toggle';
//import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';

var ScrollNavBar = React.createClass({
  propTypes: {
    entries: React.PropTypes.array,
    selected: React.PropTypes.string,
    onEntrySelect: React.PropTypes.func.isRequired
  },
  
  handleRowSelected : function(key){
    //return this.props.rows[rowIdx]
    if (key.length < 1) return;
    
    var index = key[0];
    console.log('>>>>>>>>>>>>>>Menu Row selected key: ' + index);
    console.log('Correspoding label: ' + this.props.entries[index].queue);  
    
    this.props.onEntrySelect(this.props.entries[index].queue);
  },
 
  //HELPER FUNCTIONS

  
  //UI
  
  render:function(){
    var self = this;
    var rowsCount = this.props.entries ? this.props.entries.length : 0;
    var entries_list = this.props.entries.map(function(entry, index) {
        var select = entry.queue == self.props.selected ? true : false;
        return (
            <TableRow selected={select}  key={index}>
                <TableRowColumn>
                    {entry.queue}
                </TableRowColumn>
            </TableRow>
        )
    });
    
    return(
      <Table
      height="300px"
      width="200px"
      selectable={true}
      rowsCount={rowsCount}
      onRowSelection={this.handleRowSelected}
      >
        <TableHeader displaySelectAll={false}>
            <TableRow>
                <TableHeaderColumn tooltip="Displays Skills or DN's depending on selection">Entries</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody showRowHover={true} displayRowCheckbox={false} deselectOnClickaway={false} >
            {entries_list}
        </TableBody>
      </Table>        
    );
  }

});

module.exports = ScrollNavBar;
