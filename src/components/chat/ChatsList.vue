<script setup>
import ChatsItem from './ChatsItem.vue';

const props = defineProps({
    chats: {
        type: Array,
    }
})

</script>

<template>
    <div class="chat__list-chats ">
        <chats-item
            v-for="(chat,index) of chats" :chatInfo="chat" :key="index"
        />
    </div>
</template>

<style lang="scss" >
.chat__list-chats {
    padding-top: 20px;
}
</style>