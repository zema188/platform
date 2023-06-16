<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import TheHeader from './components/layout/TheHeader.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUser } from './stores/user';
import { cloudDb } from '@/firebase/config.js'

import axios from "axios";

import { collection, query, where, getDocs } from "firebase/firestore";
const user = useUser()

// check for userIsLoggedin
onMounted(() => {
  let auth = getAuth()
  onAuthStateChanged(auth, (User) => {
    if(User) {
      user.userIsLoggedIn = true
      user.userInfo.uid = User.uid
      user.userInfo.email = User.email
      console.log('авторизован')
    } else {
      console.log('не авторизован')
    }
  });
  const q = query(collection(cloudDb, "users"), where("user_email", "==", 'test@gmail.com'));
  async function test() {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
  test()
})





</script>

<template>
  <div class="wrapper">
    <TheHeader
    v-if="user.userIsLoggedIn"
    />
    <RouterView />
  </div>
</template>

<style scoped>

</style>
