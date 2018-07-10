import React, { Component } from 'react';
import axios from'axios';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import ComponentList from './ComponentList.js'

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
          components: []
        };
      }
    
    handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
      };

    componentDidMount() {
        axios
            .get('https://api.myjson.com/bins/rsf3n')
            .then((res) => this.GetComponents(res.data))
            .catch(err => this.handleErrors(err))
    }

     GetComponents = (data) => {
        this.setState({
            components: data
        })
        console.log(this.state.components)
    }


    render() {
        return(
        <div>
        <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}>
            <Tab label="All" value={0} />
            <Tab label="Visualization" value={1} />
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
            <h2 style={styles.headline}> Welcome to All!</h2>
            <ComponentList />
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Welcome to Viz!</h2>
            <ComponentList categoryFilter="Visualization" />
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Welcome to UI!</h2>
            <ComponentList categoryFilter="UI" />
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Welcome to Data!</h2>
            <ComponentList categoryFilter="Data" />
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Welcome to Utility!</h2>
            <ComponentList categoryFilter="Utility" />
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Welcome to Layout!</h2>
            <ComponentList categoryFilter="Layout" />
          </div>
        </SwipeableViews>
        </div>
        )
    }
}

export default ComponentFilter