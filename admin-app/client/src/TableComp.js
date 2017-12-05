import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import axios from 'axios';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

 class ToggleComp extends Component{
  constructor(props){
    super(props);
    this.state={
      toggled: true
    }
  }
    handleToggle = (event) => {

      console.log(this.props);
      //do a put request here for the id.
      const url = `${this.props.url}/${this.props.id}/${!this.state.toggled}`;
      console.log(url);
      this.setState({toggled: !this.state.toggled});
      const content = {
      }
      axios
      .put(url,content)
      .then(this.successAjaxHandler);

  };
  successAjaxHandler = (res)=> {
    console.log(res.data);
  }

  componentDidMount(props){
    this.setState({toggled: this.props.isActive});
  }

  render(){
    return(
        <Toggle 
        toggled={this.state.toggled} 
        onToggle={this.handleToggle} 
        />
      )
  }
 }
export default class TableComp extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[]
    };
  }
  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '300px',
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  isEmpty = (obj)=> {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
  };

  renderTableBody(){
    console.log("I a in renderTableBody");
    const d = this.state.data;
    console.log(d);
    if(!this.isEmpty(d)){
      return(
      d.map( (row, index) => {
        return(
        <TableRow key={index}>
          <TableRowColumn><div>{row.name}</div></TableRowColumn>
          <TableRowColumn><div>
            <ToggleComp isActive={row.is_active} id={row._id} url={this.props.url}/>
          </div></TableRowColumn>
        </TableRow>
        )}
        ))
    }
  }
  componentDidMount(){
    console.log(" I am in the componentDidMount")
    const url = `${this.props.url}`
    axios
      .get(url)
      .then(this.successAjaxHandler)
  }

  successAjaxHandler = (res) => {
    console.log("data from TableAjax", res.data)
    this.setState({
      data: res.data
    })
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="2" tooltip="Filter UUIDs to Display" style={{textAlign: 'center'}}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="UUID">UUID</TableHeaderColumn>
              <TableHeaderColumn tooltip="Toggle to display">Display?</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
          {this.renderTableBody()}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>UUID</TableRowColumn>
              <TableRowColumn>Display?</TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
        <div style={styles.propContainer}>
        </div>
      </div>
    );
  }
}