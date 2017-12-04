import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class Introduction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            welcome: []
        }
    }

    componentDidMount() {
        axios
        .get('https://api.myjson.com/bins/1bqszf')
        .then((res) => this.getIntro(res.data))
    }

    getIntro = (data) => {
        this.setState({
        welcome: data
        })
        console.log(this.state.welcome)
    }

    renderIntroData(welcome) {
        if(welcome) {
            return (
                <div>
                <h1>{welcome.title}</h1>
                <h4>{welcome.description}</h4>
                </div>
            )
        }
    }

    render () {
        return (
            <div>
            {this.renderIntroData(this.state.welcome)}
            </div>
        )
    }

}



export default Introduction