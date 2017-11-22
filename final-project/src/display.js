import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import {List, ListItem,makeSelectable} from 'material-ui/List';
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
let SelectableList = makeSelectable(List);

class Display extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            selectedIndex: 0

        };
        console.log("I am in display constructor.");
        console.log(props.xapsBase);
    }


    handleToggle = () => this.setState({open: !this.state.open});

    

    handleRequestChange (event, index) {
        console.log("Selected index is: ",index);
    this.setState({
        selectedIndex: index
    })
    }

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
          return (
                <ListItem
                  primaryText={ <Link to={to}> {parsed.uuid} </Link> }
                  value={parsed.uuid}
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
                <Drawer 
                    docked={false}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                    >
                      <h1> {this.state.data && this.state.data.name} </h1>
                    <SelectableList value={this.state.selectedIndex} onChange={this.handleRequestChange.bind(this)}>
                        <ListItem value={0}
                            primaryText = {<Link to="/Introduction"> Introduction </Link>}
                            leftIcon={<ContentInfo />} />
                        <ListItem
                            primaryText = {<Link to="/ExaptiveComponents"> Components </Link>}
                            value={1}
                            leftIcon={<ContentInbox />}
                            initiallyOpen={true}
                            primaryTogglesNestedList={true}
                            //render components here..don't have the the right apis yet.                            
                            nestedItems={this.renderComponentList(this.state.xapData)}
                            />
                        <ListItem
                            primaryText = {<Link to="/Xaps"> Xaps </Link>}
                            value={2}
                            leftIcon={<ContentInbox />}
                            initiallyOpen={true}
                            primaryTogglesNestedList={true}
                            //render xaps here..don't have the the right apis yet.
                            nestedItems={this.renderComponentList(this.state.xapData)}
                            />
                    </SelectableList>
                </Drawer>
            </div>
        )
    }

}

export default Display
