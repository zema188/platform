<script setup>
const props = defineProps({
    note: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="notes__item">
        <div class="notes__item-text">
            <span>
                {{ note.title }}
            </span>
            <p>
                {{ note.description }}
            </p>
        </div>
        <div class="notes__item-bottom">
            <div class="notes__item-date">
                {{ note.date }}
            </div>
        </div>
    </div>
</template>