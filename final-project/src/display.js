import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton'
import Introduction from './Introduction.js'
import ExaptiveComponents from './ExaptiveComponents.js'
import Xaps from './Xaps.js'
import { Route, Switch, Link } from 'react-router-dom'
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentInfo from 'material-ui/svg-icons/action/info';
import axios from 'axios';
import ComponentList from './ComponentList'

class Display extends Component {

    constructor(props){
        super(props);
        this.state = {open: true};
        console.log("I am in display constructor.");
        console.log(props.xapsBase);
    }

    handleToggle = () => this.setState({open: !this.state.open})

    componentDidMount() {
        console.log("I am in display.");
        console.log(this.props);
        axios
        .get(this.props.xapsBase)
        .then(this.successAjaxHandlerForXaps)
        axios
        .get(this.props.componentBase)
        .then(this.successAjaxHandlerForComps)        
    }

      successAjaxHandlerForXaps = (res) => {
        this.setState({xapData: res.data});
        console.log("xapData fetched");
        console.log(this.state.xapData);
      }
      successAjaxHandlerForComps = (res) => {
        this.setState({compData: res.data});
        console.log("compData fetched");
        console.log(this.state.compData);
      }      
      renderComponentList(data){
        if(data){
        return data.dependencies.component.map(d => {
          const parsed = JSON.parse(d.class)
          const to = `/mycomponent/${parsed.uuid}`
          console.log("parsed info:");
          console.log(parsed);
          return (
                <ListItem
                  key={parsed.uuid}
                  primaryText={ <Link to={to}> {parsed.uuid} </Link> }
                  leftIcon={<ActionGrade />}
                />
                )
                })
            }
        }
    render () {
        return (
            <div>
                <RaisedButton
                    label="Exaptive"
                    onClick={this.handleToggle}
                />
                <Drawer open={this.state.open}>
                      <h1> {this.state.data && this.state.data.name} </h1>
                    <List>
                        <ListItem primaryText="Introduction" leftIcon={<ContentInfo />} />
                        <ListItem
                            primaryText="Components"
                            leftIcon={<ContentInbox />}
                            initiallyOpen={true}
                            primaryTogglesNestedList={true}
                            //render components here..don't have the the right apis yet.                            
                            // nestedItems={this.renderComponentList(this.state.xapData)}
                            nestedItems={<ComponentList />}
                            />
                        <ListItem
                            primaryText="Xaps"
                            leftIcon={<ContentInbox />}
                            initiallyOpen={true}
                            primaryTogglesNestedList={true}
                            //render xaps here..don't have the the right apis yet.
                            nestedItems={this.renderComponentList(this.state.xapData)}
                            />
                    </List>
                    <ComponentList />
                </Drawer>
            </div>
        )
    }

}

export default Display