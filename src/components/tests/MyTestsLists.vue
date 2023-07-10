<script setup>
import { ref } from 'vue';
import MyTestsItem from '@/components/tests/MyTestsItem.vue'

const props = defineProps({
    tests: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="tests__my-list">
        <my-tests-item
            v-for="(test, index) of tests" :key="index" :test="test"
            @deleteTest="(id) => $emit('deleteTest', id)"
        />
    </div>
</template>

<style lang="scss" scoped>
.tests {

&__my-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
}

</style>