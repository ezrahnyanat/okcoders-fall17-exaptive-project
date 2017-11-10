import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import Introduction from './Introduction.js'
import ExaptiveComponents from './ExaptiveComponents.js'
import Xaps from './Xaps.js'
import { Link } from 'react-router-dom'


class Display extends Component {

    constructor(props){
        super(props)

        this.state = {open: false}
    }

    handleToggle = () => this.setState({open: !this.state.open})

    handleClose = () => this.setState({open: false})

    render () {
        return (
            <div>
                <RaisedButton
                    label="Exaptive"
                    onClick={this.handleToggle}
                />
                <Drawer 
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                    >
                    <MenuItem>Introduction</MenuItem>
                    <MenuItem><Link to = "./ExaptiveComponents">Components</Link></MenuItem>
                    <MenuItem><Link to = "./Xaps">Xaps</Link></MenuItem>
                </Drawer>
            </div>
        )
    }

}



export default Display