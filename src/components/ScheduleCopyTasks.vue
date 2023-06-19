

<script setup>
import PopUp from '@/components/UI/Popup.vue';
import ScheduleDayList from './ScheduleDayList.vue';
import TheInput from '@/components/UI/TheInput.vue';
import TheButton from './UI/TheButton.vue';
import ScheduleDayEditor from './ScheduleDayEditor.vue';
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, addDoc, onSnapshot, deleteDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";

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
const copyBtnIsDisabled = ref(true)

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

const user = useUser()
const uid = user.userInfo.user_id

const getTasksByDate = async (date) => {
    try {
        const q = query(collection(db, "tasks"), where("user_id", "==", uid), where("date", "==", date));
        const querySnapshot = await getDocs(q)
        copyList.value = []
        querySnapshot.forEach((doc) => {
            let property = doc.data();
                property.id = doc.id;
                copyList.value.push(property);
        })
    } catch(err) {
        console.error(err)
    }
}
const tasksAddNewDate = (date) => {
    if(!dateFrom.value)
        return
    for(let i = 0; i < copyList.value.length; i++) {
        copyList.value[i].date = date
    }
    console.log(copyList.value)
    copyBtnIsDisabled.value = !dateTo.value
}
watch(
  () => props.copyTasksPopupIsActive,
  () => {
      dateFrom.value = props.dateStart;
      dateTo.value = ''
      copyBtnIsDisabled.value = true
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
                    @input="(e) => getTasksByDate(e.target.value)"
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
                    @input="(e) => tasksAddNewDate(e.target.value)"
                />
            </div>
        </div>
        <span
        v-if="!copyList.length"
        >
            Нет расписания на этот день
        </span>
        <schedule-day-list
            :class="'schedule-day__list_copy'"
            :tasksDay="copyList"
            @deleteTask=" (taskId) => deleteTask(taskId)"
            @editTask="(task) => editTask(task)"
        />
        <TheButton class="auth-btn"
            :disabled="copyBtnIsDisabled"
            @click="$emit('postCopyTasks', copyList)"
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