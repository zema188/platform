<script setup>
import GamesList from '../components/games/GamesList.vue';
const gamesList = [
    {name: 'TheSnake', link: 'games/Snake', image: 'https://im.indiatimes.in/facebook/2018/Aug/snake_game_1533210438.jpg?w=820&h=540&cc=1'},
]
</script>

<template>
    <div class="games">
        <Games-List
            :gamesList="gamesList"
        />
    </div>
</template>

<style lang="scss" scoped>

</style>