<script setup>
    import ScheduleDayList from './ScheduleDayList.vue';
    import { getDatabase, ref as dbRef, onValue, query, orderByChild, limitToFirst, orderByValue, equalTo, orderByKey } from "firebase/database";
    import { onMounted, ref } from 'vue';
    import ScheduleDayEditor from './ScheduleDayEditor.vue';
    import { useUser } from '@/stores/user'
    import TheLoader from './UI/TheLoader.vue'
    import axios from 'axios';

    const db = getDatabase();
    const user = useUser()
    const loader = ref(true)
    const uid = user.userInfo.uid

    let tasksDay = ref([])
    let currentTask = ref({})
    let addNewTaskPopupIsActive = ref(false)
    let editTaskPopupIsActive = ref(false)
    let currentDateInDayList = ref(new Date())

    const getTasksDay = async (date) => {
        date = dateToLocal(date)
        const uid = user.userInfo.uid
        const filterDay = query(dbRef(db, `users/${uid}/tasks`), orderByChild('date'), equalTo(date),);
        try {
            onValue(filterDay, async (snapshot) => {
                tasksDay.value = [];
                const data = snapshot.val();
                if (data == null) {
                    loader.value = false
                    return;
                }
                for (let [key, value] of Object.entries(data)) {
                    let property = value
                    property.id = key
                    tasksDay.value.push(property)
                }
                tasksDay.value.sort((a, b) => a.time_from.localeCompare(b.time_from));
                loader.value = false
                console.log(snapshot.val())
        });
        } catch (error) {
            console.error(error);
        }
    }


    const postTask = async (task) => {
        try {
            const uid = user.userInfo.uid
            let response = await axios.post(`https://platform-89f1c-default-rtdb.firebaseio.com/users/${uid}/tasks.json`, {
                title: task.title,
                description: task.description,
                time_from: task.time_from,
                time_to: task.time_to,
                date: task.date
            });
            console.log(response)
        } catch(err) {
            console.error(err)
        }
    }

    const putTask = async(task) => {
        try {
            const uid = user.userInfo.uid
            let response = await axios.put(`https://platform-89f1c-default-rtdb.firebaseio.com/users/${uid}/tasks/${task.id}.json`, {
                title: task.title,
                description: task.description,
                time_from: task.time_from,
                time_to: task.time_to,
                date: task.date
            });
            console.log(response)
        } catch(err) {
            console.error(err)
        }
    }

    const deleteTask = async (taskId) => {
        try {
            let response = await axios.delete(`https://platform-89f1c-default-rtdb.firebaseio.com/users/${uid}/tasks/${taskId}.json`, {
                
            })
            console.log(response)
        } catch(err) {
            console.error(err)
        }
    }


    const editingTask = (task) => {
        currentTask.value = task
        editTaskPopupIsActive.value = true
    }

    const dateToLocal = (date) => {
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
    onMounted(() => {
        getTasksDay(currentDateInDayList.value)
    })
</script>

<template>
    <div class="schedule-day">
        <div class="schedule-day__header">
            <div class="schedule-day__header-info">
                <div class="schedule-day__title">
                    Расписание на сегодня
                </div>
                <div class="schedule-day__date">
                    {{ `${currentDateInDayList.toLocaleDateString('ru-RU', { weekday: 'long' })} ${currentDateInDayList.getDate()}` }}
                </div>
                <div class="schedule-day__arrows">
                    <div class="schedule-day__arrow schedule-day__arrow-prev"
                    @click="getTasksDay((currentDateInDayList.setDate(currentDateInDayList.getDate() - 1)))"
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
                    @click="getTasksDay((currentDateInDayList.setDate(currentDateInDayList.getDate() + 1)))"
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
    </div>

</template>


<style lang="scss" scoped>
.schedule-day {
    flex: 0 0 calc(33.333%);
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
}

</style>