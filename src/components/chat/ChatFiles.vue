<script setup>
const props = defineProps({
    file: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="attach-file">
        <img
            :src="file.path"
        >
        <span
            :class="'delete'"
            @click="$emit('deleteAttachFile', file.path)"
        >
        <font-awesome-icon icon="xmark" style="color: #ffffff;" />
        </span>
    </div>
</template>

<style lang="scss" scoped>
.attach-file {
    position: relative;
    cursor: pointer;
    & img {
        width: 53.5px;
        object-fit: cover;
        height: 53.5px;
    }

    &::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: #000;
        opacity: 0;
        transition: .2s;
    }
    &:hover {
        &::before {
            opacity: 0.2;
        }
    }
    & .delete {
        position: absolute;
        right: 0;
        top: 0;
        background: #34343440;
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>