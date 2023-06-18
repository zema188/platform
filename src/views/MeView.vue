<script setup>
import ProfilePic from '../components/layout/ProfilePic.vue';
import TheButton from '../components/UI/TheButton.vue';
import TheInput from '../components/UI/TheInput.vue'
import { useUser } from '@/stores/user';
import { watch , ref } from 'vue';
import { storage, db } from '@/firebase/config.js'
import { ref as  frRef, uploadBytes, getDownloadURL} from "firebase/storage";
import { collection, where, query, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const user = useUser()
const changeDateBtn = ref(true)
const uploadAvatarBtn = ref(true)


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
        try {
            const docRef = doc(db, 'users', user.userInfo.user_id); // Создание ссылки на документ с использованием идентификатора пользователя

            await updateDoc(docRef, {
                first_name: user.userInfo.first_name,
                last_name: user.userInfo.last_name
            });
            changeDateBtn.value = true
        } catch(err) {
            console.error(err)
        }
}

let profileAvatar = ref()
const upLoadProfilePic = async () => {
    const storageRef = frRef(storage, `images/avatars-profile/avatar-${user.userInfo.user_id}`);
    const docRef = doc(db, 'users', user.userInfo.user_id); // Создание ссылки на документ с использованием идентификатора пользователя
    console.log('test')
    try {
        return uploadBytes(storageRef, profileAvatar.value)
        .then((snapshot) => {
            return snapshot
        })
        .then((uploadTask) => {
            return getDownloadURL(uploadTask.ref)
        })
        .then((url) => {
            console.log('url2', url)
            updateDoc(docRef, {
                profile_avatar: url
            });
        })
    } catch(err) {
        console.error(err)
    }
}

</script>

<template>
    <div class="container me">
        <div class="me__preview block">
            <div class="me__preview-name me__subtitle">
                {{ user.userInfo.first_name }}
                {{ user.userInfo.last_name }}
            </div>
            <div class="me__preview-avatar"
            >
                <profile-pic/>
                <label class="me__add-avatar">
                    <span>
                        <font-awesome-icon :icon="['fasl', 'pen']" style="color: rgb(144 157 223);" />
                    </span>
                    <input type="file"
                        @input="(e) => {profileAvatar = (e.target.files[0]), uploadAvatarBtn = false}"
                    >
                </label>

            </div>
            <the-button
                :class="`me__upload-btn`"
                :disabled="uploadAvatarBtn"
                @click="upLoadProfilePic"
            >
                Загрузить фото
            </the-button>
            <div class="me__date-since">
                Вступил <span>{{ convertTime(user.userInfo.createdAt) }}</span>
            </div>
        </div>
        <div class="me__edit block">
            <div class="me__edit-top">
                <div class="me__subtitle me__edit-subtitle">
                    Настройки профиля
                </div>
                <div class="me__edit-nav">
                    <div class="me__edit-nav-item active">
                        Данные профиля
                    </div>
                </div>
            </div>
            <div class="me__edit-content">
                <div class="me__edit-list">
                    <div class="me__edit-item">
                        <span class="subtitle">
                            Имя
                        </span>
                        <TheInput
                            :modelValue="user.userInfo.first_name"   
                            :value="user.userInfo.first_name"
                            :placeHolder="'Имя'"
                            v-model="user.userInfo.first_name"
                            @update:modelValue="(newValue) => {(user.userInfo.first_name=newValue)}"
                            @input="changeDateBtn = false"
                            />
                    </div>
                    <div class="me__edit-item">
                        <span class="subtitle">
                            Фамилия
                        </span>
                        <TheInput
                            :modelValue="user.userInfo.last_name"   
                            :value="user.userInfo.last_name"
                            :placeHolder="'Фамилия'"
                            v-model="user.userInfo.last_name"
                            @update:modelValue="(newValue) => {(user.userInfo.last_name=newValue)}"
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
.me {
    display: flex;
    gap: 20px;
		&__preview {
            flex: 0 0 25%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px;
            max-width: 350px;
		}
        &__upload-btn {
            margin-top: 20px;
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
            white-space: wrap;
		}

		&__preview-avatar {
            position: relative;
            &:hover {
                & span {
                    opacity: 1;
                }
            }
            & span {
                position: absolute;
                right: 0;
                bottom: 0;
                opacity: 0;
                transition: .2s;
                cursor: pointer;
                & svg {
                    width: 35px;
                    height: 35px;
                }
            }
            & img {
                width: 200px;
                height: 200px;
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