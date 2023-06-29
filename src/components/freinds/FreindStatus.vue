<script setup>
import { ref } from 'vue';
const props = defineProps({
    profileId: {
        // type: String,
        // required: true,
    },
    userId: {
        // type: String,
        // required: true,
    },
    friendsStatus: {
        // type: Object,
        // required: true,
    }
})
let deleteArrowBtn = ref(false)

</script>


<template>
        <div class="profile__Friend-status"
            v-if="profileId !== userId"
        >
            <span class="profile__Friend-add"
                v-if="friendsStatus.status == undefined"
                @click="$emit('addFriend')"
            >
                Добавить в друзья
            </span>
            <span
                v-if="friendsStatus.status === 0 && friendsStatus.user_requesterId === userId"
            >
                Заявка отправлена
                <div class="profile__Friend-action">
                    <span
                        @click="$emit('deleteFriend')"
                    >
                        Отменить заявку
                    </span>
                </div>
            </span>
            <span
                v-if="friendsStatus.status === 0 && friendsStatus.user_recipientId === userId"
            >
                Хочет добавить вас в друзья
                <div class="profile__Friend-action">
                    <span
                        @click="$emit('acceptFriend')"
                    >
                        Принять
                    </span>
                    <span
                        @click="$emit('rejectFriend')"
                    >
                        Отклонить
                    </span>
                </div>
            </span>
            <span
                class="profile__Friend-delete"
                v-if="friendsStatus.status === 1"
            >
                У вас в друзья
                
                <div class="profile__Friend-delete-arrow"
                    :class="[{active: deleteArrowBtn}]"
                    @click="deleteArrowBtn = !deleteArrowBtn"
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 1024 1024" class="icon" version="1.1"><path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/>
                    
                    </svg>
                    <span
                        @click="$emit('deleteFriend')"
                    >
                        Удалить из друзуй
                    </span>
                </div>
            </span>
            <span
                v-if="friendsStatus.status === 2 && friendsStatus.user_recipientId === userId"
            >
                Вы отклонили заявку
                <div class="profile__Friend-action">
                    <span
                        @click="$emit('addFriendNew')"
                    >
                        Отправить заявку в друзья
                    </span>
                </div>
            </span>
            <span
                v-if="friendsStatus.status === 2 && friendsStatus.user_requesterId === userId"
            >
                Заявка в друзья отклонена
                <div class="profile__Friend-action">
                    <span
                        @click="$emit('addFriendAgain')"
                    >
                        Отправить запрос заново
                    </span>
                </div>
            </span>
        </div>
</template>


<style lang="scss" scoped>

</style>