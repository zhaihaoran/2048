import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {initBoard,moveBottom,moveLeft,moveRight,moveTop} from '../reducer/game'
import {addCube,initCubes} from '../reducer/cube'

import util from '../util/board'

import "../css/board.scss"

import Cube from '../container/cube'

class Board extends React.Component {

    static propTypes = {
        board: PropTypes.array,
        cubes: PropTypes.array,
        addBoard: PropTypes.func,
        moveTop: PropTypes.func,
        moveBottom: PropTypes.func,
        moveRight: PropTypes.func,
        moveLeft: PropTypes.func,
    }

    // render 后
    componentWillMount(){

        const {initBoard,moveLeft,moveRight,moveBottom,moveTop,board,initCubes,addCube,updateCubes} = this.props

        initBoard()
        initCubes()
        this.generateCubes(board, 2)

        document.addEventListener('keydown',(e)=>{
            
            switch(e.keyCode) {
                case 37:
                    moveLeft(board)
                    this.generateCubes(board, 2)
                    console.log(board)
                    break;
                case 39:
                    moveRight(board)
                    this.generateCubes(board, 2)
                    console.log(board)
                    break;
                case 38:
                    moveTop(board)
                    this.generateCubes(board, 2)
                    console.log(board)
                    break;
                case 40:
                    moveBottom(board)
                    this.generateCubes(board, 2)
                    console.log(board)
                    break;
                default:
                    break;
            }
            
        })
    }
  
    // 随机生成cube
    generateCubes(board,num) {
        const matrix = board.slice(0)

        while (num > 0) {
            if (util.noSpace(matrix)) {
                return false;
            }
            // 产生随机数0,1,2,3
            var randx = util.getRandomNumber(0, 4)
            var randy = util.getRandomNumber(0, 4)
            var status = true;

            // 生成一个正确的位置
            while (status) {
                if (matrix[randx][randy] < 1) {
                    status = false;
                    break;
                }
                randx = util.getRandomNumber(0, 4)
                randy = util.getRandomNumber(0, 4)
            }
            const value = Math.random() < 0.4 ? 2 : 4

            this.props.addCube(randx,randy,value)
            matrix[randx][randy] = value

            num--;
        }

        this.props.updateBoard(matrix)

        return true
    }

    render() {
        const {board,cubes} = this.props
        console.log(cubes,board)
        return (
            <div className="grid-container">
                {
                    // 这是棋盘
                    board.map((rowAry, rowIndex) => rowAry.map((cellValue, colIndex) => 
                        <Cube key={rowIndex+"-"+colIndex+'-board' } value={cellValue} rowIndex={rowIndex} colIndex={colIndex} />
                    ))
                }
                {/* 这边是动态生成的cube存放的地方 */}
                {/* <div className="grid-cube">
                    {
                        cubes.map((cell,i)=> {
                            const style = {
                                top: 20 + cell.x * 120 + 'px',
                                left: 20 + cell.y * 120 + 'px'
                            }
                            return (
                                // <div style={cubeStyle} className={"grid-cell grid-cell-" + cell.x + "-" + cell.y}  >{value}</div>
                                <Cube cubeStyle={style} key={cell.x+"-"+cell.y+'-cube' } value={cell.value} />
                            )
                        })
                    }
                </div> */}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        board: state.game.board,
        cubes: state.cube.cubes
    }
}

const dispatchToProps = (dispatch) => {
    return {

        initBoard:()=> {
            const board = util.createBoard(0)
            dispatch(initBoard(board))
        },
        updateBoard: (matrix) => {
            dispatch(initBoard(matrix))
        },

        moveLeft:(board)=> {
            // 怎么处理board
            if(util.canMoveLeft(board)) {
                const newBoard = util.moveLeft(board)
                dispatch(moveLeft(newBoard))
            }
        },

        moveRight:(board)=> {
            if (util.canMoveRight(board)) {
                const newBoard = util.moveRight(board)
                dispatch(moveRight(newBoard))
            }
        },

        moveTop:(board)=> {
            if (util.canMoveTop(board)) {
                const newBoard = util.moveTop(board)
                dispatch(moveTop(newBoard))
            }
        },

        moveBottom:(board)=> {
            if (util.canMoveBottom(board)) {
                const newBoard = util.moveBottom(board)
                dispatch(moveBottom(newBoard))
            }
        },

        initCubes() {
            var cubes = [];
            dispatch(initCubes(cubes))
        },

        addCube(x, y, value) {
            const cube = {x,y,value}
            dispatch(addCube(cube))
        },

        updateCubes(cubes) {
            dispatch(initCubes(cubes))
        }

    }
}

export default connect(
    mapStateToProps,
    dispatchToProps
)(Board)