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
        :class="[{head: cell === 1}]"
    >
    </div>
</template>

<style lang="scss" >
.snake__cell {
    width: 15px;
    height: 15px;
    background: #969696;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    position: relative;
    &.head {
        background: red;
        &::after {
            background: red;
            width: 100%;
        }
    }
    &.tail {
        background: rgb(233, 144, 144);
        &::after {
            background: rgb(238, 142, 142);
            width: 100%;
        }
    }
    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        transition: 0.35s width linear;
        width: 0%;
        display: none;
    }
}
</style>