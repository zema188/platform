<script setup>
const props = defineProps({
    cell: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="snake__body-cell"
        :test="`${cell.value}`"
        :style="`left: calc(${cell.x} * 25px); top: calc(${cell.y} * 25px)`"
    
    >
    </div>
</template>



<style lang="scss" >
.snake__body-cell {
    position: absolute;
    width: 25px;
    height: 25px;
    background: red;
    z-index: 22;
    transition: .2s;
}
</style>