import React from 'react'
import PropTypes from 'prop-types'
import config from "../config.json"

class Cube extends React.Component {

    static propTypes = {
        rowIndex: PropTypes.number,
        colIndex: PropTypes.number,
        value: PropTypes.number,
        color: PropTypes.number,
    }

    getPosition(rowIndex, colIndex) {
        return {
            top: 20 + rowIndex * 120 + "px",
            left: 20 + colIndex * 120+ "px"
        }
    }

    getCubeStyle(value,rowIndex,colIndex) {
        return {
            top: this.getPosition(rowIndex, colIndex).top,
            left: this.getPosition(rowIndex, colIndex).left,
            backgroundColor: config.style[value].background,
            color: config.style[value].color 
        }
    }

    render() {
        const {value,rowIndex,colIndex} = this.props
        return (
            <div style={this.getCubeStyle(value,rowIndex,colIndex)} className="grid-cell" id={"grid-cell-" + rowIndex + "-" + colIndex} >{value}</div>
        )
    }

}

export default Cube;