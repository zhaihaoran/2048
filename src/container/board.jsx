import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {initBoard,updateBoard,moveBottom,moveLeft,moveRight,moveTop} from '../reducer/game'

import util from '../util/board'

import "../css/board.css"

import Cube from '../component/cube'

class Board extends React.Component {

    static propTypes = {
        board: PropTypes.array,
        moveTop: PropTypes.func,
        moveBottom: PropTypes.func,
        moveRight: PropTypes.func,
        moveLeft: PropTypes.func,
    }

    // render 后
    componentDidMount(){

        const board = util.createBoard(0)
        this.props.initBoard(board)

        // 在随机的格子里生成数字
        this.generateOneNumber();
        this.generateOneNumber();
        console.log(this.props)

        document.addEventListener('keydown',(e)=>{
            
            switch(e.keyCode) {
                case 37:
                    this.props.moveLeft(this.props.board)
                    this.generateOneNumber();
                    this.generateOneNumber();
                    break;
                case 39:
                    this.props.moveRight(this.props.board)
                    this.generateOneNumber();
                    this.generateOneNumber();
                    break;
                case 38:
                    this.props.moveTop(this.props.board)
                    this.generateOneNumber();
                    this.generateOneNumber();
                    break;
                case 40:
                    this.props.moveBottom(this.props.board)
                    this.generateOneNumber();
                    this.generateOneNumber();
                    break;
                default:
                    break;
            }
            
        })
    }

    handleMoveLeft(data){
        console.log(data)
        this.props.moveLeft()
    }
  

    // 随机在棋盘处生成一个合理的位置
    generateOneNumber() {
        // 判断是否填满
        const matrix = this.props.board;
        if (util.noSpace(matrix)) {
            return false;
        }
        // 产生随机数0,1,2,3
        var randx = util.getRandomNumber(0, 4)
        var randy = util.getRandomNumber(0, 4)
        var status = true;

        // 生成一个正确的位置
        while (status) {
            if (this.props.board[randx][randy] < 1) {
                status = false;
                break;
            }
            randx = util.getRandomNumber(0, 4)
            randy = util.getRandomNumber(0, 4)
        }
        // 40%概率生成4,60%概率生成2
        var randNumber = Math.random() < 0.4 ? 2 : 4
        
        this.props.board[randx][randy] = randNumber

        this.props.updateBoard(this.props.board)
        // 太TM恶心了，必须得新建一个数组然后复制才行.....

        return true;
    }

    render() {
        return (
            <div className="grid-container">
                {
                    this.props.board.map((rowAry, rowIndex) => rowAry.map((cellValue, colIndex) => <Cube key={rowIndex+"-"+colIndex } value={cellValue} rowIndex={rowIndex} colIndex={colIndex} />))
                }
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        board: state.board
    }
}

const dispatchToProps = (dispatch) => {
    return {
        initBoard:(board)=> {
            dispatch(initBoard(board))
        },
        updateBoard:(board)=> {
            dispatch(updateBoard(board))
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
    }
}

export default connect(
    mapStateToProps,
    dispatchToProps
)(Board)