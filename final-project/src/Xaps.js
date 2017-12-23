import React, { Component } from 'react';
import axios from 'axios'
import 'react-showdown'
import { ListItem } from 'material-ui/List'; 

class Xaps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xapData:[]
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
    this.setState({xapData: res.data})
  }

  renderXapsData = (data) => {
    return (
      <div>
        {this.renderXaps(data)}
      </div>
    )
  }

  renderXaps(data) {
    return data.map(i => {
      return(
        <div>
          <ListItem
            value={i}
            leftIcon={<img src="https://s3.amazonaws.com/content.exaptive.com/component.jpg"/>} 
            primaryText={'UUID is ' + i.uuid }
            secondaryText={'is Active? ' + i.is_active.toString()}
          />
        </div>
      )
    })
  }
  
  render() {
    return (
      <div>
      {this.state.xapData && this.renderXapsData(this.state.xapData)}
      </div>
    )
  }
}

export default Xaps

