import React from 'react'
import PropTypes from 'prop-types'

class Cube extends React.Component {

    static propTypes = {
        rowIndex: PropTypes.number,
        colIndex: PropTypes.number,
        value: PropTypes.number,
        cubeStyle: PropTypes.object
    }

    render() {
        const {value,rowIndex,colIndex,cubeStyle} = this.props
        
        return (
            <div style={cubeStyle} className={"grid-cell grid-cell-" + rowIndex + "-" + colIndex}  >{value}</div>
        )
    }

}

export default Cube;