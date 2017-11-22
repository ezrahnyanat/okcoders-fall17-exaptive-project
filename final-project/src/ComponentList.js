import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, makeSelectable } from 'material-ui/List'; 
import ExapComponents from './ExapComponents.json';
import { GetComponents } from './XapComponentService'

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
        console.log('comps are',ExapComponents);
        
    }

    componentDidMount() {
        GetComponents((data) => {
            this.setState({
                data: data
            })
        })
    }

    renderListItems =(ExapComponents) => {
        return (
            <SelectableList>
                {this.makeComponentList(ExapComponents)}
            </SelectableList>
        )
    }

    makeComponentList = (ExapComponents) => {
        console.log('ExapComps are' ,ExapComponents);
        
        return ExapComponents.map(i => {
            return (
                <ListItem
                    value={i} 
                    primaryText={i.Name}
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