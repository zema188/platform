<script setup>
import { onMounted, ref } from 'vue';
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, getDoc, getDocs} from "firebase/firestore";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const profile = ref({})
const getProfileInfo = async() => {
    const profileId = route.params.id

    try {
        const userDoc = doc(db, "users", profileId)

        const response = await getDoc(userDoc)

        profile.value = {
            avatar: response.data().profile_avatar,
            first_name: response.data().first_name,
            last_name: response.data().last_name,
        }
    } catch(err) {
        console.error(err)
    }
}
onMounted(() => {
    getProfileInfo()
})
</script>


<template>
    <div class="profile block">
        <div class="profile__name">
            {{ profile.first_name }}
            {{ profile.last_name }}
        </div>
        <div class="profile__avatar">
            <img
                :src="profile.avatar"
                :alt="avatar"
            >
        </div>
    </div>
</template>

<style lang="scss">
.profile {
    padding: 30px 30px 30px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    &__name {
        font-weight: 500;
        font-size: 20px;
    }

    &__avatar {
        width: 100px;
        height: 100px;
        & img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

</style>