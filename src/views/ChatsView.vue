<script setup>
import ChatListChats from '../components/chat/ChatListChats.vue';
import { onMounted, ref } from 'vue';
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, getDoc, getDocs, onSnapshot, setDoc, orderBy } from "firebase/firestore";
import { useUser } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'

const user = useUser()

const chats = ref([])

const getAllUserChats = async () => {
    try {
        const q = query(collection(db, "chats"),
        where('participator', 'array-contains', user.userInfo.user_id))
        console.log(user.userInfo.user_id)
        const response = await getDocs(q)
        chats.value = []
        response.forEach((doc => {
            const freindId = user.userInfo.user_id === doc.data().participator[0]
            ? doc.data().participator[1]
            : doc.data().participator[0]
            const chatInfo = {
                chat_id: doc.id,
                freind_id: freindId,
            }

            chats.value.push(chatInfo)
        }))
    } catch(err) {
        console.error(err)
    }
}

onMounted(async() => {
    await getAllUserChats()
})
</script>

<template>
    <div class="block chat-list">
        <div
            v-if="!chats.length"
        >
            Чатов нет
        </div>
        <chat-list-chats
            v-else
            :chats="chats"
        />
    </div>
</template>

<style lang="scss" scoped>
.chat-list {
    max-width: 800px;
    margin: 0 auto;
}
</style>