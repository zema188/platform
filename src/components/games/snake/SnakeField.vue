<script setup>
import SnakeCell from './SnakeCell.vue';
const props = defineProps({
    gameField: {
        type: Array,
        required: true,
    }
})
</script>

<template>
    <div class="snake__field">
        <snake-cell
            v-for="(cell, index) of gameField" :cell="cell" :key="index"
        />
    </div>
</template>

<style lang="scss" scoped>
.snake__field {
    display: flex;
    flex-wrap: wrap;
    width: 302px;
    margin: 0 auto;
}
</style>