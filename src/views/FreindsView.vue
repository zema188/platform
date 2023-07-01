<script setup>
import { onMounted, ref } from 'vue';
import { db } from '@/firebase/config.js'
import { useUser } from '@/stores/user';
import { collection, where, query,  getDocs, addDoc, or, setDoc, doc, and } from "firebase/firestore";
import { useRouter, useRoute } from 'vue-router'
import FreindsList from '../components/freinds/FreindsList.vue';
import TheLoader from '../components/UI/TheLoader.vue';

const user = useUser()
const router = useRouter()


const myFreinds = ref([])
const globalFreinds = ref([])
const applicationsForMe = ref([])
const applicationsFromMe = ref([])
const loader = ref(true)
const currentList = ref([])
let activeListName = ref('myFreinds')


const getAllUsers = async() => {
    activeListName.value = 'globalFreinds'
    try {
        if(globalFreinds.value.length) {
            currentList.value = [...globalFreinds.value]
            return
        }
        const usersDoc = collection(db, "users")

        const response = await getDocs(usersDoc)

        response.forEach((user) => {
            const property = user.data();
            globalFreinds.value.push(property)
        })

        if (!globalFreinds.value.length) {
            loader.value = false;
            return;
        }

        setFreindsList(globalFreinds)

    } catch(err) {
        console.error(err)
    }
}
const getMyFriends = async() => {
    try {
        activeListName.value = 'myFreinds'
        if(myFreinds.value === null) {
            currentList.value = []
            return
        }
        if (myFreinds.value.length) {
            currentList.value = [...myFreinds.value]
            return
        }

        const q = query(collection(db, 'friends'), and(
            or(
                where("user_requesterId", "==", user.userInfo.user_id),
                where("user_recipientId", "==", user.userInfo.user_id)
            ),
            where("status", "==", 1)
        ));

        const response = await getDocs(q)
        if(response.empty) {
            loader.value = false;
            myFreinds.value = null
            currentList.value = []
            return
        }
        
        const friendIds = response.docs.map((doc) => {
            const data = doc.data();
            return data.user_requesterId === user.userInfo.user_id ? data.user_recipientId : data.user_requesterId
        });
        const profileDocs = await getDocs(query(collection(db, "users"), where("user_id", "in", friendIds)))


        profileDocs.forEach((profileDoc) => {
        if (profileDoc.exists()) {
            const friendData = profileDoc.data();
            myFreinds.value.push(friendData)
        }
        });


        setFreindsList(myFreinds)
        
    } catch(err) {
        console.error(err);
    }
}

const getApplications = async(type) => {
    try {
        if(type === "user_recipientId") {
            activeListName.value = 'applicationsForMe'

            if(applicationsForMe.value === null) {
                currentList.value = []
                return
            }

            if (applicationsForMe.value.length) {
                currentList.value = [...applicationsForMe.value]
                return
            }

        } else {
            activeListName.value = 'applicationsFromMe'

            if(applicationsFromMe.value === null) {
                currentList.value = []
                return
            }

            if (applicationsFromMe.value.length) {

                currentList.value = [...applicationsFromMe.value]
                return
            }

        }



        const q = query(collection(db, 'friends'),
            where(type, "==", user.userInfo.user_id),
            where("status", "==", 0)
        )

        const response = await getDocs(q);
        if(response.empty) {
            loader.value = false;
            console.log('test')
            if(type === "user_recipientId") {
                applicationsForMe.value = null
            } else {
                applicationsFromMe.value = null
            }

            currentList.value = []
            return
        }
        let friendIds = []
        response.forEach(element => {
            if(type === "user_recipientId") {
                friendIds.push(element.data().user_requesterId)
            } else {
                friendIds.push(element.data().user_recipientId)
            }
        });

        const profileDocs = await getDocs(query(collection(db, "users"), where("user_id", "in", friendIds)))
        profileDocs.forEach((profileDoc) => {
        if (profileDoc.exists()) {
            const friendData = profileDoc.data();
            if(type === "user_recipientId") {
                applicationsForMe.value.push(friendData)
                setFreindsList(applicationsForMe)
            } else {
                applicationsFromMe.value.push(friendData)
                setFreindsList(applicationsFromMe)
            }
        }
        });


    } catch(err) {
        console.error(err)
    }
}

const setFreindsList = (freindsList) => {
    
    currentList.value = []
    currentList.value = [...freindsList.value]
    loader.value = false;

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
    getMyFriends()
})
</script>

<template>
    <div class="freinds block">
        <div class="freinds__content">
            <div class="freinds__header">
                <div class="freinds__col-subtitle"
                    :class="[{'active': activeListName === 'myFreinds'}]"
                    @click="getMyFriends"
                >
                    Мои друзья
                </div>
                <div class="freinds__col-subtitle"
                    :class="[{'active': activeListName === 'globalFreinds'}]"
                    @click="getAllUsers"
                >
                    Глобальный поиск
                </div>
                <div class="freinds__col-subtitle"
                    :class="[{'active': activeListName === 'applicationsForMe'}]"
                    @click="getApplications('user_recipientId')"
                >
                    Заявки в друзья
                </div>
                <div class="freinds__col-subtitle"
                    :class="[{'active': activeListName === 'applicationsFromMe'}]"
                    @click="getApplications('user_requesterId')"
                >
                    Отправленные заявки
                </div>
            </div>
            <the-loader
                v-if="loader"
            />
            <div
                v-if="!currentList.length && !loader"
            >
                Пользователей не найдено
            </div>
            <freinds-list
                :freindsList="currentList"
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
