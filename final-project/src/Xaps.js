import React, { Component } from 'react';
import axios from 'axios'
import 'react-showdown'

class Xaps extends Component {
  constructor(props) {
    super(props)
    this.state = {
        xaps:[]
    }
    console.log(props)
  }

  componentDidMount() {
    axios
      .get('https://api.myjson.com/bins/19u04r')
      .then(this.successAjaxHandler)
      .catch(err => this.handleErrors(err))
  }

  successAjaxHandler = (res) => {
    console.log("data", res.data)
    this.setState({data: res.data})
  }

  renderXapsData(data) {
    console.log("data", data)
    const Converter = require('react-showdown').Converter;
    const converter = new Converter();
    const style = {
      paddingLeft: 250,
      paddingRight: 60
    }
    if (data) {
      return (
        <div style={style}>
        <h1>{data.name}</h1>
        <h4>{converter.convert(this.fixIframeReference(data.description))}</h4>
        </div>
      )
    }
  }

  fixIframeReference(desc) {
    return desc.replace("<iframe src=\"/", "<iframe src=\"https://exaptive.city/api/v1/")
  }

//  renderTags(tags) {
  	//var i = 0;
    //return tags.map(function(t) {
  //	 return (<h5>{t}</h5>)
//	});
  //}


  render() {
    return (
      <div>
      {this.renderXapsData(this.state.data)}
      </div>
    )
  }
}

export default Xaps
