<script setup>
import { onMounted, ref, watch } from 'vue';

 const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    placeHolder: {
        type: String,
        default: ""
    },
    required: {
        type: String,
    },
    type: {
        type: String,
        default: "text"
    }
 })


let currentType = ref('text')
onMounted(() => {
    currentType.value = props.type
})
</script>

<template>
    <div class="input-w">
        <textarea :class="'textarea'" :placeholder="placeHolder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :required="required" :type="currentType"></textarea>
    </div>
</template>


<style lang="scss" >
.textarea {
    font-size: 14px;
    line-height: 16px;
    background: #EEF1F8;
    display: block;
    width: 100%;
    padding: 10px 15px;
    border-radius: 10px;
    color: #000;
    resize: none;
    height: 100px;
    &:focus {
        &::placeholder {
            color: transparent;
        }
    }
    &::placeholder {
        color: rgba(96, 96, 96, 0.5);
    }
}
.input-w {
    position: relative;
}
</style>