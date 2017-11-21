const util = {
    // 创建二维数组
    createBoard: (value) => {
        return Array.from({
            length: 4
        }, row => Array.from({
            length: 4
        }, cell => value))
    },
    // 洗牌
    shuffle: (array) => {
        const endIndex = array.length - 2;
        // i = startIndex  j = randomIndex
        for (let i = 0; i < endIndex; i++) {
            const j = i + Math.floor(Math.random() * (array.length - i));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },
    // 生成随机数
    getRandomNumber(start, end) {
        return parseInt(Math.floor(start + Math.random() * (end - start)), 10)
    },
    // 判断棋盘是否占满,如果值不为0则表示占用
    // forEach 无法跳出！别用
    noSpace(matrix) {
        for (let i = 0; i < 4; i++) {
            if (matrix[i].indexOf(0) > -1) {
                return false;
            }
        }
        return true
    },
    // 判断游戏是否结束
    isGameOver(matrix) {

    },

    canMoveLeft(matrix) {
        // 只考虑第2到4列
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (matrix[i][j] !== 0) {
                    // 左侧为0或相同数字
                    if (matrix[i][j - 1] === 0 || matrix[i][j - 1] === matrix[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    canMoveTop(matrix) {
        // 只考虑第2到4行
        for (let j = 0; j < 4; j++) {
            for (let i = 1; i < 4; i++) {
                if (matrix[i][j] !== 0) {
                    // 左侧为0或相同数字
                    if (matrix[i - 1][j] === 0 || matrix[i - 1][j] === matrix[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    canMoveBottom(matrix) {
        // 只考虑第1到3行
        for (let j = 0; j < 4; j++) {
            for (let i = 2; i >= 0; i--) {
                if (matrix[i][j] !== 0) {
                    // 左侧为0或相同数字
                    if (matrix[i + 1][j] === 0 || matrix[i + 1][j] === matrix[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    canMoveRight(matrix) {
        // 只考虑第0到2列,2,1,0
        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                if (matrix[i][j] !== 0) {
                    // 左侧为0或相同数字
                    if (matrix[i][j + 1] === 0 || matrix[i][j + 1] === matrix[i][j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    moveLeft(matrix) {
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (matrix[i][j] !== 0) {
                    // 遍历可能的落脚点
                    for (var k = 0; k < j; k++) {
                        if (matrix[i][k] === 0 && this.noBlockHorizontal(i, k, j, matrix)) {
                            // 左侧无值的情况
                            // move
                            matrix[i][k] = matrix[i][j]
                            matrix[i][j] = 0
                            continue;
                        } else if (matrix[i][k] === matrix[i][j] && this.noBlockHorizontal(i, k, j, matrix)) {
                            //左侧有值且相等的情况 
                            // move
                            matrix[i][k] += matrix[i][j]
                            matrix[i][j] = 0
                            // add
                            continue;
                        }
                    }

                }
            }
        }
        return matrix;
    },

    moveTop(matrix) {
        for (let j = 0; j < 4; j++) {
            for (let i = 1; i < 4; i++) {
                if (matrix[i][j] !== 0) {
                    // 遍历可能的落脚点
                    for (var k = 0; k < i; k++) {
                        if (matrix[k][j] === 0 && this.noBlockVertical(j, k, i, matrix)) {

                            matrix[k][j] = matrix[i][j]
                            matrix[i][j] = 0
                            continue;
                        } else if (matrix[k][j] === matrix[i][j] && this.noBlockVertical(j, k, i, matrix)) {

                            matrix[k][j] += matrix[i][j]
                            matrix[i][j] = 0
                            // add
                            continue;
                        }
                    }

                }
            }
        }
        return matrix;
    },

    moveRight(matrix) {
        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                if (matrix[i][j] !== 0) {
                    for (let k = 3; k > j; k--) {
                        if (matrix[i][k] === 0 && this.noBlockHorizontal(i, j, k, matrix)) {
                            // 右侧无值的情况
                            // move
                            matrix[i][k] = matrix[i][j]
                            matrix[i][j] = 0
                            continue;
                        } else if (matrix[i][k] === matrix[i][j] && this.noBlockHorizontal(i, j, k, matrix)) {
                            //左侧有值且相等的情况 
                            // move
                            matrix[i][k] += matrix[i][j]
                            matrix[i][j] = 0
                            // add
                            continue;
                        }
                    }
                }
            }
        }
        return matrix;
    },

    moveBottom(matrix) {
        for (let j = 0; j < 4; j++) {
            for (let i = 2; i >= 0; i--) {
                if (matrix[i][j] !== 0) {
                    // 遍历可能的落脚点
                    for (var k = 3; k > i; k--) {
                        if (matrix[k][j] === 0 && this.noBlockVertical(j, i, k, matrix)) {
                            // 右侧无值的情况
                            // move
                            matrix[k][j] = matrix[i][j]
                            matrix[i][j] = 0
                            continue;
                        } else if (matrix[k][j] === matrix[i][j] && this.noBlockVertical(j, i, k, matrix)) {
                            //左侧有值且相等的情况 
                            // move
                            matrix[k][j] += matrix[i][j]
                            matrix[i][j] = 0
                            // add
                            continue;
                        }
                    }

                }
            }
        }
        return matrix;
    },

    noBlockHorizontal(row, col1, col2, matrix) {
        for (let i = col1 + 1; i < col2; i++) {
            if (matrix[row][i] !== 0) {
                // 有障碍物
                return false;
            }
        }
        return true;
    },

    noBlockVertical(col, row1, row2, matrix) {
        for (let i = row1 + 1; i < row2; i++) {
            if (matrix[i][col] !== 0) {
                return false;
            }
        }
        return true;
    }
}

export default util;