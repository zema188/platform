<script setup>
import ChatMassegesItem from './ChatMassegeItem.vue'
import { onMounted, ref,   } from 'vue';

const props = defineProps({
    messagesList: {
        type: Array,
    }
})

</script>

<template>
    <div class="chat__messages-list scroll_blue"
        ref="chatMessagesListRef"
    >
        <chat-masseges-item
            v-for="(message) of messagesList" :messageInfo="message" :key="message.message_id"
            @enlarge="(src) => $emit('enlarge',src)"
        />
    </div>
</template>



<style lang="scss" scoped>
.chat__messages-list {
    padding: 20px 5px;
    height: 400px;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
    // & .toScroll {
    //     display: none;
    // }
}
</style>