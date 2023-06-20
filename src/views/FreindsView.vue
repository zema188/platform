<script setup>
import { onMounted, ref } from 'vue';
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, getDoc, getDocs} from "firebase/firestore";
import FreindsList from '../components/freinds/FreindsList.vue';
import TheLoader from '../components/UI/TheLoader.vue';
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
        console.log("users", response);
        
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
onMounted(() => {
    getAllUsers()
})
</script>

<template>
    <div class="freinds block">
        <div class="freinds__content">
            <div class="freinds__header">
                <div class="freinds__col-subtitle">
                        Мои друзья
                </div>
                <div class="freinds__col-subtitle">
                    Глобальный поиск
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
            />
        </div>
    </div>
</template>

<style lang="scss">
.freinds {
    &__content {
        padding: 0 30px 30px 30px;
        max-width: 500px;
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
    }
}

</style>
