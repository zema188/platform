<script setup>
import { ref } from 'vue';
let eyeActive = ref(false)

</script>

<template>
    <span>
        <svg 
        v-if="eyeActive"
        @click="$emit('hidepassword'), eyeActive = !eyeActive"
        width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 6.92523C8 7.45566 8.21071 7.96437 8.58579 8.33945C8.96086 8.71452 9.46957 8.92523 10 8.92523C10.5304 8.92523 11.0391 8.71452 11.4142 8.33945C11.7893 7.96437 12 7.45566 12 6.92523C12 6.3948 11.7893 5.88609 11.4142 5.51102C11.0391 5.13595 10.5304 4.92523 10 4.92523C9.46957 4.92523 8.96086 5.13595 8.58579 5.51102C8.21071 5.88609 8 6.3948 8 6.92523Z" stroke="#5D5A68" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M19 6.92523C16.6 10.9252 13.6 12.9252 10 12.9252C6.4 12.9252 3.4 10.9252 1 6.92523C3.4 2.92523 6.4 0.925232 10 0.925232C13.6 0.925232 16.6 2.92523 19 6.92523Z" stroke="#5D5A68" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round"></path>
		</svg>
        <svg
        v-else
        @click="$emit('showpassword'), eyeActive = !eyeActive"
        width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 9.25929C8 9.81265 8.21071 10.3433 8.58579 10.7346C8.96086 11.1259 9.46957 11.3457 10 11.3457C10.5304 11.3457 11.0391 11.1259 11.4142 10.7346C11.7893 10.3433 12 9.81265 12 9.25929C12 8.70593 11.7893 8.17524 11.4142 7.78396C11.0391 7.39267 10.5304 7.17285 10 7.17285C9.46957 7.17285 8.96086 7.39267 8.58579 7.78396C8.21071 8.17524 8 8.70593 8 9.25929Z" stroke="#5D5A68" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M19 9.25931C16.6 13.4322 13.6 15.5186 10 15.5186C6.4 15.5186 3.4 13.4322 1 9.25931C3.4 5.08644 6.4 3 10 3C13.6 3 16.6 5.08644 19 9.25931Z" stroke="#5D5A68" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <line x1="3.36432" y1="0.657551" x2="18.7745" y2="17.0519" stroke="#5D5A68"></line>
        </svg>
    </span>
</template>

<style scoped>
    span {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        cursor: pointer;
    }
</style>