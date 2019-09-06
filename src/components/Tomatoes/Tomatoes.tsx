import * as React from 'react'
import { connect } from 'react-redux'
import TomatoAction from './TomatoAction'
import './Tomatoes.scss'

class Tomatoes extends React.Component {
    render() {
        return (
            <div className="Tomatoes" id="Tomatoes">
                <TomatoAction />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})
const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Tomatoes)