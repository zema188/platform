<script setup>
import { RouterLink } from 'vue-router';
import TheButton from '../UI/TheButton.vue';
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

const signOut = () => {
    authStore.signOutUser()
}
</script>

<template>
    <header class="">
        <router-link
            :class="'logo'"
            to="/">
            Platform
        </router-link>
        <nav class="nav" v-if="false">
            <router-link
                to="/notes">
                Заметки
            </router-link>
        </nav>
        <the-button
        :disabled="true"
        @click="signOut"
        >
            Выйти
        </the-button>
    </header>
</template>

<style lang="scss">
    header {
        padding: 50px 15px 50px;
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    }
    .logo {
        font-family: "Rubik";
        font-weight: 600;
        font-size: 39.0611px;
        line-height: 110%;
        text-transform: uppercase;
        color: #323232;
    }
    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        & a {
            font-weight: 500;
            font-size: 20px;
            line-height: 24px;
            color: #323232;
            &:hover {
                &::before {
                    opacity: 1;
                }
            }
            &::before {
                content: "/";
                font-weight: bold;
                font-size: 20px;
                line-height: 24px;
                color: #0077FD;
                opacity: 0;
                transition: 0.2s;
            }
        }
    }
</style>