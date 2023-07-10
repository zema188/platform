<template>
    <div class="container">
        <div class="text-message"
        v-show="this.gameState.gameEnd"
        >
            {{ this.textMessageAfterGame }}
        </div>
        <div class="field-w">
            <div class="field__content border_left-top">
                <div class="field__header border_right-bottom">
                    <div class="field__header-bombs">
                            {{ gameParams.bombs - gameState.flagsPlaced }}
                    </div>
                    <div class="field__header-reset">
                        <img class="smile-reset" alt="smile-icon"
                        :src="smilePath"
                        @click="resetGame()"
                        >
                    </div>
                    <div class="field__header-timer">
                            {{ this.gameState.timer }}
                    </div>
                </div>
                <div class="field border_right-bottom"
                :style="{ width: this.widthField + 'px' }"
                :class="{field_game_end : this.gameState.gameEnd}"
                >
                    <gameCellVue
                    v-for="(item, index) in cells.flat()" :key="index"
                    :number="item"
                    :id="index"
                    :gameState="gameState"
                    :state="isRevealed.flat()[index]"
                    @open="open"
                    @openAround="openAround"
                    @tagBomb="tagBomb"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gameCellVue from '@/components/games/sapper/gameCell.vue'

import smile from '@/assets/images/sapper/smile.svg';
import smileDead from '@/assets/images/sapper/smile_dead.svg';
import smileWon from '@/assets/images/sapper/smile_won.svg';
    function getRandom(min,max) {
        return Math.floor(Math.random() * ((max)-min)) + min;
    }
    export default {
        name: 'gameField',
        components: {
            gameCellVue
        },
        props: {
            gameParams: {
                type: Object
            }
        },
        data() {
            return {
                cells: [],
                bombsCoordintate: [],
                isRevealed:[],
                widthField: null,
                gameState: {
                    gameStart: false,
                    gameOver: false,
                    gameWon: false,
                    gameReset: false,
                    gameEnd: false,
                    flagsPlaced: 0,
                    timeElapsed: 0,
                    openedCells:0,
                    timer: 0,
                    currentBombId: null,
                },
                textMessageAfterGame: '',
                smilePath: smile,
                timerId: null,
            }
        },
        methods: {
            startTimer() {
                if (!this.timerId) {
                    this.timerId = setInterval(() => {
                    this.gameState.timer++
                }, 1000);
                }
            },
            stopTimer() {
                clearInterval(this.timerId)
                this.timerId = null
            },
            createCellsArray() {
                this.cells = [];
                this.isRevealed = [],
                this.bombsCoordintate = []
                for (let i = 0; i < this.gameParams.rows; i++) {
                    this.cells[i] = []; // создаем пустой массив для текущей строки
                    this.isRevealed[i] = []; // создаем пустой массив для текущей строки
                    for (let j = 0; j < this.gameParams.cols; j++) {
                        this.cells[i][j] = 0; // заполняем массив нулями
                        this.isRevealed[i][j] = false;
                    }
                }
            },
            placingBombs() {
                let cellIsAvailable = true
                for(let i = 0; i < this.gameParams.bombs;i++) {
                    cellIsAvailable = true
                    while(cellIsAvailable) {
                        let randomRow = getRandom(0, this.gameParams.rows);
                        let randomCol = getRandom(0, this.gameParams.cols);
                        if(this.cells[randomRow][randomCol] == -1) {
                            cellIsAvailable = true
                        } else {
                            this.cells[randomRow][randomCol] = -1
                            this.bombsCoordintate.push([randomRow,randomCol])
                            cellIsAvailable = false
                        }
                    }
                }
                this.placingNumbers()
            },
            open(number,id) {
                let row = Math.floor(id / this.gameParams.cols)
                let col = id % this.gameParams.cols
                if(!this.gameState.gameStart) {
                    //click on bomb or number
                    if(number !=0 && !this.gameState.gameEnd) {
                        while(this.cells[row][col]!=0) {
                            this.createCellsArray()
                            this.placingBombs()
                        }
                    }
                    //click number = 0
                    this.reveal(row, col)
                    this.gameState.gameStart = true
                    this.gameState.gameReset = false
                }

                else  {
                    if(!this.isRevealed[row][col] && number >= 0) {
                        this.isRevealed[row][col] = !this.isRevealed[row][col]
                        this.gameState.openedCells++
                    }
                    if(number < 0) {
                        this.gameState.currentBombId = id
                        this.gameOver()
                    }
                }
            },
            gameOver() {
                this.gameState.gameOver = true,
                this.gameState.gameStart = false,
                this.gameState.gameEnd = true,
                this.stopTimer()
                this.textMessageAfterGame = 'Вы проиграли'
            },
            tagBomb(value) {
                this.gameState.flagsPlaced = this.gameState.flagsPlaced + value
                        
            },
            // Открытие ячеек на игровом поле
            reveal(row, col) {
            // Открытие текущей ячейки и ее соседних ячеек, если они пустые
            this.isRevealed[row][col] = true;
            if (this.cells[row][col] == 0) {
                for (var i = row - 1; i <= row + 1; i++) {
                for (var j = col - 1; j <= col + 1; j++) {
                    if (i >= 0 && i < this.gameParams.rows && j >= 0 && j < this.gameParams.cols && !this.isRevealed[i][j]) {
                    this.reveal(i, j);
                    this.gameState.openedCells++
                    }
                }
                }
            }
            },
            placingNumbers() {
                const dirs = [-1, 0, 1];
                for (let i = 0; i < this.gameParams.bombs; i++) {
                    const [row, col] = this.bombsCoordintate[i];
                    for (const dx of dirs) {
                    for (const dy of dirs) {
                        if (dx === 0 && dy === 0) continue; // skip the current cell
                        const newRow = row + dx;
                        const newCol = col + dy;
                        if (
                        newRow >= 0 && newRow < this.gameParams.rows &&
                        newCol >= 0 && newCol < this.gameParams.cols &&
                        this.cells[newRow][newCol] !== -1
                        ) {
                        this.cells[newRow][newCol]++;
                        }
                    }
                    }
                }
            },
            openAround(id) {
                const dirs = [-1, 0, 1];
                let row = Math.floor(id / this.gameParams.cols)
                let col = id % this.gameParams.cols
                for (const dx of dirs) {
                    for (const dy of dirs) {
                        if (dx === 0 && dy === 0) continue; // skip the current cell
                        const newRow = row + dx;
                        const newCol = col + dy;
                        if (
                        newRow >= 0 && newRow < this.gameParams.rows &&
                        newCol >= 0 && newCol < this.gameParams.cols &&
                        this.cells[newRow][newCol] !== -1
                        ) {
                            this.isRevealed[newRow][newCol] = true
                        }
                    }
                    }
            },
            resetGame() {
                this.createCellsArray()
                this.placingBombs()
                this.gameState.gameStart = false
                this.gameState.gameOver = false
                this.gameState.gameReset = true
                this.gameState.gameEnd = false,
                this.gameState.gameWon = false,
                this.gameState.openedCells = 0
                this.gameState.flagsPlaced = 0
                this.gameState.timer = 0
                this.smilePath = smile
                this.stopTimer()
            },
            startPlacing() {
                this.createCellsArray()
                this.placingBombs()
            },
            gameWon() {
                this.gameState.gameOver = false,
                this.gameState.gameStart = false,
                this.gameState.gameWon = true
                this.gameState.gameEnd = true,
                this.textMessageAfterGame = 'Вы выиграли'
                this.stopTimer()
            },
            calcWidthField() {
                this.widthField =  this.gameParams.cols * 25 + 4 
            },
        },
        watch: {
            gameState: {
                    handler() {
                        if(this.gameState.openedCells == this.cells.flat().length - this.gameParams.bombs - 1) {
                            this.gameWon()
                        }
                        if(this.gameState.gameStart) {
                            this.startTimer()
                        }
                        if(this.gameState.gameOver) {
                            this.smilePath = smileDead
                        }
                        if(this.gameState.gameWon) {
                            this.smilePath = smileWon
                        }
                },
                deep: true,
            },
            gameParams: {
                handler() {
                    this.resetGame()
                    this.startPlacing()
                    this.calcWidthField()
                },
                deep: true,
            }
        }
    }
</script>

<style lang="scss" >
.border_left-top {
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #7b7b7b;
    border-right: 2px solid #7b7b7b;
}
.border_right-bottom {
    border-top: 2px solid #7b7b7b;
    border-left: 2px solid #7b7b7b;
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
}

.field-w {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0px 0px 0px;
}
.field {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background: transparent;
        display: none;
    }
    &.field_game_end {
        &::after {
            display: block;
        }
    }
}
.field {
&__content {
    background: #bdbdbd;
    padding: 5px;
    // overflow-y: auto;
    // max-height: 100vh;
}
&__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    background: #bdbdbd;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
    position: relative;
}

&__header-reset {
    cursor: pointer;
    width: 30px;
    padding: 2px;
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #7b7b7b;
    border-right: 2px solid #7b7b7b;
    position: absolute;
    width: 26px;
    height: 26px;
    left: 50%;
    bottom: 0;
    transform: translate(-50%,0);
    & img {
        width: 100%;
    }
}
&__header-bombs {

}
&__header-timer {
}
}
.smile-reset {

}
.text-message {
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translate(-50%,0);
}

.nav-rows {
}

</style>