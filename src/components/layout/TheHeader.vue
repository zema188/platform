<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js'
import { useUser } from '@/stores/user';
import ProfilePic from './ProfilePic.vue';
import { ref } from 'vue';

const user = useUser()
const authStore = useAuthStore()
const profileHeaderIsActive = ref('false')

const signOut = () => {
    authStore.signOutUser()
}
</script>

<template>
    <div class="header-w">
        <header class="header">
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
            <div class="header__profile">
                <div class="header__profile-pic profile-pic"
                    @click="profileHeaderIsActive = !profileHeaderIsActive"
                    >
                    <profile-pic/>
                    {{ user.userInfo.first_name }}
                </div>
                <div 
                    :class="['header__profile-action', 'block', {'active': !profileHeaderIsActive}]"
                >
                <router-link
                    :class="['header__profile-link']"
                    to="/profile">
                    <font-awesome-icon :icon="['fasl', 'gear']" />
                    Настройки
                </router-link>
                <router-link
                    :class="['header__profile-link']"
                    disabled="disabled"
                    aria-disabled="true"
                    to="/profile">
                    <font-awesome-icon :icon="['fas', 'palette']" />
                    Тема
                </router-link>
                <div
                    :class="['header__profile-link']"
                    :disabled="true"
                    @click="signOut"
                    >
                    <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
                    Выйти
                </div>
                </div>
            </div>
        </header>
    </div>
</template>

<style lang="scss">
    .header-w {
        margin-bottom: 30px;
        background: var(--var-header-bg);
        box-shadow: 0 4px 4px rgba(41,41,41,.08);
        backdrop-filter: blur(2px);
        z-index: 5;
        position: sticky;
        top: 0;
    }
    .header {
        padding: 20px 15px 20px;
        max-width: 1430px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        &__profile-link {
            display: flex;
            gap: 9px;
            align-items: center;
            cursor: pointer;
            &:not(:last-child) {
                margin-bottom: 10px;
            }
        }
        &__profile {
            position: relative;
        }
        &__profile-pic {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            font-size: 15px;
            font-weight: 500;
            align-items: center;
        }
        &__profile-action {
            position: absolute;
            display: none;
            right: 0;
            top: 100%;
            &.active {
                display: block;
            }
        }
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