<script setup>
import { onMounted, ref } from 'vue';
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, getDoc, getDocs, onSnapshot, setDoc, orderBy } from "firebase/firestore";

const props = defineProps({
    chatInfo: {
        type: Object,
    }
})

const FreindInfo = ref({})

const getChatInfo = async() => {
        try {
            const docUser = doc(db, `users/${props.chatInfo.freind_id}`)

            const response = await getDoc(docUser)

            FreindInfo.value = {
                ...response.data()
            }
        } catch(err) {
            console.error(err)
        }
    }
onMounted(() => {
    getChatInfo()
})
</script>

<template>
    <router-link class="chat__freinds-item"
    :to="`chats/${chatInfo.chat_id}`"
    >
        <div class="chat__freinds-item-avatar">
            <img 
                :src="FreindInfo.profile_avatar">
        </div>
        <div class="chat__freinds-item-name">
            {{ FreindInfo.first_name }}
            {{ FreindInfo.last_name }}
        </div>
    </router-link>
</template>

<style lang="scss" >
.chat {

    &__freinds-item {
        display: flex;
        gap: 5px;
        border-bottom: 0.7px solid #969696;
        padding-bottom: 5px;
        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }

    &__freinds-item-avatar {
        width: 50px;
        height: 50px;
        & img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__freinds-item-name {
    }
}

</style>