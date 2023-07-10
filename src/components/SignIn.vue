<script setup>
import TheInput from '@/components/UI/TheInput.vue';
import TheButton from './UI/TheButton.vue';
import CloseCross from './UI/CloseCross.vue';
import TheLoader from './UI/TheLoader.vue'

import { RouterLink } from 'vue-router'
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.js'

const authStore = useAuthStore()
const signIn = async () => {
    await authStore.signIn(login.value, password.value)
}
let login = ref('artem.zimin02@gmail.com')
let password = ref('123123')

function toggleDisabledAuthBtn() {
    if(login.value.length && password.value.length)
        return false
    return true
}
</script>

<template>
    <div class="login">
        <h2>
            Авторизация
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
            :placeHolder="'Логин'"
            v-model="login"
            @update:modelValue="(newValue) => {(login=newValue)}"
            @keydown.enter="signIn()"
        />
        <span class="subtitle">
            Ваш пароль
        </span>
        <TheInput
            :modelValue="password"    
            :placeHolder="'Пароль'"
            v-model="password"
            @update:modelValue="(newValue) => {(password=newValue)}"
            @keydown.enter="signIn()"
            :type="'password'"
        />
        <div class="welcome__action" v-if="!authStore.loader">
            <TheButton class="auth-btn"
                @click="signIn"
                :disabled="toggleDisabledAuthBtn()"
            >
                войти
            </TheButton>
            <div class="welcome__lead">
                Еще не зарегистрированы ?
                <router-link
                    to="/signup">
                    Зарегистрироваться
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
.login {

    &__subtitle {

    }
}

</style>