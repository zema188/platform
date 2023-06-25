<script setup>
import { onMounted, ref } from 'vue';
import { db } from '@/firebase/config.js'
import { useUser } from '@/stores/user';
import { collection, where, query,  getDocs, addDoc, or, setDoc, doc } from "firebase/firestore";
import { useRouter, useRoute } from 'vue-router'
import FreindsList from '../components/freinds/FreindsList.vue';
import TheLoader from '../components/UI/TheLoader.vue';

const user = useUser()
const router = useRouter()


const myFrindsList = ref([])
const globalFreinds = ref([])
const loader = ref(true)


const getAllUsers = async() => {
    try {
        const usersDoc = collection(db, "users")

        const response = await getDocs(usersDoc)

        globalFreinds.value = []
        response.forEach((user) => {
            const property = user.data();
            globalFreinds.value.push(property)
        })
        if (!globalFreinds.value.length) {
                loader.value = false;
                return;
        }
        
        loader.value = false;
    } catch(err) {
        console.error(err)
    }
    return
}

const startChat = async(freind_id, e) => {
    e.preventDefault();

    let ids = [
        user.userInfo.user_id,
        freind_id
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



onMounted(() => {
    getAllUsers()
})
</script>

<template>
    <div class="freinds block">
        <div class="freinds__content">
            <div class="freinds__header">
                <div class="freinds__col-subtitle"
                :class="[{'active': false}]"
                >
                    Мои друзья
                </div>
                <div class="freinds__col-subtitle"
                :class="[{'active': false}]"
                >
                    Глобальный поиск
                </div>
                <div class="freinds__col-subtitle"
                :class="[{'active': false}]"
                >
                    Заявки в друзья
                </div>
                <div class="freinds__col-subtitle"
                :class="[{'active': false}]"
                >
                    Отправленные заявки
                </div>
            </div>
            <the-loader
                v-if="loader"
            />
            <div
                v-if="!globalFreinds.length && !loader"
            >
                Пользователей не найдено
            </div>
            <freinds-list
                :freindsList="globalFreinds"
                @startChat="(freind_id, e) => startChat(freind_id,e)"
            />
        </div>
    </div>
</template>

<style lang="scss">
.freinds {
    &__content {
        padding: 0 30px 30px 30px;
    }
    &__header {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }
    &__col {
    }

    &__col-subtitle {
        font-size: 20px;
        cursor: pointer;
        padding-bottom: 3px;
        border-bottom: 2px solid transparent;
        &.active {
            border-bottom: 2px solid blue;
        }
    }
}

</style>
