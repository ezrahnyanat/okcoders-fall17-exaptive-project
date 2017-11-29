import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, makeSelectable } from 'material-ui/List'; 
import ExapComponents from './ExapComponents.json';
import { GetComponents } from './XapComponentService'
import { Link } from 'react-router-dom'
import ActionHome from 'material-ui/svg-icons/action/home';

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
        this.state = {}
    }

    componentDidMount() {
        GetComponents((data) => {
            this.setState({
                data: data
            })
        })
    }

    renderListItems =(data) => {
        return (
            <SelectableList>
                {this.makeComponentList(data)}
            </SelectableList>
        )
    }

    makeComponentList = (data) => {
        return ExapComponents.map(i => {
            const to = `/mycomponent/${i.UUID}`
            return (
                <ListItem
                    value={i}
                    leftIcon={<img src="https://s3.amazonaws.com/content.exaptive.com/component.jpg"/>} 
                    primaryText={ <Link to={to}> {i.Name} </Link> }
                    secondaryText={i.Category}
                />
            )
        })
    }


    render() {
        return (
            <div>
                {this.state.data && this.renderListItems(this.state.data)}
            </div>
        )
    }
}

export default ComponentList