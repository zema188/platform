
<script setup>
import FreindsItem from './FreindsItem.vue';


const props  = defineProps({
    freindsList: {
        type: Array,
        required: true,
    },
})

</script>

<template>
    <div class="freinds__list">
        <freinds-item
            v-for="(item, index) of freindsList" :friend="item" :key="index"
        />
    </div>
</template>

<style lang="scss">

</style>
