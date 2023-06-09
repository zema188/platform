<script setup>
import { RouterLink } from 'vue-router';
import TheButton from '../UI/TheButton.vue';
import { useAuthStore } from '@/stores/auth.js'
import { useUser } from '@/stores/user';


const user = useUser()

const authStore = useAuthStore()

const signOut = () => {
    authStore.signOutUser()
}
</script>

<template>
    <div class="header-w">
        <header class="">
            <router-link
                :class="'logo'"
                to="/">
                Platform
            </router-link>
            <nav class="nav" v-if="user.userIsLoggedIn">
                <router-link
                    to="/schedule">
                    Расписание
                </router-link>
                <router-link
                    to="/weather">
                    Погода
                </router-link>
                <router-link
                    to="/games">
                    Игры
                </router-link>
            </nav>
            <the-button
            :disabled="true"
            @click="signOut"
            >
                Выйти
            </the-button>
        </header>
    </div>
</template>

<style lang="scss">
    .header-w {
        border-bottom: 1px solid #969696;
        margin-bottom: 30px;
    }
    header {
        padding: 20px 15px 20px;
        max-width: 1430px;
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