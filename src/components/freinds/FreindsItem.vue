<script setup>
import { RouterLink } from 'vue-router';
import { useUser } from '@/stores/user';
import { db } from '@/firebase/config.js'


const props = defineProps({
    friend: {
        type: Object,
        required: true,
    }
})
const user = useUser()


</script>

<template>
    <router-link
    :to="`/profile/${friend.user_id}`"
    >
        <div class="freinds__item"
        v-if="user.userInfo.user_id !== friend.user_id"
        >
            <div class="freinds__item-avatar">
                <img
                    :src="friend.profile_avatar"
                    alt="avatar"
                >
            </div>
            <div class="freinds__item-action">
                <div class="freinds__item-name">
                    {{ friend.first_name }}
                    {{ friend.last_name }}
                </div>
                <div class="freinds__item-message-btn"
                @click="(e) =>$emit('startChat', props.friend.user_id, e)"
                >
                    Отправить сообщение
                    <font-awesome-icon :icon="['fas', 'message']" style="color: rgb(19 125 203);" />
                </div>
                <!-- <div class=""
                @click="(e) =>$emit('addFreind', props.friend.user_id, e)"
                
                >
                    Добавить в друзья
                </div>
                <div class="">
                    Заявка отправлена
                </div> -->
                <!-- <div class="">
                    Хочет добавить вас в друзья
                    <span>
                        Добавить
                    </span>
                    <span>
                        Отклонить
                    </span>
                </div>
                <div class="">
                    У вас в друзьях
                </div> -->
            </div>
        </div>
    </router-link>
</template>

<style lang="scss">
.freinds {

    &__item {
        display: flex;
        gap: 10px;
        border-bottom: 0.7px solid #969696;
        padding: 8px 0;
        
    }

    &__item-avatar {
        width: 80px;
        height: 80px;
        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
    }

    &__item-name {
        font-weight: 500;
        color: #2C64EE;
    }
    &__item-message-btn {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 3px;
    }
}

</style>
