import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';
import { Route, Switch, Link } from 'react-router-dom'
import Pages from './pages.js';
import xcomponents from './xcomponents.js';
import xaps from './xaps.js';

class App extends Component {
  state = {
    open: false
  };
handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
        <MuiThemeProvider>
        <div>
        <Switch>
            <Route exact path="/pages/" component={Pages}/>
            <Route exact path="/xcomponents/" component={xcomponents} />
            <Route exact path="/xaps/" component={xaps} />            
        </Switch> 
        <AppBar style={{ position: 'fixed', top: 0 }}
          title="Administration of Documentation Page"
          onClick={this.handleToggle}
        />
        <Drawer 
          open={this.state.open} 
          docked={false}
          onRequestChange={(open) => this.setState({open}) }
          >

            <MenuItem 
            primaryText = {<Link to="/pages"> Pages </Link>}>
            </MenuItem>
            <MenuItem 
            primaryText = {<Link to="/xcomponents"> Components </Link>}>
            </MenuItem>
            <MenuItem 
            primaryText = {<Link to="/xaps"> Xaps </Link>}>
            </MenuItem>            
        </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default App