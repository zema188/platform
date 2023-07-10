<script setup>
import TheInput from '@/components/UI/TheInput.vue'
import TheTextarea from '@/components/UI/TheTextarea.vue'

const props = defineProps({
    answer: {
        type: Object,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    }
})
</script>

<template>
    <div class="answer">
        <div class="answers-item index">
            {{ props.index }}
        </div>
        <div class="answers-item">
            <the-textarea 
            :modelValue="answer.text"
            v-model="answer.text"
            @update:modelValue="(newValue) => {(answer.text=newValue)}"
            />
        </div>
        <div class="answers-item points">
            <the-input
            :modelValue="answer.points"
            v-model="answer.points"
            @update:modelValue="(newValue) => {(answer.points=newValue)}"
            />
        </div>
        <div class="delete"
            @click="$emit('delete', index)"
        >
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.84473 5.23242L3.64379 19.8884H16.2606L17.9662 5.23242" stroke="#EA5455" stroke-linecap="round"></path>
                <line x1="0.5" y1="4.7793" x2="19.5" y2="4.7793" stroke="#EA5455" stroke-linecap="round"></line>
                <path d="M14.1038 4.43434V1H5.6416V4.43434" stroke="#EA5455" stroke-linecap="round"></path>
                <path d="M7.85156 9.05664V15.6109" stroke="#EA5455" stroke-linecap="round"></path>
                <path d="M12.0527 9.10156V15.6558" stroke="#EA5455" stroke-linecap="round"></path>
            </svg>
        </div>
    </div>
</template>



<style lang="scss" >
.answer {
    position: relative;
    display: flex;
    & .delete {
        position: absolute;
        right: 8px;
        top: 5px;
        cursor: pointer;

    }
}
.answers-item {
    & textarea {
        resize: none;
        height: auto;
        min-height: 50px;
    }
    &:not(:last-child) {
        margin-bottom: 20px;
    }
    &.points {
        display: flex;
        justify-content: center;
        & input {
            width: 50px;
        }
    }
    &.index {
        display: flex;
        align-items: center;
    }
}
</style>