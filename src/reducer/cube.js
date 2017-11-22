// 添加新cube元素
const INIT_CUBES = "INIT_CUBES"
const ADD_CUBE = "ADD_CUBE"
// 处理合并的元素

export const initCubes = (cubes = []) => {
    return {
        type: INIT_CUBES,
        cubes
    }
}

export const addCube = (cube) => {
    return {
        type: ADD_CUBE,
        cube
    }
}

export default (state, action) => {
    if (!state) {
        state = {
            cubes: []
        }
    }

    switch (action.type) {
        case INIT_CUBES:
            return {
                cubes: [...action.cubes]
            }
        case ADD_CUBE:
            return {
                cubes: [...state.cubes, action.cube]
            }
        default:
            return state;
    }
};