import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, makeSelectable } from 'material-ui/List'; 
import ExapComponents from './ExapComponents.json';
// import { GetComponents } from './XapComponentService'
import { Link } from 'react-router-dom'
import ActionHome from 'material-ui/svg-icons/action/home';
import axios from'axios';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
    slide: {
      padding: 10,
    },
  };

class ComponentFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
          slideIndex: 0,
        };
      }
    
      handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
      };

    render() {
        return(
        <div>
        <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}>
            <Tab label="All" value={0} />
            <Tab label="Visualizations" value={1} />
            <Tab label="UI" value={2} />
            <Tab label="Data" value={3} />
            <Tab label="Utility" value={4} />
            <Tab label="Layout" value={5} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <h2 style={styles.headline}>Here are all the components!</h2>
          </div>
          <div style={styles.slide}>
          <h2 style={styles.headline}>Welcome to Viz!</h2>
          </div>
          <div style={styles.slide}>
          <h2 style={styles.headline}>Welcome to UI!</h2>
          </div>
          <div style={styles.slide}>
          <h2 style={styles.headline}>Welcome to Data!</h2>
          </div>
          <div style={styles.slide}>
          <h2 style={styles.headline}>Welcome to Utility!</h2>
          </div>
          <div style={styles.slide}>
          <h2 style={styles.headline}>Welcome to Layout!</h2>
          </div>
        </SwipeableViews>
        </div>
        )
    }
}

export default ComponentFilter