<script setup>
import SingleAnswer from './single/SingleAnswer.vue';
const props = defineProps({
    answers: {
        type: Array,
        required: true,
    }
})




</script>

<template>
    <div class="answers">
        <div class="answers-top">
            <div class="answers-top-item answers-item">
                #
            </div>
            <div class="answers-top-item answers-item">
                Текст вариантов ответов	
            </div>
            <div class="answers-top-item answers-item">
                Количество баллов
            </div>
        </div>
        <div class="answers-list">
            <single-answer
                v-for="(answer, index) of answers" :key="index" :answer="answer" :index="index"
                @delete="(index) => $emit('delete', index)"
            />
        </div>
    </div>
</template>

<style lang="scss" >
.answers {

& {
    margin-top: 20px;
}

&-top {
    display: flex;
    gap: 20px;
    border-bottom: 1px solid #969696;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

&-top-item {
}

&-item {
    text-align: center;
    &:nth-child(1) {
        flex: 0 0 50px;
        text-align: start;
    }
    &:nth-child(2) {
        flex: 1;
    }
    &:nth-child(3) {
        flex: 0 0 150px;
    }
}
}

</style>