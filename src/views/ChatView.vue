<script setup>
import ChatList from '../components/chat/ChatList.vue';
import { onMounted, ref } from 'vue';
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, getDoc, onSnapshot, setDoc, orderBy } from "firebase/firestore";
import { useUser } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import TheInput from '../components/UI/TheInput.vue';

const route = useRoute()
const user = useUser()
const friendInfo = ref({})
let fieldMessage = ref('')
const chatMessages = ref([])
let chatId = ref('')

const getFreindInfo = async() => {

    try {
        const freindDoc = doc(db, `users/${friendInfo.value.id}`)

        const response = await getDoc(freindDoc)
        friendInfo.value.profile_avatar = response.data().profile_avatar
        friendInfo.value.first_name = response.data().first_name
        friendInfo.value.last_name = response.data().last_name
    } catch(err) {
        console.error(err)
    }
}

const getChatUsersInfo = async() => {
    try {
        const chachUsersDoc = doc(db, `chats/${chatId}`)

        const response = await getDoc(chachUsersDoc)

        if(user.userInfo.user_id == response.data().participator[0])
            friendInfo.value.id = response.data().participator[1]

        else 
            friendInfo.value.id = response.data().participator[0]

    } catch(err) {
        console.error(err)
    }
}

const getChatMessages = async () => {
    try {
        const q = query(collection(db, "messages"),
        where("chat_id", "==", chatId),
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            chatMessages.value = []
            querySnapshot.forEach((doc) => {
                const messageInfo = {
                    message_id: doc.id,
                    ...doc.data()
                }
                chatMessages.value.push(messageInfo)
            });

            chatMessages.value.sort((a, b) => {
                const dateA = a.date_create.toDate();
                const dateB = b.date_create.toDate();
                return dateA - dateB;
            });
        });

        
        return unsubscribe;
    } catch (err) {
        console.error(err);
    }
};

const sendMessage = async () => {
    try {
        if(checkEmptySpaces(fieldMessage.value))
        return
        const messageCollection = collection(db, "messages") 
        const messageDoc = doc(messageCollection)

        const response = await setDoc(messageDoc, {
            chat_id: chatId,
            date_create: new Date(),
            message_text: fieldMessage.value,
            user_id: user.userInfo.user_id
        })
        fieldMessage.value = ''


    } catch(err) {
        console.error(err)

    }
}
function checkEmptySpaces(text) {
  const trimmedText = text.replace(/\s/g, '');
  const isEmpty = trimmedText.length === 0;
  
  return isEmpty;
}
onMounted(async () => {
    chatId = route.params.id
    await getChatUsersInfo()
    await getFreindInfo()
    await getChatMessages()
})
</script>

<template>
    <div class="chat block">
        <div class="chat__header">
            <div class="chat__friend">
                <div class="chat__friend-avatar">
                    <img 
                        :src="friendInfo.profile_avatar"
                    >
                </div>
                <div class="chat__friend-name">
                    {{ friendInfo.first_name }}
                    {{ friendInfo.last_name }}
                </div>
            </div>
        </div>
        <div class="chat__content">
            <chat-list
                :messagesList="chatMessages"
            />
        </div>
        <div class="chat__field-message">
            <the-input
                :modelValue="fieldMessage"    
                :placeHolder="'Напишите сообщение'"
                v-model="fieldMessage"
                @update:modelValue="(newValue) => {(fieldMessage=newValue)}"
                @keydown.enter="sendMessage()"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chat {
    padding: 0px;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__header {
        border-bottom: 0.7px solid #969696;
        padding: 10px 20px;
    }

    &__friend {
        display: flex;
        gap: 10px;
    }

    &__friend-avatar {
        width: 50px;
        height: 50px;
        & img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__friend-name {
        font-size: 18px;
        padding-top: 5px;
    }

    &__content {
        height: 400px;
    }

    &__field-message {
        & input {
            border-radius: 0;
            &::placeholder {
                color: #9696967a;
            }
            &:focus {
                &::placeholder {
                    color: #9696967a;
                }
            }
        }
    }
}
.block {
}

</style>