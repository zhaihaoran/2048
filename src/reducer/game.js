import util from "../util/board"
// action
const INIT_BOARD = "INIT_BOARD"
const MOVE_LEFT = "MOVE_LEFT"
const MOVE_RIGHT = "MOVE_RIGHT"
const MOVE_TOP = "MOVE_TOP"
const MOVE_BOTTOM = "MOVE_BOTTOM"

// action creators

// action creators

export const initBoard = (board) => {
    return {
        type: INIT_BOARD,
        board
    }
}

export const moveLeft = (board) => {
    return {
        type: MOVE_LEFT,
        board
    }
}
export const moveRight = (board) => {
    return {
        type: MOVE_RIGHT,
        board
    }
}
export const moveTop = (board) => {
    return {
        type: MOVE_TOP,
        board
    }
}
export const moveBottom = (board) => {
    return {
        type: MOVE_BOTTOM,
        board
    }
}

// reducer
export default (state, action) => {
    if (!state) {
        state = {
            board: util.createBoard(0)
        }
    }

    switch (action.type) {
        case INIT_BOARD:
            return {
                board: [...action.board]
            }
        case MOVE_LEFT:
            return {
                board: [...action.board]
            }
        case MOVE_RIGHT:
            return {
                board: [...action.board]
            }
        case MOVE_TOP:
            return {
                board: [...action.board]
            }
        case MOVE_BOTTOM:
            return {
                board: [...action.board]
            }
        default:
            return state;
    }
};