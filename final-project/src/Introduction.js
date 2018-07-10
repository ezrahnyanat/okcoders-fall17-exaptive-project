import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import 'react-showdown'


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
        const Converter = require('react-showdown').Converter;
        const converter = new Converter();
        if(welcome) {
            return welcome.map(i => {
                return (
                    <div>
                        <h1>{converter.convert(i.title)}</h1>
                        <p>{converter.convert(i.description)}</p>
                    </div>
                )
            })
        }
    }

    render () {
        return (
            <div  style={{textAlign:'center'}}>
            {this.state.welcome && this.renderIntroData(this.state.welcome)}
            </div>
        )
    }

}



export default Introduction