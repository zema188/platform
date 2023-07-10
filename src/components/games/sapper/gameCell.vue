<template>
    <div class="cell border_left-top"
    :class="{ hidden: !this.state, show: this.number == -1 && this.gameState.gameEnd,
            currentBomb: this.id == this.gameState.currentBombId, clicked : isClicking,
            [`number_${this.number}`]: true, tagBomb: this.tags == 1 && !this.gameState.gameEnd,
            tagCross: this.tags == 2 && !this.gameState.gameEnd}"
    @contextmenu.prevent="tagBomg()"
    @click="open($event)"
    v-on:mouseover="mouseDownCell($event)"
    v-on:mouseout="this.isClicking = false"
    v-on:mousedown="mouseDownCell($event)"
    v-on:mouseup="open($event)"
    >
        {{number}}
    </div>
</template>

<script>
    export default {
        name: 'gameCell',
        props: {
            number: {
                type: Number,
            },
            id: {
                type: Number,
            },
            state: {
                type: Boolean,
            },
            gameState: {
                type: Object
            },
        },
        data() {
            return {
                isClicking: false,
                tags:0
            }
        },
        methods: {
            mouseDownCell(event) {
                if (event.buttons === 1 && this.tags == 0) {
                    this.isClicking = true
                }
            },
            tagBomg() {
                if(!this.state && this.gameState.gameStart) {
                    if(this.tags == 2) {
                        this.tags = 0
                    } else 
                        this.tags++
                    switch (this.tags) {
                        case 0:
                            this.$emit('tagBomb',0)
                            break;
                        case 1:
                            this.$emit('tagBomb',1)
                            break;
                        case 2:
                            this.$emit('tagBomb',-1)
                            break;
                    }
                }
            },
            open(event) {
                if(this.tags == 0 && !this.gameState.gameOver && event.button === 0) {
                    this.$emit('open', this.number,this.id)
                }
                if(this.number == 0 && event.button === 0) {
                    this.$emit('openAround', this.id)
                }
            }
        },
        watch: {
            state() {
                if(this.state && this.number == 0) {
                    this.$emit('openAround', this.id)
                }
            },
            gameState: {
                    handler() {
                        if(this.gameState.gameReset) {
                            this.tags = 0
                        }
                        if(this.gameState.gameOver) {
                            if(this.number == -1) {
                                true
                            }
                        }
                },
                deep: true,
            }
        }
    }
</script>

<style lang="scss" scoped>
.cell {
    user-select: none;
    background: #bdbdbd;
    border: 1px solid #7b7b7b;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 25px;
    height: 25px;
    cursor: pointer;
    transition: .2s;
    position: relative;
    max-width: 25px;
    font-weight: 700;
    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    &:hover {
    }
    &.hidden {
        user-select: auto;
        background: #bdbdbd;
        border-top: 2.5px solid #fff;
        border-left: 2.5px solid #fff;
        border-bottom: 2.5px solid #7b7b7b;
        border-right: 2.5px solid #7b7b7b;
        &.clicked {
            border: none;
            &::after {
            }
        }
        &::after {
            background: #bdbdbd;
        }
    }
    &.show {
        &::after {
            background: url('@/assets/icons/bomb.svg');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }
        &.currentBomb {
            &::after {
                background: url('@/assets/icons/bomb.svg'), #ff0202;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }
        }
    }
    &.tagBomb {
        &::after {
            background: url('@/assets/icons/flag.svg'), #c6c4c4;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }
    }
    &.tagCross {
        &::after {
            background: url('@/assets/icons/cross.svg'), #c6c4c4;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }
    }
}
.number{
    &::after {
    }
    &_-1 {
        &::after {
            background: url('@/assets/icons/bomb.svg'), #c6c4c4;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }
    }
    &_0 {
        &::after {
            background:#c6c4c4;
        }    
    }
    &_1 {
        color: #1815e2;
    }
    &_2 {
        color: #098036;
    }
    &_3 {
        color: #c92508;
    }
    &_4 {
        color: #fd00f1;
    }
}
</style>