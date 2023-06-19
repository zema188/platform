<script setup>
    const props = defineProps({
        disabled: {
            type: Boolean,
            required: false,
        },
        type: {
            type: String,
            required: false,
        }
    })
</script>

<template>
    <button 
    :disabled="disabled"
    :type="type"
    class="button"
    >
        <slot></slot>
    </button>
</template>

<style lang="scss">
.button {
    background: #2C64EE;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 13px 15px;
    border-radius: 10px;
    transition: 0.2s;
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;
    position: relative;
    height: fit-content;
    width: fit-content;
    cursor: pointer;
    &[disabled] {
        cursor: default;
        background: #c4cbdd;
    }
}
</style>