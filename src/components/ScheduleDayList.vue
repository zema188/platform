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
        @deleteTask="(taskId) => $emit('deleteTask', taskId)"
        @editTask="(task) => $emit('editTask', task)"
        />
    </div>
</template>

<style lang="scss">

</style>