<script setup>
import ScheduleDayList from './ScheduleDayList.vue';
import { onMounted, ref } from 'vue';
import ScheduleDayEditor from './ScheduleDayEditor.vue';
import ScheduleCopyTasks from './ScheduleCopyTasks.vue';
import { useUser } from '@/stores/user'
import TheLoader from './UI/TheLoader.vue'
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, addDoc, setDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const user = useUser()
const loader = ref(true)
const uid = user.userInfo.user_id

let tasksDay = ref([])
let currentTask = ref({})
let addNewTaskPopupIsActive = ref(false)
let editTaskPopupIsActive = ref(false)
let copyTasksIsActive = ref(false)
let currentDateInDayList = ref(new Date())


function getTasksDay (date) {
    try {
        date = dateToLocal(date);
        const q = query(collection(db, "tasks"), where("user_id", "==", uid), where("date", "==", date));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            tasksDay.value = [];

            snapshot.forEach((doc) => {
                let property = doc.data();
                // property.id = doc.id;
                tasksDay.value.push(property);
            });

            if (!tasksDay.value.length) {
                loader.value = false;
                return;
            }

            tasksDay.value.sort((a, b) => a.time_from.localeCompare(b.time_from));
            loader.value = false;
        });

        return unsubscribe;
    } catch (err) {
        console.error("error get", err);
    } 
};
let tasksDayWatcher = null

const postTask = async (task) => {
    try {
        const tasksCollectionRef = collection(db, "tasks");
        const docRef = doc(tasksCollectionRef); // Создаем документ без указания идентификатора

        const response = await setDoc(docRef, {
            ...task,
            user_id: uid,
            id: docRef.id // Добавляем сгенерированный идентификатор в поле id
        });

        console.log("New task document ID:", docRef.id);
    } catch (error) {
        console.error("Error posting task: ", error);
    }
};

const postListTasks = async (tasks) => {
    for (const task of tasks) {
        if(!task.hasOwnProperty('copy')){
            await postTask(task);
        }
        if(task.copy) {
            delete task.copy
            await postTask(task);
        }
    }
    tasksDayWatcher = getTasksDay(currentDateInDayList.value)
};

const putTask = async(task) => {
    try {
        const docRef = doc(collection(db, "tasks"), task.id);

        await updateDoc(docRef, {
            ...task,
        });
    } catch(err) {
        console.error(err)
    }
}

const deleteTask = async (taskId) => {
    try {
        await deleteDoc(doc(db, "tasks", taskId));
    } catch (err) {
        console.error("error delete task", err);
    }
}


const editingTask = (task) => {
    currentTask.value = task
    editTaskPopupIsActive.value = true
}

function dateToLocal(date) {
    if(typeof(date) == 'object')
    return date.toLocaleDateString('en-CA')

    if(typeof(date) == 'number') {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = ('0' + (newDate.getMonth() + 1)).slice(-2);
        const day = ('0' + newDate.getDate()).slice(-2);

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }
}

// Форматирует переданное время в формат "чч:00"
const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    return `${hours}:00`;
}

// Добавляет указанное количество часов к переданному времени
const addHours = (date, hours) => {
    const newDate = new Date(date.getTime());
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
}
const getMonthName = (date) => {
    const monthFormat = new Intl.DateTimeFormat('ru-RU', { month: 'long' });
    return monthFormat.format(date);
}
onMounted(() => {
    // getTasksDay(currentDateInDayList.value)
    tasksDayWatcher = getTasksDay(currentDateInDayList.value)
})
</script>

<template>
    <div class="schedule-day block">
        <div class="schedule-day__header">
            <div class="schedule-day__header-info">
                <div class="schedule-day__title"
                >
                    Расписание
                    {{ getMonthName(currentDateInDayList) }}
                </div>
                <div class="schedule-day__date">
                    {{ `${currentDateInDayList.toLocaleDateString('ru-RU', { weekday: 'long' })} ${currentDateInDayList.getDate()}` }}
                </div>
                <div class="schedule-day__arrows">
                    <div class="schedule-day__arrow schedule-day__arrow-prev"
                    @click="tasksDayWatcher = getTasksDay((currentDateInDayList.setDate(currentDateInDayList.getDate() - 1)))"
                    >
                        <svg
                            version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                                <polygon style="fill:#93D16B;" points="502.312,256.169 317.965,99.457 306.222,176.41 48.439,176.41 9.688,335.929 281.878,335.929 270.185,412.541 ">
                                </polygon>
                                <path d="M89.942,335.93c0-5.35-4.338-9.688-9.688-9.688H22.01l34.044-140.144h250.168c4.786,0,8.855-3.495,9.577-8.227l9.123-59.785 l48.535,41.259c4.077,3.464,10.191,2.968,13.656-1.106c3.466-4.077,2.97-10.19-1.106-13.656l-61.766-52.507 c-2.676-2.275-6.373-2.924-9.664-1.695c-3.29,1.228-5.658,4.142-6.187,7.615l-10.489,68.726H48.439c-4.469,0-8.359,3.057-9.414,7.4 L0.274,333.643c-0.701,2.888-0.039,5.938,1.798,8.275s4.644,3.701,7.616,3.701h70.567C85.605,345.618,89.942,341.28,89.942,335.93z"></path> <path d="M508.587,248.788l-92.958-79.023c-4.077-3.466-10.192-2.97-13.656,1.106c-3.466,4.077-2.97,10.19,1.106,13.656 l83.223,70.747L283.096,392.163l8.359-54.772c0.426-2.793-0.388-5.631-2.228-7.773c-1.841-2.143-4.525-3.375-7.348-3.375H119.005 c-5.35,0-9.688,4.338-9.688,9.688c0,5.35,4.338,9.688,9.688,9.688h151.593l-9.99,65.462c-0.58,3.801,1.143,7.587,4.392,9.645 c1.585,1.004,3.386,1.505,5.185,1.505c1.89,0,3.778-0.553,5.412-1.653l232.127-156.37c2.514-1.693,4.091-4.467,4.26-7.493 C512.154,253.687,510.897,250.752,508.587,248.788z">
                                </path>
                        </svg>
                    </div>
                    <div class="schedule-day__arrow schedule-day__arrow-next"
                    @click="tasksDayWatcher = getTasksDay((currentDateInDayList.setDate(currentDateInDayList.getDate() + 1)))"
                    >
                        <svg
                            version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000">
                                <polygon style="fill:#93D16B;" points="502.312,256.169 317.965,99.457 306.222,176.41 48.439,176.41 9.688,335.929 281.878,335.929 270.185,412.541 ">
                                </polygon>
                                <path d="M89.942,335.93c0-5.35-4.338-9.688-9.688-9.688H22.01l34.044-140.144h250.168c4.786,0,8.855-3.495,9.577-8.227l9.123-59.785 l48.535,41.259c4.077,3.464,10.191,2.968,13.656-1.106c3.466-4.077,2.97-10.19-1.106-13.656l-61.766-52.507 c-2.676-2.275-6.373-2.924-9.664-1.695c-3.29,1.228-5.658,4.142-6.187,7.615l-10.489,68.726H48.439c-4.469,0-8.359,3.057-9.414,7.4 L0.274,333.643c-0.701,2.888-0.039,5.938,1.798,8.275s4.644,3.701,7.616,3.701h70.567C85.605,345.618,89.942,341.28,89.942,335.93z"></path> <path d="M508.587,248.788l-92.958-79.023c-4.077-3.466-10.192-2.97-13.656,1.106c-3.466,4.077-2.97,10.19,1.106,13.656 l83.223,70.747L283.096,392.163l8.359-54.772c0.426-2.793-0.388-5.631-2.228-7.773c-1.841-2.143-4.525-3.375-7.348-3.375H119.005 c-5.35,0-9.688,4.338-9.688,9.688c0,5.35,4.338,9.688,9.688,9.688h151.593l-9.99,65.462c-0.58,3.801,1.143,7.587,4.392,9.645 c1.585,1.004,3.386,1.505,5.185,1.505c1.89,0,3.778-0.553,5.412-1.653l232.127-156.37c2.514-1.693,4.091-4.467,4.26-7.493 C512.154,253.687,510.897,250.752,508.587,248.788z">
                                </path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="schedule-day__copy-day"
                @click="copyTasksIsActive = true"
            >
                <font-awesome-icon :icon="['fass', 'file-import']" style="color: rgb(0 64 255);" />
            </div>
            <!-- <font-awesome-icon :icon="['fas', 'copy']" />
            <font-awesome-icon :icon="['fas', 'paste']" /> -->
            <div class="schedule-day__add-task"
            @click="addNewTaskPopupIsActive = true"
            >
                <svg 
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 4H18V18H4V30H18V44H30V30H44V18H30V4Z"
                        fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round">
                    </path>
                </svg>
            </div>
        </div>
        <TheLoader
            class="welcome__loader"
            v-if="loader"
        />
        <div 
            class=""
            v-if="!tasksDay.length && !loader"
        >
        Записей нет
        </div>
        <schedule-day-list
            :tasksDay="tasksDay"
            @deleteTask="(taskId) => deleteTask(taskId)"
            @editTask="(task) => editingTask(task)"
        />
        <ScheduleDayEditor
            :editTaskPopupIsActive="addNewTaskPopupIsActive"
            :currentTask="{
                date: currentDateInDayList.toLocaleDateString('en-CA'),
                time_from: formatTime(new Date()),
            }"
            :editType="'post'"
            @update:isActive="(newValue) => {(addNewTaskPopupIsActive=newValue)}"
            @postRequest="(task) => {postTask(task)}"
        >
            <template v-slot:title>
                Создание заметки
            </template>
            <template v-slot:btnText>
                Создать
            </template>
        </ScheduleDayEditor>
        <ScheduleDayEditor
            :editTaskPopupIsActive="editTaskPopupIsActive"
            :currentTask="currentTask"
            :editType="'put'"
            @update:isActive="(newValue) => {(editTaskPopupIsActive=newValue)}"
            @putRequest="(task) => {putTask(task)}"
        >
            <template v-slot:title>
                Редактирование заметки
            </template>
            <template v-slot:btnText>
                Сохранить
            </template>
        </ScheduleDayEditor>
        <ScheduleCopyTasks
            :copyTasksPopupIsActive="copyTasksIsActive"
            :listTasks="tasksDay"
            :dateStart="currentDateInDayList.toLocaleDateString('en-CA')"
            @update:isActive="(newValue) => {(copyTasksIsActive=newValue)}"
            @postCopyTasks="(tasksList) => {postListTasks(tasksList)}"
        >
        </ScheduleCopyTasks>
    </div>
    <!-- <div class="icon"
    v-for="(icon, index) in icons" :key="icon"
    >
      <font-awesome-icon :icon="['fas', icon]" />
    </div> -->
</template>


<style lang="scss" scoped>
.schedule-day {
    flex: 1;
    max-width: 546px;
    margin: 0 auto;
    padding: 40px;
    &__header {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        align-items: center;
        padding-bottom: 30px;
    }

    &__header-info {
        display: flex;
        flex-wrap: wrap;
        column-gap: 10px;
        flex: 1;
    }

    &__title {
        font-size: 35px;
        flex: 0 0 100%;
        line-height: 39px;
    }

    &__date {
        font-size: 25px;
        color: #782cee;
        width: 200px;
    }

    &__arrows {
        display: flex;
        gap: 8px;
        align-items: center;
        height: fit-content;
        margin-top: -6px;
    }

    &__arrow {
        cursor: pointer;
        display: flex;
        align-items: flex-start;
        & svg {
            width: 35.6px;
            height: 35.6px;
        }
        &-prev {
            & svg {
                transform: rotate(180deg);
            }
        }
    }

    &__add-task {
        cursor: pointer;
        flex: 0;
        & svg {
            width: 48px;
            height: 48px;
        }
    }
    &__copy-day {
        cursor: pointer;
        & svg {
            width: 50px;
            height: 50px;
        }
    }
}

</style>