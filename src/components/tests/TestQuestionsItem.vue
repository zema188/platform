
<script setup>
import TheCkeckbox from '@/components/UI/TheCkeckbox.vue'
import CloseCross from '@/components/UI/CloseCross.vue'

const props = defineProps({
    question: {
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
    <div class="test__questions-item">
        <div class="test__questions-item-top">
            <span>
                {{ index }}
            </span>
            <div class="test__questions-item-actions">
                <button class="test__questions-item-action delete"
                    @click="$emit('deleteQuestion', index)"
                >
                    Удалить
                    <close-cross/>
                </button>
            </div>
        </div>
        <div class="test__questions-item-content">
            <div class="test__questions-item-title">
                {{ question.question }}
            </div>
            <div class="test__questions-item-answers">
                <div class="test__questions-item-answer"
                    v-for="(asnwer, index) of question.answers" :key="index"
                >
                    <the-ckeckbox
                        :type="question.type"
                        :name="`question-${props.index}`"
                        :disabled="true"
                        :checked="asnwer.points"
                    >
                        {{ asnwer.text }}
                    </the-ckeckbox>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" >
.test {

&__questions-item {
    &:not(:last-child) {
        margin-bottom: 20px;
    }
}

&__questions-item-top {
    background: #d8d7e7;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    gap: 50px;
    align-items: center;
    & span {
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        width: 20px;
        height: 20px;
        font-size: 11px;
    }
}

&__questions-item-actions {
    display: flex;
    align-items: center;
    gap: 7px;
}
&__questions-item-action {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 5px;
    border-radius: 5px;
    &.delete {
        color: #fff;
        background: red;    
        & svg {
            & path {
                stroke: #fff;
            }
        }
    }
}
&__questions-item-content {
    padding-left: 15px;
    padding-top: 5px;
}

&__questions-item-title {
    font-weight: 500;
    margin-bottom: 30px;
}

&__questions-item-answers {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
}

</style>