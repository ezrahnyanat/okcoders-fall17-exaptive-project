import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import Introduction from './Introduction.js'
import ExaptiveComponents from './ExaptiveComponents.js'
import Xaps from './Xaps.js'
import { Route, Switch, Link } from 'react-router-dom'


class Display extends Component {

    constructor(props){
        super(props)

        this.state = {open: true}
    }

    handleToggle = () => this.setState({open: !this.state.open})

    render () {
        return (
            <div>
                <RaisedButton
                    label="Exaptive"
                    onClick={this.handleToggle}
                />
                <Drawer open={this.state.open}>
                    <MenuItem><Link to = "./Introduction">Introduction</Link></MenuItem>
                    <MenuItem><Link to = "./ExaptiveComponents">Components</Link></MenuItem>
                    <MenuItem><Link to = "./Xaps">Xaps</Link></MenuItem>
                </Drawer>
                
                <Switch>
                    <Route exact path="/Introduction/" component={Introduction} />
                    <Route exact path="/ExaptiveComponents" component={ExaptiveComponents} />
                    <Route exact path="/Xaps" component={Xaps} />
                </Switch>
            </div>
        )
    }

}



export default Display