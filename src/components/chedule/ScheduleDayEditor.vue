

<script setup>
    import PopUp from '@/components/UI/Popup.vue';
    import TheInput from '@/components/UI/TheInput.vue';
    import TheButton from '@/components/UI/TheButton.vue';
    import { watch , ref } from 'vue';
    import { getDatabase, ref as dbRef, set, push, child } from "firebase/database";
    import { useUser } from '@/stores/user'
    import axios from 'axios';


    let props = defineProps({
        editTaskPopupIsActive: {
            type: Boolean,
            required: true,
        },
        currentTask: {
            type: String,
            required: false,
        },
        editType: {
            type: String,
            required: true,
        },
    })
    let saveBtnIsDisabled = ref(true)
    let task = ref({})

    watch(() => props.editTaskPopupIsActive, () => {
        task.value = {}
        task.value = {...props.currentTask}
        if(!props.editTaskPopupIsActive)
            saveBtnIsDisabled.value = true
    });
</script>

<template>
    <pop-up
        :class="'popup-editor shedule-day__editor'"
        :isActive="editTaskPopupIsActive"
        @update:isActive="(newValue) => {(editTaskPopupIsActive=newValue)}"
        @input="saveBtnIsDisabled = false"
    >
    <div class="popup__title">
        <slot name="title"></slot>
    </div>
    <div class="popup__subtitle popup__subtitle_left">
        Зоголовок
    </div>
    <TheInput
        :modelValue="task.title"    
        :placeHolder="'Зоголовок...'"
        v-model="task.title"
        @update:modelValue="(newValue) => {(task.title=newValue)}"
        @input="saveBtnIsDisabled = false"
    />
    <div class="popup__subtitle popup__subtitle_left">
        Описание
    </div>
    <TheInput
        :modelValue="task.description"    
        :placeHolder="'Описание...'"
        v-model="task.description"
        @update:modelValue="(newValue) => {(task.description=newValue)}"
        @input="saveBtnIsDisabled = false"
    />
    <div class="popup__times">
        <div class="popup__times-col">
            <div class="popup__subtitle">
            Время начала
            </div>
            <TheInput
                type="time"
                :modelValue="task.time_from"    
                v-model="task.time_from"
                @update:modelValue="(newValue) => {(task.time_from=newValue)}"
                @input="saveBtnIsDisabled = false"
            />
        </div>
        <div class="popup__times-col">
            <div class="popup__subtitle">
            Время окончания
            </div>
            <TheInput
                type="time"
                :modelValue="task.time_to"    
                v-model="task.time_to"
                @update:modelValue="(newValue) => {(task.time_to=newValue)}"
                @input="saveBtnIsDisabled = false"
            />
        </div>
    </div>
    <div class="popup__date"
    v-if="editType != 'change'"
    >
        <div class="popup__subtitle">
            Дата
        </div>
        <TheInput
            type="date"
            :modelValue="task.date"    
            v-model="task.date"
            @update:modelValue="(newValue) => {(task.date=newValue)}"
        />
    </div>
    <TheButton class="auth-btn"
    @click="editType=='post' ? $emit('postRequest', task) : $emit('putRequest', task)"
    :disabled="saveBtnIsDisabled"
    >
    <slot name="btnText">
        Подтвердить
    </slot>
    </TheButton>
    </pop-up>

</template>

<style lang="scss" scoped>

</style>