<script setup>
import ProfilePic from '../components/layout/ProfilePic.vue';
import TheButton from '../components/UI/TheButton.vue';
import TheInput from '../components/UI/TheInput.vue'
import { useUser } from '@/stores/user';
import { watch , ref } from 'vue';
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const user = useUser()
const changeDateBtn = ref(true)


const convertTime = (seconds) => {
    if(!seconds)
    return
    const dateString = seconds;
    const dateObj = new Date(dateString);

    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const day = dateObj.getDate();

    return(`${day} ${month} ${year} `)
}

const oldUserInfo = ref({
    first_name: user.userInfo.first_name,
    last_name: user.userInfo.last_name,
})
const setNewUserInfo = async (info) => {
    console.log(info)
        try {
            const docRef = doc(db, 'users', user.userInfo.user_id); // Создание ссылки на документ с использованием идентификатора пользователя

            await updateDoc(docRef, {
                ...info,
            });
            changeDateBtn.value = true
        } catch(err) {
            console.error(err)
        }
}
watch(() => user.userInfo, () => {
    console.log('test',user.userInfo)
    oldUserInfo.value = {}
    oldUserInfo.value = {
        first_name: user.userInfo.first_name,
        last_name: user.userInfo.last_name,
    }
})
</script>

<template>
    <div class="container profile">
        <div class="profile__preview block">
            <div class="profile__preview-name profile__subtitle">
                {{ user.userInfo.first_name + ' ' }}
                <span v-if="user.userInfo.last_name !== undefined">
                    {{ ' ' + user.userInfo.last_name }}
                </span>
            </div>
            <div class="profile__preview-avatar">
                <profile-pic/>
            </div>
            <label class="profile__add-avatar">
                <input type="file">
                <span class="button auth-btn">
                    Загрузить фото
                </span>
            </label>
            <div class="profile__date-since">
                Вступил <span>{{ convertTime(user.userInfo.createdAt) }}</span>
            </div>
        </div>
        <div class="profile__edit block">
            <div class="profile__edit-top">
                <div class="profile__subtitle profile__edit-subtitle">
                    Настройки профиля
                </div>
                <div class="profile__edit-nav">
                    <div class="profile__edit-nav-item active">
                        Данные профиля
                    </div>
                </div>
            </div>
            <div class="profile__edit-content">
                <div class="profile__edit-list">
                    <div class="profile__edit-item">
                        <span class="subtitle">
                            Имя
                        </span>
                        <TheInput
                            :modelValue="oldUserInfo.first_name"   
                            :value="oldUserInfo.first_name"
                            :placeHolder="'Имя'"
                            v-model="oldUserInfo.first_name"
                            @update:modelValue="(newValue) => {(oldUserInfo.first_name=newValue)}"
                            @input="changeDateBtn = false"
                            />
                    </div>
                    <div class="profile__edit-item">
                        <span class="subtitle">
                            Фамилия
                        </span>
                        <TheInput
                            :modelValue="oldUserInfo.last_name"   
                            :value="oldUserInfo.last_name"
                            :placeHolder="'Фамилия'"
                            v-model="oldUserInfo.last_name"
                            @update:modelValue="(newValue) => {(oldUserInfo.last_name=newValue)}"
                            @input="changeDateBtn = false"
                        />
                    </div>
                    <!-- <div class="profile__edit-item">
                        <span class="subtitle">
                            Пароль
                        </span>
                        <TheInput
                            :modelValue="password"    
                            :placeHolder="'Пароль'"
                            v-model="password"
                            @update:modelValue="(newValue) => {(password=newValue)}"
                            @keydown.enter="signIn()"
                        />
                    </div>
                    <div class="profile__edit-item">
                        <span class="subtitle">
                            Подтвердите пароль
                        </span>
                        <TheInput
                            :modelValue="password"    
                            :placeHolder="'Пароль'"
                            v-model="password"
                            @update:modelValue="(newValue) => {(password=newValue)}"
                            @keydown.enter="signIn()"
                        />
                    </div>
                    <div class="profile__edit-item">
                        <span class="subtitle">
                            Почта
                        </span>
                        <TheInput
                            :modelValue="password"    
                            :placeHolder="'Пароль'"
                            v-model="password"
                            @update:modelValue="(newValue) => {(password=newValue)}"
                            @keydown.enter="signIn()"
                        />
                    </div>
                    <div class="profile__edit-item">
                        <span class="subtitle">
                            Подтвердите почту
                        </span>
                        <TheInput
                            :modelValue="password"    
                            :placeHolder="'Пароль'"
                            v-model="password"
                            @update:modelValue="(newValue) => {(password=newValue)}"
                            @keydown.enter="signIn()"
                        />
                    </div> -->
                </div>
                <the-button
                :disabled="changeDateBtn"
                @click="setNewUserInfo(oldUserInfo)"
                >
                    Обновить данные
                </the-button>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.profile {
    display: flex;
    gap: 20px;
		&__preview {
            flex: 0 0 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px;
		}
        &__edit {
            flex: 1;
            padding: 40px;
        }
        &__edit-content {
            padding-top: 20px;
        }
        &__edit-list {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 30px;
        }
        &__edit-item {
            flex: 0 0 calc(50% - 10px);
        }
        &__edit-nav-item {
            padding-bottom: 2px;
            width: fit-content;
            cursor: pointer;
            &.active {
                border-bottom: 3px solid #2C64EE;
            }
        }
        &__subtitle {
            font-size: 30px;
            line-height: 35px;
            font-weight: 500;
        }
		&__preview-name {
            text-align: center;
		}

		&__preview-avatar {
            & img {
                width: 200px;
            }
		}
        &__edit-subtitle {
            margin-bottom: 30px;
        }
		&__date-since {
            margin-top: 20px;
            text-align: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 5px;
            & span {
                font-weight: 600;
                display: block;
            }
		}
        &__add-avatar {
            cursor: pointer;
            & input {
                display: none;
            }
        }
}

</style>