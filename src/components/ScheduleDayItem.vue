<script setup>
    const props = defineProps({
        task: {
            type: Object,
            required: true,
        }
    })
</script>



<template>
    <div class="schedule-day__item">
        <div class="schedule-day__item-header">
            <div class="schedule-day__item-title">
                {{ task.title }}
            </div>
            <div class="schedule-day__item-date">
                <div class="schedule-day__item-date-from">
                    {{ task.time_from }}
                </div>
                <div class="schedule-day__item-date-to">
                    {{ task.time_to }}
                </div>
            </div>
        </div>
        <div class="schedule-day__item-content">
            <div class="schedule-day__item-description">
                {{ task.description }}
            </div>
        </div>
    </div>
</template>



<style lang="scss" >
.schedule-day {

    &__item {
        background: #fbfbfe;
        border-radius: 20px;
        padding: 15px 20px;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    &__item-header {
        display: flex;
        justify-content: space-between;
        padding: 0 0 10px;
    }

    &__item-title {
        font-weight: 600;
    }

    &__item-date {
    }

    &__item-date-from {
    }

    &__item-date-to {
    }

    &__item-content {
    }

    &__item-description {
        font-weight: 400;
    }
}

</style>