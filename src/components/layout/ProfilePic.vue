<script setup>
import { watch, ref, onMounted } from 'vue';
import { ref as  frRef, uploadBytes, getDownloadURL} from "firebase/storage";
import { storage, db } from '@/firebase/config.js'
import { useUser } from '@/stores/user';

import { collection, where, query, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
const user = useUser()

let defaultAvatar = ref(false)
const handleImage = () => {
    return(user.userInfo.profile_avatar == 'default')
}

watch(() => user.userInfo, () => {
    handleImage()
})
// onMounted(() => {
//     handleImage()
// })
</script>

<template>
    <img class="profile-img"
    v-if="!handleImage()"
    :src="`${user.userInfo.profile_avatar}`"
    >
    <img class="profile-img" src="https://firebasestorage.googleapis.com/v0/b/platform-89f1c.appspot.com/o/images%2Favatars-profile%2Fdefault.avif?alt=media&token=6e52ef9c-c41d-42ac-88d6-9b4c2d78ab65"
    v-else
    >
</template>

<style lang="scss">
.profile-img {
    object-fit: cover;
    z-index: 2;
    border-radius: 50%;
    width: 100%;
    height: 100%;
}
</style>