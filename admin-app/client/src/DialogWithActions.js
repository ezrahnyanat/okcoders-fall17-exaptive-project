import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class DialogWithActions extends Component {
	state = {
	open: false,
	};

	handleOpen = () => {
	this.setState({open: true});
	};

	handleClose = () => {
	this.setState({open: false});
	};

	render() {
		const actions = [
		  <FlatButton
		    label="Cancel"
		    primary={true}
		    onClick={this.handleClose}
		  />,
		  <FlatButton
		    label="Submit"
		    primary={true}
		    disabled={false}
		    onClick={this.handleClose}
		  />,
		];

	    return (
	      <div>
	        <RaisedButton label="Fetch the data from the API" fullWidth={true} onClick={this.handleOpen} />
	        <Dialog
	          title="Are you sure you want to replace the current data?"
	          actions={actions}
	          modal={true}
	          open={this.state.open}
	        >
	          Fetching the data will replace the current data and default all the selections.
	        </Dialog>
	      </div>
	    );
  	}
}
