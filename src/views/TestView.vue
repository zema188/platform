<script setup>

import { useUser } from '@/stores/user'
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, getDoc, setDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import CreateSingle from '@/components/tests/single/createSingle.vue';
import TestQuestionsList from '@/components/tests/TestQuestionsList.vue'

const router = useRouter()
const route = useRoute()
const user = useUser()
const loader = ref(true)
const uid = user.userInfo.user_id
const testId = route.params.id

const testInfo = ref({})
const testQuestions = ref([])
let asideIsActive = ref(true)
let dashboardIsActive = ref(true)
let createSingleIsActive = ref(false)
let createManyIsActive = ref(false)
let questionsListIsActive = ref(false)
const getTestData = async() => {
    try {
        testInfo.value = {}
        testQuestions.value = []

        const ref = doc(db, "tests", testId)
        const response = await getDoc(ref)

        testInfo.value = {...response.data()}
        testQuestions.value = [...testInfo.value.test_info]
        console.log(testQuestions.value)
    } catch(err) {

        console.error(err)

    }


}

const deleteQuestion = async(index) => {

    try {
        testInfo.value.test_info.splice(index,1)
        const ref = doc(db, "tests", testId);

        await updateDoc(ref, {
            ...testInfo.value
        });
        await getTestData()

    } catch(err) {

        console.error(err)

    }
}

function dateToLocal(date) {
    if(!date) return
    const timestamp = date.seconds + date.nanoseconds / 1e9;
    const formattedDate = new Date(timestamp * 1000);

    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const year = formattedDate.getFullYear();

    const formattedDateString = `${day}.${month}.${year}`;
    return formattedDateString;
}
onMounted( () => {
    getTestData()
})
</script>

<template>
    <div class="test">
        <div class="test__preview">
            <div class="test__preview-info block" :class="{'active': dashboardIsActive}">
                <div class="test__preview-info-item">
                    <font-awesome-icon :icon="['fas', 'calendar-days']" />
                    {{ dateToLocal(testInfo.date) }}
                </div>
                <div class="test__preview-info-item">
                    <font-awesome-icon :icon="['fas', 'people-group']" />
                    {{ dateToLocal(testInfo.date) }}
                </div>
                <div class="test__preview-info-item">
                    <font-awesome-icon :icon="['fas', 'question']" />
                    {{ dateToLocal(testInfo.date) }}
                </div>
            </div>
            <div class="test__quiestions-block block" :class="{'active': !dashboardIsActive}">
                <test-questions-list :class="{'active': questionsListIsActive}"
                    :questions="testQuestions"
                    @deleteQuestion="(index) => deleteQuestion(index)"
                />
                <create-single :class="{'active': createSingleIsActive}"
                    :testId="testId"
                    @closeCreating="() => createSingleIsActive=false"
                    @createAnswer="getTestData()"
                />
            </div>
            <div class="test__preview-action block">
                <div class="test__preview-action-item"
                    @click="createSingleIsActive=false, dashboardIsActive=true"
                >
                    <font-awesome-icon :icon="['fas', 'gauge']" />
                    Дашборд
                </div>
                <div class="test__preview-action-item"
                    @click="questionsListIsActive=true, dashboardIsActive=false"
                >
                    <font-awesome-icon :icon="['fas', 'clipboard-question']" />
                    Вопросы
                </div>
            </div>
        </div>
        <div class="test__aside block"
            :class="{'active': asideIsActive}"
        >
            <font-awesome-icon class="close" :icon="['fas', 'xmark']" 
                @click="asideIsActive = false"
            />
            <div class="test__aside-item" @click="createSingleIsActive=true, dashboardIsActive=false">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.4 3h13.2A2.4 2.4 0 0 1 21 5.4v13.2a2.4 2.4 0 0 1-2.4 2.4H5.4A2.4 2.4 0 0 1 3 18.6V5.4A2.4 2.4 0 0 1 5.4 3ZM8 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5 1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Zm0 6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Zm-7 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" fill="#000000"/></svg>
                    Одиночный выбор
                </span>
                <font-awesome-icon :icon="['fass', 'plus']" />
            </div>
            <div class="test__aside-item">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.4 3h13.2A2.4 2.4 0 0 1 21 5.4v13.2a2.4 2.4 0 0 1-2.4 2.4H5.4A2.4 2.4 0 0 1 3 18.6V5.4A2.4 2.4 0 0 1 5.4 3ZM8 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5 1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Zm0 6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Zm-7 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" fill="#000000"/></svg>
                    Множественный выбор
                </span>
                <font-awesome-icon :icon="['fass', 'plus']" />
            </div>
        </div>
        <div class="test__add-questions"
            @click="asideIsActive = true"
        >
            <font-awesome-icon :icon="['fass', 'plus']" />
        </div>
    </div>
</template>

<style lang="scss" >
.test {

&__preview {
    display: flex;
    gap: 20px;

}

&__preview-info {
    display: none;
    gap: 20px;
    justify-content: space-between;
    flex: 1;
    &.active {
        display: flex;
    }
}
&__quiestions-block {
    display: none;
    flex: 1;
    &.active {
        display: block;
    }
}
&__preview-info-item {
    display: flex;
    gap: 5px;
    flex-direction: column;
    align-items: center;
    & svg {
        width: 20px;
        height: 20px;
    }
}

&__preview-action {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
&__preview-action-item {
    display: flex;
    gap: 5px;
    cursor: pointer;
    & svg {
        width: 20px;
        height: 20px;
    }
}
&__add-questions {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    cursor: pointer;
    & svg {
        width: 30px;
        height: 30px;
        & path {
            fill: red;
        }
    }
}
}
.test {

&__aside {
    position: fixed;
    width: 300px;
    top: 0;
    height: 100vh;
    background: #fff;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 6;
    padding: 40px 10px 10px 10px;
    right: -100%;
    transition: .5s;
    &.active {
    transition: .5s;
        right: 0;
    }
    & .close {
        position: absolute;
        right: 3px;
        top: 3px;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
}

&__aside-item {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: space-between;
    cursor: pointer;
    & span {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    & svg {
        width: 20px;
        height: 20px;
    }
}
}


</style>