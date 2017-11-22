import React, { Component } from 'react';
import './App.css';
import Display from './display.js'
import Introduction from './Introduction.js'
import ExaptiveComponents from './ExaptiveComponents.js'
import Xaps from './Xaps.js'
import { Route, Switch, Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xapsBase: "https://exaptive.city/api/v1/xaps/efa507b0-76f3-11e7-a0fe-d7ef23f2c0f6/spec.json",
      componentBase: "https://exaptive.city/api/v1/components/",
      selectedIndex: 0
    }
  }	
  render() {
    return (
      <div>
        <Display {...this.state}/>
        <Switch>
            <Route exact path="/Introduction/" component={Introduction} />
	        <Route path="/mycomponent/:id" render={(props) => (
	          <ExaptiveComponents {...this.state} {...props}/>
	        )} />
	        <Route path="/xap/:id" render={(props) => (
	          <Xaps {...this.state} {...props}/>
	        )} />	        
        </Switch>         
      </div>
    );
  }
}

export default App;


