<script setup>
import { onMounted, watch, ref } from 'vue';
import SnakeBodyCell from './SnakeBodyCell.vue';
const props = defineProps({
    gameField: {
        type: Array,
        required: true,
    }
})


let snakeBody = ref([])

function animSnake() {
    snakeBody.value.length = []
    for(let i = 0; i < 15; i++) {
        for(let j = 0; j < 15; j++) {
            if(props.gameField[i][j] !== 0 && props.gameField[i][j] !== -1) {
                snakeBody.value.push({
                    x: j,
                    y: i,
                    value: props.gameField[i][j]
                })
            }
        }
    }
    console.log(snakeBody)
}
watch(
  () => props.gameField,
  () => {
    animSnake()
  },
  { deep: true }
);

</script>

<template>
    <div class="test">
        <snake-body-cell
            v-for="(cell,index) of snakeBody" :key="index" :cell="cell"
        />
    </div>
</template>



<style lang="scss" >

</style>