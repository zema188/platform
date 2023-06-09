<script setup>
import SignIn from '../components/SignIn.vue';

</script>

<template>
  <div class="welcome">
    <div class="welcome__body">
      <div class="welcome__content">
          <sign-in/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
    &__body {
      width: 100%;
      max-width: 320px;
      background: #fff;
      border-radius: 5px;
      padding: 15px 20px 20px;
      background: #fff;
      box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    }
    &__content {
        & .subtitle {
            margin: 15px 0 4px;
            display: block;
        }
    }
    &__lead {
      margin-top: 15px;
      & a {
        text-decoration: underline;
      }
    }
    &__error {
      padding: 20px 15px 20px 5px;
      background: rgb(255, 245, 200);
      margin-top: 10px;
      display: flex;
      gap: 30px;
      justify-content: space-between;
    }
    &__loader {
      margin: 0 auto;
    }
}

</style>