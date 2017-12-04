import React, { Component } from 'react';
import './App.css';
import Display from './display.js'
import Introduction from './Introduction.js'
import ExaptiveComponents from './ExaptiveComponents.js'
import Xaps from './Xaps.js'
import { Route, Switch } from 'react-router-dom'
import ComponentFilter from './ComponentFilter.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xapsBase: "https://www.exaptive.city/api/v1/xaps/",
      componentBase: "https://www.exaptive.city/api/v1/components/",
      selectedIndex: 0
    }
  }	
  render() {
    return (
      <div>
        <Display {...this.state}/>
        <Switch>
            <Route exact path="/" component={Introduction} />
            <Route exact path="/Introduction" component={Introduction} />
            <Route exact path="/ComponentFilter" component={ComponentFilter} />
            <Route exact path="/mycomponent/:id" render={(props) => (
              <ExaptiveComponents {...this.state} {...props} />
            )} />
            <Route exact path="/xaps/" render={(props) => (
	            <Xaps {...this.state} {...props}/>
            )} /> 
	          {/* <Route exact path="/xap/:id" render={(props) => (
	            <Xaps {...this.state} {...props}/>
	            )} />	         */}
        </Switch>         
      </div>
    );
  }
}

export default App;

//this is original stuff
          //<Route path="/mycomponent/:id" render={(props) => (
	        //  <ExaptiveComponents {...this.state} {...props}/>
	        //)} />
