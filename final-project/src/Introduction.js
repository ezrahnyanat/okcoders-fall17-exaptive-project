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

    renderIntroSection = (data) => {
        return(
            <div>
                {this.renderIntroData(data)}
            </div>
        )
    }

    renderIntroData(welcome) {
        if(welcome) {
            return welcome.map(i => {
                return (
                    <div>
                        <h1>{i.title}</h1>
                        <p>{i.description}</p>
                    </div>
                )
            })
        }
    }

    render () {
        return (
            <div>
            {this.state.welcome && this.renderIntroData(this.state.welcome)}
            </div>
        )
    }

}



export default Introduction