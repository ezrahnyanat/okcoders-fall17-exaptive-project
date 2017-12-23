import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, makeSelectable } from 'material-ui/List'; 
import { Link } from 'react-router-dom'
import axios from'axios';
import { filter } from 'lodash'

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
        const filtered = this.filterForCategory(data)
        const isActive = this.filterForActive(filtered)
        this.setState({
            components: isActive
        })
        console.log(this.state.components);
        
    }

    filterForCategory(data) {
        this.props.categoryFilter
        if (this.props.categoryFilter){
            return filter(data, {'Category': this.props.categoryFilter})          
        } else {
            return data
        }
    }

    filterForActive(filtered) {
        return filter(filtered, {'is_active': true })
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
                        primaryText={ i.Name }/>
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