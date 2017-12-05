import React, { Component } from 'react';
import { draftToMarkdown } from 'markdown-draft-js';
import { markdownToDraft } from 'markdown-draft-js';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Link, BrowserRouter  } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import showdown from 'showdown';
import DOMPurify from 'dompurify';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import 'draft-js/dist/Draft.css';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

export class MyEditor extends Component{
  constructor(props){
    super(props);
    this.state = {
      isNew: true,
      id:"",
      title:"",
      description:"",
      preview:"",
      prevPath: ''
    };
  }
  componentDidMount() {
    console.log("I am in the componentsDidMount from MyEditor.");
    const url = `/static/${this.props.match.params.id}`
    if(this.props.match.params.id){
      axios
        .get(url)
        .then(this.successAjaxHandler)
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }
  }

  successAjaxHandler = (res) => {
    console.log("data", res.data)
    const converter = new showdown.Converter();
    const htmlOutput = converter.makeHtml(res.data.description);
    this.setState({
      isNew: false,
      id: res.data.id,
      title:res.data.title,
      description:res.data.description,
      previewHtml: htmlOutput
    })
  };
  handleOnChange =()=>{
    const converter = new showdown.Converter();
    var htmlOutput = converter.makeHtml(this.state.description);
    this.setState({previewHtml: htmlOutput});
    console.log(this.state.previewHtml);

  }
  handleSave = ()=>{
    if(this.state.isNew){
      const url = `/static`
      const content = {
        title: this.state.title,
        description: this.state.description
      }
      axios
      .post(url,content)
      .then(this.successAjaxHandler)
    }
    else{
      const url = `/static/${this.props.match.params.id}`
      const content = {
        title: this.state.title,
        description: this.state.description
      }
      axios
      .put(url,content)
      .then(this.successAjaxHandler)
    }
    this.props.history.push('/pages');
  }
  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  handleChangeDescription = (event) => {
    const converter = new showdown.Converter();
    var htmlOutput = converter.makeHtml(event.target.value);
    console.log(this.state.previewHtml);
    this.setState({
      description: event.target.value,
      previewHtml: htmlOutput
    });    
  };  
  render(){
    return(
    <div>
      <h1> Pages</h1>
      <h2> Update the title and description of each page here.</h2>
      <TextField
        value={this.state.title}
        onChange={this.handleChangeTitle}
        disabled={false}
      />        
      <br />
      <br />
      <Table selectable = {false}>
          <TableBody displayRowCheckbox = {false}>
            <TableRow>
              <TableRowColumn>
                <TextField
                  disabled={false}
                  hintText="Description in Markdown text"
                  value={this.state.description}
                  onChange={this.handleChangeDescription}
                  multiLine={true}
                  rows={6}
                  rowsMax={10}
                />
              </TableRowColumn>
              <TableRowColumn>
                <div id="result" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.previewHtml)}}>
                </div>
                </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>
              </TableRowColumn>
              <TableRowColumn>
                <FlatButton label="Save" primary={true} onClick={this.handleSave} />
              </TableRowColumn>              
            </TableRow>
          </TableBody>
      </Table>                
    </div>
  )}
}
const style = {
  margin: 12,
};
export class Pages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:"",
      title:"",
      description:""
    };
  }

  componentDidMount() {
    console.log("I am in the componentsDidMount");
    const url = `/static`
    axios
      .get(url)
      .then(this.successAjaxHandler)
  }

  successAjaxHandler = (res) => {
    console.log("data", res.data)
    this.setState({data: res.data})
  };

  renderList(data){
    return data.map(t => {
    const to = `/pages/edit/${t._id}`
    return(
      <MenuItem key={t._id}>
        <Link to={to}>{t.title}</Link>
      </MenuItem>
    )}
    )
  }
  renderComponentData = (data) => {
    if(data){
      return(
      <Menu>
       {this.renderList(data)}
      </Menu>
    )}
    else
      return(<div/>);
  };
    render () {
          return (
            <div id="content">
                <br /><br /><br /><br />
                <RaisedButton label="New" href={'/pages/new'} primary={true} style={style} />
                <h1> List of pages </h1>
                {this.renderComponentData(this.state.data)}
            </div>
        )
    }

}

export default Pages