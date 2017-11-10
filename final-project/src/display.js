import React, { Component } from 'react';
import Introduction from './Introduction.js'
import ExaptiveComponents from './ExaptiveComponents.js'
import Xaps from './Xaps.js'


class Display extends Component {


    render () {
        return (
            <div>
                <Introduction />
                <ExaptiveComponents />
                <Xaps />
            </div>
        )
    }

}



export default Display