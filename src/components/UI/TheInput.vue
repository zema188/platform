<script setup>
 const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    placeHolder: {
        type: String,
        default: ""
    }
 })




</script>

<template>
    <input 
    :class="'input'"
    :placeholder="placeHolder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    />
</template>


<style lang="scss" >
    .input {
        font-size: 14px;
        line-height: 16px;
        background: #EEF1F8;
        display: block;
        width: 100%;
        padding: 10px 15px;
        border-radius: 10px;
        color: #000;
        &:focus {
            &::placeholder {
                color: transparent;
            }
        }
        &::placeholder {
            color: rgba(96, 96, 96, 0.5);
        }
    }
</style>