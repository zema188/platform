<script setup>
import ChatItem from './ChatItem.vue';

const props = defineProps({
    messagesList: {
        type: Array,
    }
})

</script>

<template>
    <div class="chat__messages-list scroll_blue">
        <chat-item
            v-for="(message) of messagesList" :messageInfo="message" :key="message.message_id"
        />
    </div>
</template>



<style lang="scss" scoped>
.chat__messages-list {
    padding: 20px 5px;
    height: 400px;
    overflow-y: auto;
}
</style>