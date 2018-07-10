import React, { Component } from 'react';
import TableComp from './TableComp.js';
import DialogWithActions from './DialogWithActions.js';

class xaps extends Component {

// Constructor
	constructor(props) {
		super(props);
		this.state = {
	  		open: false
		};
	}

// handle functions


// render method.. 	
    render () {
        return (
            <div>
                <h1> Xaps </h1>
                <h2> Update the List of Xaps to be displayed here.</h2>
                <DialogWithActions/>
                <TableComp/>
            </div>
        )
    }
}

export default xaps