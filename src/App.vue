<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUser } from './stores/user';
import TheHeader from './components/layout/TheHeader.vue';
import SideBar from './components/layout/SideBar.vue';
const user = useUser()

// check for userIsLoggedin
onMounted(() => {
  let auth = getAuth()
  onAuthStateChanged(auth, async (User) => {
    if(User) {
      user.userIsLoggedIn = true
      user.userInfo.user_id = User.uid
      await user.getInfoUser(User.uid)
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
    <main class="container">
      <side-bar

      />
      <RouterView
      :class="'main__content'"
      />
    </main>
  </div>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.main__content {
  flex: 1;
}
</style>
