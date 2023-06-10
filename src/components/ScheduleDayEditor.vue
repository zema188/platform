

<script setup>
    import PopUp from '@/components/UI/Popup.vue';
    import TheInput from '@/components/UI/TheInput.vue';
    import TheButton from './UI/TheButton.vue';
    import { ref } from 'vue';
    import { getDatabase, ref as dbRef, set, push, child } from "firebase/database";
    import { useUser } from '@/stores/user'
    import axios from 'axios';


    let props = defineProps({
        addNewTaskPopupIsActive: {
            type: Boolean,
            required: true,
        }
    })

    let taskTitle = ref('тестовое')
    let taskDescription = ref('тестовое описание')
    let taskFrom = ref('15:25')
    let taskTo = ref('15:35')
    let date = ref(new Date().toLocaleDateString('en-CA'))

    const user = useUser()

    const postTask = async () => {
        try {
            const db = getDatabase();
            const newTaskKey = push(child(dbRef(db), 'tasks')).key;
            const uid = user.userInfo.uid
            let response = await axios.post(`https://platform-89f1c-default-rtdb.firebaseio.com/users/${uid}/tasks/${date.value}.json`, {
                title: taskTitle.value,
                description: taskDescription.value,
                time_from: taskFrom.value,
                time_to: taskTo.value,
            });
            console.log(response)
        } catch(err) {
            console.error(err)
        }
        // set(dbRef(db, `users/${uid}/tasks/${taskDate.value}/${newTaskKey}`), {
        //     title: taskTitle.value,
        //     description: taskDescription.value,
        //     time_from: taskFrom.value,
        //     time_to: taskTo.value,
        // });
    }
</script>

<template>
    <pop-up
        :class="'popup-editor shedule-day__editor'"
        :isActive="addNewTaskPopupIsActive"
        @update:isActive="(newValue) => {(addNewTaskPopupIsActive=newValue)}"
    >
    <div class="popup__title">
        Добавление заметки
    </div>
    <TheInput
        :modelValue="taskTitle"    
        :placeHolder="'Название'"
        v-model="taskTitle"
        @update:modelValue="(newValue) => {(taskTitle=newValue)}"
    />
    <TheInput
        :modelValue="taskDescription"    
        :placeHolder="'Описание'"
        v-model="taskDescription"
        @update:modelValue="(newValue) => {(taskDescription=newValue)}"
    />
    <div class="popup__times">
        <div class="popup__times-col">
            <div class="popup__subtitle">
            Время начала
            </div>
            <TheInput
                type="time"
                :modelValue="taskFrom"    
                v-model="taskFrom"
                @update:modelValue="(newValue) => {(taskFrom=newValue)}"
            />
        </div>
        <div class="popup__times-col">
            <div class="popup__subtitle">
            Время окончания
            </div>
            <TheInput
                type="time"
                :modelValue="taskTo"    
                v-model="taskTo"
                @update:modelValue="(newValue) => {(taskTo=newValue)}"
            />
        </div>
    </div>
    <div class="popup__subtitle">
        Дата
    </div>
    <TheInput
        type="date"
        :modelValue="date"    
        v-model="taskDate"
        @update:modelValue="(newValue) => {(date=newValue)}"
    />
    <TheButton class="auth-btn"
    @click="postTask()"
    >
        Добавить
    </TheButton>
    </pop-up>

</template>

<style lang="scss" scoped>

</style>