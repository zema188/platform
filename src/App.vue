<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue';
</script>

<template>
  <div class="wrapper">
    <TheHeader/>
    <RouterView />
  </div>
</template>

<style scoped>

</style>
