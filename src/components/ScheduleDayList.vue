<script setup>
    import ScheduleDayItem from './ScheduleDayItem.vue';

    const props = defineProps({
        tasksDay: {
            type: Array,
            required: false,
        }
    })
</script>


<template>
    <div class="schedule-day__list">
        <schedule-day-item
        v-for="(task, index) in tasksDay" :task="task" :key="index"
        />
    </div>
</template>

<style lang="scss">

</style>