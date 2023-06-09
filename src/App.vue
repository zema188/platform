<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import TheHeader from './components/layout/TheHeader.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUser } from './stores/user';

const user = useUser()

// check for userIsLoggedin
onMounted(() => {
  let auth = getAuth()
  onAuthStateChanged(auth, (User) => {
    if(User) {
      user.userIsLoggedIn = true
      console.log('авторизован')
    } else {
      console.log('не авторизован')
    }
  });
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
