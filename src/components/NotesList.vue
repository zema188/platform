<script setup>
    import NotesItem from './NotesItem.vue';
    const props = defineProps({
        notes: {
            type: Array,
            required: true,
        }
    })
</script>

<template>
    <div class="notes__list">
        <NotesItem
        v-for="(note, index) in notes" :note="note" :key="index"
        />
    </div>
</template>