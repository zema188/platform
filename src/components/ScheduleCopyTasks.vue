

<script setup>
import PopUp from '@/components/UI/Popup.vue';
import ScheduleDayList from './ScheduleDayList.vue';
import TheInput from '@/components/UI/TheInput.vue';
import TheButton from './UI/TheButton.vue';
import ScheduleDayEditor from './ScheduleDayEditor.vue';

import { watch , ref } from 'vue';
import { getDatabase, ref as dbRef, set, push, child } from "firebase/database";
import { useUser } from '@/stores/user'


let props = defineProps({
    copyTasksPopupIsActive: {
        type: Boolean,
        required: true,
    },
    listTasks: {
        type: Array,
        required: false,
    },
    dateStart: {
        type: String,
        required: false,
    }
})
let dateFrom = ref('')
let dateTo = ref('')
let copyList = ref([])
let currentEditTask = ref({})
const editTaskPopupIsActive = ref(false)
const deleteTask = (taskId) => {
    const index = copyList.value.findIndex(obj => obj.id == taskId)
    if(!copyList.value[index].copy) {
        copyList.value[index].copy = true  
        return
    }
    copyList.value[index].copy = false
}
const editTask = (task) => {
    editTaskPopupIsActive.value = true
    currentEditTask.value = JSON.parse(JSON.stringify(task))
}
const changeTask = (task) => {
    editTaskPopupIsActive.value = false
    const index = copyList.value.findIndex(obj => obj.id == task.id)
    copyList.value[index] = {
        ...task
    }
}
watch(
  () => props.copyTasksPopupIsActive,
  () => {
      console.log(props.listTasks)
      dateFrom.value = props.dateStart;
      copyList.value = JSON.parse(JSON.stringify(props.listTasks));
  },
);
</script>

<template>
    <pop-up
        :class="'popup-editor shedule-day__editor'"
        :isActive="copyTasksPopupIsActive"
        @update:isActive="(newValue) => {(copyTasksPopupIsActive=newValue)}"
    >
        <div class="popup__title">
            Копирование расписания
        </div>
        <div class="popup__times">
            <div class="popup__times-col">
                <div class="popup__subtitle">
                    С какого дня
                </div>
                <TheInput
                    type="date"
                    :modelValue="dateFrom"    
                    v-model="dateFrom"
                    @update:modelValue="(newValue) => {(dateFrom=newValue)}"
                />
            </div>
            <div class="popup__times-col">
                <div class="popup__subtitle">
                    На какой день
                </div>
                <TheInput
                    type="date"
                    :modelValue="dateTo"    
                    v-model="dateTo"
                    @update:modelValue="(newValue) => {(dateTo=newValue)}"
                />
            </div>
        </div>
        <schedule-day-list
            :class="'schedule-day__list_copy'"
            :tasksDay="copyList"
            @deleteTask=" (taskId) => deleteTask(taskId)"
            @editTask="(task) => editTask(task)"
        />
        <TheButton class="auth-btn"
            @click="editType=='post' ? $emit('postRequest', task) : $emit('putRequest', task)"
            >
                Копировать
        </TheButton>
        <ScheduleDayEditor
            :editTaskPopupIsActive="editTaskPopupIsActive"
            :currentTask="currentEditTask"
            :editType="'change'"
            @update:isActive="(newValue) => {(editTaskPopupIsActive=newValue)}"
            @putRequest="(task) => {changeTask(task)}"
        >
            <template v-slot:title>
                Редактирование заметки
            </template>
            <template v-slot:btnText>
                Сохранить
            </template>
        </ScheduleDayEditor>
    </pop-up>

</template>

<style lang="scss" >
.schedule-day__list {
    &_copy {
        & .schedule-day__item {
            background: #8dfb8d;
                &.disabled {
                    & .disabled-block {
                    opacity: 1;
                    z-index: 2;
                }
            }
        }
    }
}
</style>