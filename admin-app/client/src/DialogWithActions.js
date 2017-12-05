import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import TableComp from './TableComp.js';
import { Link, BrowserRouter  } from 'react-router-dom';

export default class DialogWithActions extends Component {
	state = {
	open: false,
	data:{},
	url:''
	};

	handleOpen = () => {
	this.setState({open: true, url: this.props.url});
	};
	handleClose = () => {
	this.setState({open: false});
	};
	fetchData = () => {
		const fetchUrl = `${this.props.url}/fetch`
		const getUrl = `${this.props.url}`
		axios
		.get(fetchUrl)
		.then(this.successAjaxHandler);	
	}
	successAjaxHandler = (res) => {
		this.setState({data: res.data, open:false})
		console.log(this.props);
		console.log(this.props.history);
		console.log("Pushing this route through...");
		console.log(this.props.url);
		window.location.reload();
		//this.props.history.push('/xaps')
	};
	render() {
		console.log(this.props);
		const actions = [
		  <FlatButton
		    label="Cancel"
		    primary={true}
		    onClick={this.handleClose}
		  />,
		  <FlatButton
		    label="OK"
		    primary={true}
		    disabled={false}
		    onClick={this.fetchData}
		  />,
		];

	    return (
	      <div>
	        <RaisedButton label="Fetch the data from the API" fullWidth={true} onClick={()=> this.setState({open: true})} />
	        <Dialog
	          title="Are you sure you want to replace the current data?"
	          actions={actions}
	          modal={true}
	          open={this.state.open}
	          history={this.props.history}
	        >
	          Fetching the data will replace the current data and default all the selections.
	        </Dialog>
	        <TableComp data={this.state.data} url={this.props.url}/>

	      </div>
	    );
  	}
}
