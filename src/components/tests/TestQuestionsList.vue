<script setup>
import TestQuestionsItem from '@/components/tests/TestQuestionsItem.vue'
const props = defineProps({
    questions: {
        type: Array,
        required: true,
    }
})
</script>

<template>
    <div class="test__questions-list">
        <test-questions-item
            v-for="(question, index) of questions" :key="index" :question="question" :index="index"
        />
    </div>
</template>

<style lang="scss" scoped>
.test__questions-list {
    display: none;
    &.active {
        display: block;
    }
}
</style>