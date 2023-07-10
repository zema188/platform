<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js'
import { useUser } from '@/stores/user';
import ProfilePic from './ProfilePic.vue';
import { ref } from 'vue';
import TheNotification from '@/components/Notification/TheNotification.vue';

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
            <div class="header__action">
                <div class="header__notification-btn">
                    <font-awesome-icon :icon="['', 'bell']" style="color: #56b9d2;" />
                    <the-notification/>
                </div>
                <div class="header__profile">
                    <div class="header__profile-pic profile-pic"
                            @click="profileHeaderIsActive = !profileHeaderIsActive"
                    >
                        <profile-pic/>
                    </div>
                    <span>
                        {{ user.userInfo.first_name }}
                    </span>
                    <div 
                        :class="['header__profile-action', 'block', {'active': !profileHeaderIsActive}]"
                        @click="profileHeaderIsActive = !profileHeaderIsActive"
                    >
                    <router-link
                        :class="['header__profile-link']"
                        to="/me">
                        <font-awesome-icon :icon="['fasl', 'gear']" />
                        Настройки
                    </router-link>
                    <router-link
                        :class="['header__profile-link']"
                        disabled="disabled"
                        aria-disabled="true"
                        to="/me">
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
    }
    .header {
        padding: 5px 15px;
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
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        &__profile-pic {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            font-size: 15px;
            font-weight: 500;
            align-items: center;
            width: 50px;
            height: 50px;
            text-align: center;
        }
        &__profile-action {
            position: absolute;
            display: none;
            right: 0;
            top: calc(100% + 20px);
            background: #fff;
            &.active {
                display: block;
            }
        }
        &__notification-btn {
            cursor: pointer;
            position: relative;
            & svg {
                width: 25px;
                height: 25px;
            }
        }
        &__action {
            display: flex;
            gap: 20px;
            align-items: center;
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

</style>