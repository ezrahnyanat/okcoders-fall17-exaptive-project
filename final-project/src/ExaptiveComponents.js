import React, { Component } from 'react';
import axios from 'axios'

class ExaptiveComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(props)
  }

  componentDidMount() {
    const id = this.props.match.params.id
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
    if (data) {
      return (
        <div>
        <h1>{data.name}</h1>
        <h4>{data.description}</h4>
        {this.renderTags(data.tags)}
        </div>
      )
    }
  }

  renderTags(tags) {
    return tags.map(t => (<h5>{t}</h5>))
  }

  render() {
    return (
      <div>
      <h1> Component Data </h1>
      {this.renderComponentData(this.state.data)}
      </div>
    )
  }
}

export default ExaptiveComponent
