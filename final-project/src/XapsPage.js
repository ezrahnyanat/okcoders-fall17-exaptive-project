import React, { Component } from 'react';
import axios from 'axios'
import 'react-showdown'

class XapsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(props)
  }

  componentDidUpdate(prevProps,prevState){
    const id = this.props.match.params.id
    if(id!== prevProps.match.params.id){
    	const url = `${this.props.xapsBase}/${id}/spec.json`
    	axios
      	.get(url)
      	.then(this.successAjaxHandler)  	
	}
  }

  componentDidMount() {
    const id = this.props.match.params.id
    console.log("id is:");
    console.log(id);    
    console.log(this.props.xapsBase)
    const url = `${this.props.xapsBase}/${id}/spec.json`

    axios
      .get(url)
      .then(this.successAjaxHandler)
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
        <h1>{<img src={data.image} />}</h1>
        <h4>Description: {converter.convert(this.fixIframeReference(data.description))}</h4>
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

export default XapsPage
