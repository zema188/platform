<script setup>
import GamesLink from './GamesLink.vue';
const props = defineProps({
    gamesList: {
        type: Array,
    }
})
</script>

<template>
    <div class="games__list">
        <games-link
        v-for="(test, index) in gamesList" :key="index" :gamesInfo="test"
        />
    </div>
</template>

<style lang="scss" scoped>

</style>