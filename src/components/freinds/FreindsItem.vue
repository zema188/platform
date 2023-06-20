<script setup>
import { RouterLink } from 'vue-router';
import { useUser } from '@/stores/user';
import { db } from '@/firebase/config.js'
import { collection, where, query,  getDocs, addDoc, or } from "firebase/firestore";
import { useRouter, useRoute } from 'vue-router'


const props = defineProps({
    friend: {
        type: Object,
        required: true,
    }
})
const user = useUser()
const router = useRouter()
const route = useRoute()

const startChat = async(e) => {
    e.preventDefault();

    let ids = [
        user.userInfo.user_id,
        props.friend.user_id
    ]
    
    let reversedIds = ids.slice().reverse();

    try {
        const q = query(collection(db, "chats"),
        or (
            where("participator", "in", [ids]),
            where("participator", "in", [reversedIds]),
        )
        );

        const response = await getDocs(q)

        if (!response.empty) {
            console.log('найден чат')
            const doc = response.docs[0];
            const chatId = doc.id;
            router.push(`/chats/${chatId}`);
            
        } else {
            console.log('чат не найден')
            const newChatRef = await addDoc(collection(db, "chats"), {
                participator: ids
            });

            const newChatId = newChatRef.id;
            router.push(`/chats/${newChatId}`);
        }
    } catch(err) {
        console.error(err)
    }
}
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
                @click="(e) => startChat(e)"
                >
                    Отправить сообщение
                    <font-awesome-icon :icon="['fas', 'message']" style="color: rgb(19 125 203);" />
                </div>
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
    }
}

</style>
