import React from 'react'
import PropTypes from 'prop-types'
import CubeComponent from '../component/cube'
import config from "../config.json"
// import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'

class Cube extends React.Component {

    static propTypes = {
        rowIndex: PropTypes.number,
        colIndex: PropTypes.number,
        value: PropTypes.number,
        color: PropTypes.number,
        cubeStyle: PropTypes.object,
    }

    getCubeStyle(value = 0) {
        return {
            backgroundColor: config.style[value].background,
            color: config.style[value].color 
        }
    }

    render() {
        const {value,rowIndex,colIndex,cubeStyle={}} = this.props
        const style = Object.assign(cubeStyle,this.getCubeStyle(value))

        const childrenComponent = (
            <CubeComponent cubeStyle={style} rowIndex={rowIndex} colIndex={colIndex} value={value} />
        )

        return (
            // <ReactCSSTransitionGroup
            //     transitionEnter={true}
            //     transitionLeave={true}
            //     transitionEnterTimeout={500}
            //     transitionLeaveTimeout={500}
            //     transitionName={{
            //         enter: 'fadeInUp',
            //         leave: 'fadeOut'
            //     }}
            // >
                childrenComponent
            // </ReactCSSTransitionGroup>
        )
    }

}

export default Cube;