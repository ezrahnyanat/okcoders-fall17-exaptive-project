import React, { Component } from 'react';
import TableComp from './TableComp.js';
import DialogWithActions from './DialogWithActions.js';
import axios from 'axios';
import { BrowserRouter  } from 'react-router-dom';

class xcomponents extends Component {


    render () {
        return (
            <div>
                <h1> Components </h1>
                <h2> Update the List of Components to be displayed here.</h2>
                <DialogWithActions url='/xcomponents' history={this.props.history}/>
            </div>
        )
    }

}

export default xcomponents