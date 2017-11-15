import React, { Component } from 'react';
import axios from 'axios';
import Table from 'material-ui/Table';
import {Link} from 'react-router-dom'


class Xaps extends Component {
    constructor(props) {
        super(props)
        this.state= {
            xapUrl: "https://cognet.exaptive.city/api/v1/suggestions/components/fc9dec70-38ab-11e6-acbd-475d4429cea6?reload=false&city=exaptive.city"
        }
    }

componentDidMount() {
    axios
        .get(this.props.xapUrl)
        .then(this.successAjaxHandler)
    }

successAjaxHandler = (res) => {
    this.setState({data: res.data})
    }

    render () {
        return (
            <div>
                <h1> Xaps </h1>
                <h2> {this.state.data && this.state.data.name} </h2>
            </div>
        )
    }

}



export default Xaps