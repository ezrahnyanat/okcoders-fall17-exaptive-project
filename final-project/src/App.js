import React, { Component } from 'react';
import './App.css';
import Display from './display.js'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
            <Display />
      </div>
    );
  }
}

export default App;
