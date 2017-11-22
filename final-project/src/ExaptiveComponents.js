import React, { Component } from 'react';
import axios from 'axios'

class ExaptiveComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(props)
  }

  componentWillReceiveProps(props){
  	console.log(props);

  }
  componentDidMount() {
    const id = this.props.match.params.id
    console.log("id is:");
    console.log(id);    
    const url = `${this.props.componentBase}/${id}/spec.json`
    axios
      .get(url)
      .then(this.successAjaxHandler)
      this.setState();
  }

  successAjaxHandler = (res) => {
    console.log("data", res.data)
    this.setState({data: res.data})
  }

  renderComponentData(data) {
    if (data) {
      return (
        <div>
        <h1>{data.name}</h1>
        <h4>{data.description}</h4>
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
