<script setup>
import { RouterLink } from 'vue-router';
const props = defineProps({
    gamesInfo: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <router-link :class="'games__item'"
        :to="`/${gamesInfo.link}`"
    >
    <img
        :src="gamesInfo.image">
    {{ gamesInfo.name }}
    </router-link>
</template>

<style lang="scss" scoped>
.games__item {
    display: flex;
    gap: 10px;
    align-items: center;
    & img {
        width: 50px;
        height: 50px;
        object-fit: cover;
    }
}
</style>