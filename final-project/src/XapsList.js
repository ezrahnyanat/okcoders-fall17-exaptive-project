import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, makeSelectable } from 'material-ui/List'; 
import { Link } from 'react-router-dom'
import axios from'axios';
import { filter } from 'lodash'

let SelectableList = makeSelectable(List)

function wrapState(ComposedXaps) {
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
          <ComposedXaps
            value={this.state.selectedIndex}
            onChange={this.handleRequestChange}
          >
            {this.props.children}
          </ComposedXaps>
        );
      }
    };
  }
  

SelectableList = wrapState(SelectableList);

class XapsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            xaps: []
        }
    }

    componentDidMount() {
        axios
            .get('https://api.myjson.com/bins/19u04r')
            .then((res) => this.GetXaps(res.data))
            .catch(err => this.handleErrors(err))
    }

    GetXaps = (data) => {
        const filtered = this.filterForCategory(data)
        const isActive = this.filterForActive(filtered)
        this.setState({
            xaps: isActive
        })
        console.log(this.state.xaps);
        
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
                {this.makeXapsList(data)}
            </SelectableList>
        )
    }

    makeXapsList = (data) => {
        return data.map(i => {
            const to = `/myxap/${i.uuid}`
            return (
                <Link to={to}>
                    <ListItem
                        value={i}
                        //leftIcon={<img src="https://s3.amazonaws.com/content.exaptive.com/component.jpg"/>} 
                        primaryText={ i.uuid }
                        // secondaryText={i.Category}
                    />
                </Link>
            )
        })
    }


    render() {
        return (
            <div>
                {this.state.xaps && this.renderListItems(this.state.xaps)}
            </div>
        )
    }
}

export default XapsList