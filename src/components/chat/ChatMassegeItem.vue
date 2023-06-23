<script setup>
import { useUser } from '@/stores/user'
import { useRoute } from 'vue-router'

const props = defineProps({
    messageInfo: {
        type: Object,
        required: true,
    }
})
const user = useUser()

const convetTime = (timestamp) => {
    const date = timestamp.toDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
</script>

<template>
    <div
        :class="['chat__message-item', {'_my': user.userInfo.user_id == messageInfo.user_id}]"
    >
        <div class="chat__message-item-text">
            {{ messageInfo.message_text }}
        </div>
        <div class="chat__message-item-time">
            {{ convetTime(messageInfo.date_create) }}
        </div>
    </div>
</template>



<style lang="scss" scoped>
.chat {
    &__message-item {
        display: flex;
        align-items: flex-end;
        gap: 2px;
        max-width: 90%;
        justify-content: flex-start;
        word-break: break-all;
        &._my {
            flex-direction: row-reverse;
            margin-left: auto;
            & .chat__message-item-text {
                margin-right: 0;
                background: rgba(0, 64, 255, 35%);
            }
        }
        &:not(:last-child) {
            margin-bottom: 15px;
        }
    }
    &__message-item-text {
        background: #96969652;
        border-radius: 20px;
        width: fit-content;
        padding: 5px 10px;
    }

    &__message-item-time {
        font-size: 10px;
        white-space: nowrap;
    }
}
</style>