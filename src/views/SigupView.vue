<script setup>
import SignUp from '../components/SignUp.vue';

</script>

<template>
  <div class="welcome">
    <div class="welcome__content">
        <sign-up/>
    </div>
  </div>
</template>

<style lang="scss">
.welcome {
    max-width: 320px;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    padding: 15px 20px 20px;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    &__content {
        & .subtitle {
            margin: 15px 0 4px;
            display: block;
        }
    }
}

</style>