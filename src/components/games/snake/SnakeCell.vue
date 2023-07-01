<script setup>
const props = defineProps({
    cell: {
        type: Number,
        required: true,
    }
})
</script>

<template>
    <div class="snake__cell"
        :class="[{head: cell === 2}, {tail: cell === 1}, {food: cell === -1}]"
    >
    </div>
</template>

<style lang="scss" >
.snake__cell {
    width: 25px;
    height: 25px;
    background-color: #aad751;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    &::after {
        transition: .2s scale;
        content: "";
        background: url('@/assets/images/snake/food.svg') 0 0 no-repeat;
        background-size: 40px;
        background-position: center;
        height: 100%;
        width: 100%;
        display: block;
        scale: 0;
    }
    &:nth-child(2n) {
        background: #a2d149;
    }
    &.head {
        background-color: #7296f8;
        position: relative;
        z-index: 2;
    }
    &.tail {
        background-color: #426fe3;
        position: relative;
        z-index: 1;
    }
    &.food {
        &::after {
            scale: 1;
        }
    }

}
</style>