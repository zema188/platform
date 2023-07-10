<script setup>
import TheButton from '@/components/UI/TheButton.vue'
</script>

<template>
    <div class="tests__my">
        <div class="tests__my-header">
            <div class="tests__my-title">
                Мои тесты
            </div>
            <the-button
                class="tests__my-add-btn"
                @click="$emit('openCreateTestPopup')"
            >
                <font-awesome-icon :icon="['fas', 'plus']" />
                Добавить
            </the-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.tests {

&__my {
}

&__my-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding-bottom: 20px;
}

&__my-title {
    font-size: 30px;
    font-weight: 500;
}

&__my-add-btn {
    gap: 10px;
}
}

</style>