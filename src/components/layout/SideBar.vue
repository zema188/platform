<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js'
import { useUser } from '@/stores/user';
import ProfilePic from './ProfilePic.vue';

const user = useUser()


</script>

<template>
    <nav class="nav" v-if="user.userIsLoggedIn">
        <router-link
            to="/schedule">
            Моя страница
        </router-link>
        <router-link
            to="/schedule">
            Расписание
        </router-link>
        <router-link
            to="/chats">
            Сообщения
        </router-link>
        <router-link
            to="/freinds">
            Друзья
        </router-link>
        <router-link
            to="/games">
            Игры
        </router-link>
        <!-- <router-link
            to="/weather">
            Погода
        </router-link>
        <router-link
            to="/games">
            Игры
        </router-link> -->
    </nav>
</template>

<style lang="scss">
    .nav {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding-top: 6px;
        & a {
            font-weight: 500;
            font-size: 20px;
            line-height: 24px;
            color: #323232;
        }
    }
</style>