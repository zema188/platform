<script setup>

import { ref, onMounted } from 'vue';
import SnakeLeadersItem from './SnakeLeadersItem.vue';
import { db } from '@/firebase/config.js'
import { collection, where, query, onSnapshot, doc, addDoc, setDoc, getDoc, deleteDoc, updateDoc, getDocs } from "firebase/firestore";
import { useUser } from '@/stores/user'
import TheLoader from '@/components/UI/TheLoader.vue';

const leaders = ref([])
const leadersIds = []
const leadersresponse = []
const loader = ref(true)

const getLeaders = () => {
    try {
        const leadersCollection = collection(db, "snakeGameInfo")
        const unsubscribe = onSnapshot(leadersCollection, (snapshot) => {
            leadersIds.length = 0
            leadersresponse.length = 0
            snapshot.forEach((doc) => {
                const id = doc.id
                const data = doc.data()
                leadersIds.push(id)
                leadersresponse.push({
                    user_id: id,
                    ...data
                })
            });

            getLeadersInfo()
        });
        
    } catch(err) {
        console.error(err)

    }
}
const getLeadersInfo = async() => {
    try {
        const profileDocs = await getDocs(query(collection(db, "users"), where("user_id", "in", leadersIds)))
        leaders.value.length = 0
        profileDocs.forEach((doc) => {
            const data = doc.data();
            const score = getScoreForUser(data.user_id); // Здесь предполагается, что есть функция, возвращающая количество очков для пользователя по его идентификатору
            data.score = score;
            leaders.value.push(data);
        });
        loader.value = false
    } catch(err) {
        console.error(err)
    }

}

function getScoreForUser(userId) {
  const leader = leadersresponse.find((element) => element.user_id === userId);
  return leader.food_eat_record;
}
onMounted(() => {
    getLeaders()
})
</script>

<template>
    <div class="snake__leaders block">
        <the-loader
            v-if="loader"
        />
        <snake-leaders-item
            v-for="(user, index) of leaders.sort((a,b) => b.score - a.score)" :position="index" :user="user" :key="user.user_id"
            v-if="!loader"
        />
    </div>
</template>

<style lang="scss" scoped>
.snake__leaders {
    position: relative;
    flex: 1;
    max-width: 300px;
    & .loader {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>