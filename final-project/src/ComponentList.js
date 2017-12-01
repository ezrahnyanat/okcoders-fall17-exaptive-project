import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, makeSelectable } from 'material-ui/List'; 
import ExapComponents from './ExapComponents.json';
// import { GetComponents } from './XapComponentService'
import { Link } from 'react-router-dom'
import ActionHome from 'material-ui/svg-icons/action/home';
import axios from'axios';

let SelectableList = makeSelectable(List)

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
      static propTypes = {
        children: PropTypes.node.isRequired,
        defaultValue: PropTypes.number.isRequired,
      };
  
      componentWillMount() {
        this.setState({
          selectedIndex: this.props.defaultValue,
        });
      }
  
      handleRequestChange = (event, index) => {
        this.setState({
          selectedIndex: index,
        });
      };
  
      render() {
        return (
          <ComposedComponent
            value={this.state.selectedIndex}
            onChange={this.handleRequestChange}
          >
            {this.props.children}
          </ComposedComponent>
        );
      }
    };
  }
  

SelectableList = wrapState(SelectableList);

class ComponentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            components: []
        }
    }

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
        console.log(this.state.components);
        
    }

    renderListItems = (data) => {
        return (
            <SelectableList>
                {this.makeComponentList(data)}
            </SelectableList>
        )
    }

    makeComponentList = (data) => {
        return data.map(i => {
            const to = `/mycomponent/${i.UUID}`
            return (
                <Link to={to}>
                    <ListItem
                        value={i}
                        leftIcon={<img src="https://s3.amazonaws.com/content.exaptive.com/component.jpg"/>} 
                        primaryText={ i.UUID.Name }
                        // secondaryText={i.Category}
                    />
                </Link>
            )
        })
    }


    render() {
        return (
            <div>
                {this.state.components && this.renderListItems(this.state.components)}
            </div>
        )
    }
}

export default ComponentList