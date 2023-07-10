
<script setup>
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
        </div>
        <div class="test__questions-item-content">
            <div class="test__questions-item-title">
                {{ question.question }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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

&__questions-item-content {
    padding-left: 15px;
    padding-top: 5px;
}

&__questions-item-title {
}
}

</style>