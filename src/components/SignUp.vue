<script setup>
import TheInput from '@/components/UI/TheInput.vue';
import TheButton from './UI/TheButton.vue';
import CloseCross from './UI/CloseCross.vue';
import TheLoader from './UI/TheLoader.vue'

import { RouterLink } from 'vue-router'

import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.js'

let login = ref('artem.zimin02@gmail.com')
let password = ref('123123')
let firstName = ref('Артем')

const authStore = useAuthStore()
const signUp = async () => {
    await authStore.signUp(login.value, password.value, firstName.value)
}
</script>

<template>
    <div class="registration">
        <h2>
            Регистрация
        </h2>
        <div v-if="authStore.error" class="welcome__error">
            <span>
                {{ authStore.error }}
            </span>
            <CloseCross
                @click="authStore.error = false"
            />
        </div>
        <span class="subtitle">
            Ваш e-mail
        </span>
        <TheInput class=""
            :modelValue="login"    
            :placeHolder="'e-mail'"
            v-model="login"
            @update:modelValue="(newValue) => {(login=newValue)}"
            @keydown.enter="signUp()"
        />
        <span class="subtitle">
            Ваш пароль
        </span>
        <TheInput
            :modelValue="password"    
            :placeHolder="'Пароль'"
            v-model="password"
            @update:modelValue="(newValue) => {(password=newValue)}"
            @keydown.enter="signUp()"
        />
        <span class="subtitle">
            Ваше имя
        </span>
        <TheInput
            :modelValue="firstName"    
            :placeHolder="'Имя'"
            v-model="firstName"
            @update:modelValue="(newValue) => {(firstName=newValue)}"
            @keydown.enter="signUp()"
        />
        <div class="welcome__action" v-if="!authStore.loader">
            <TheButton class="auth-btn"
                @click="() => signUp()">
                Зарегистрироваться
            </TheButton>
            <div class="welcome__lead">
                Уже зарегистрированы ? 
                <router-link
                    to="/login">
                    Войти
                </router-link>
            </div>
        </div>
        <TheLoader
            class="welcome__loader"
            v-if="authStore.loader"
        />
    </div>
</template>


<style lang="scss" >
.registration {

    &__subtitle {

    }
}

.auth-btn.button {
    margin-top: 20px;
    width: 100%;
}
</style>