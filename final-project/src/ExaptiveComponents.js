import React, { Component } from 'react';
import axios from 'axios'
import { Markdown } from 'react-showdown'

class ExaptiveComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(props)
  }

  componentDidUpdate(prevProps,prevState){
    const id = this.props.match.params.id
    if(id!== prevProps.match.params.id){
    	const url = `${this.props.componentBase}/${id}/spec.json`
    	axios
      	.get(url)
      	.then(this.successAjaxHandler)  	
	}
  }

  componentDidMount() {
    const id = this.props.match.params.id
    console.log("id is:");
    console.log(id);    
    const url = `${this.props.componentBase}/${id}/spec.json`

    axios
      .get(url)
      .then(this.successAjaxHandler)
  }

  successAjaxHandler = (res) => {
    console.log("data", res.data)
    this.setState({data: res.data})
  }

  renderComponentData(data) {
    var Converter = require('react-showdown').Converter;
    var converter = new Converter();
    if (data) {
      return (
        <div>
        <h1>{data.name}</h1>
        <h4>{converter.convert(data.description)}</h4>
        </div>
      )
    }
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
      {this.renderComponentData(this.state.data)}
      </div>
    )
  }
}

export default ExaptiveComponent
