<script setup>
import TheEye from '@/components/UI/TheEye.vue'
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
        <input 
        :class="'input'"
        :placeholder="placeHolder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="required"
        :type="currentType"
        />
        <the-eye
            v-if="type==='password'"
            @showpassword="() => currentType = 'text'"
            @hidepassword="() => currentType = 'password'"
        />
    </div>
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
.input-w {
    position: relative;
    
}
</style>