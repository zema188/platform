<script setup>
import { onMounted, ref } from 'vue';
import MyTestsHeader from '@/components/tests/MyTestsHeader.vue'
import CreateTest from './CreateTest.vue';
import MyTestsList from '@/components/tests/MyTestsLists.vue'
import ConfirmationActions from '@/components/ConfirmationActions.vue';

import { useUser } from '@/stores/user'
import TheLoader from '@/components/UI/TheLoader.vue'
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, addDoc, setDoc, onSnapshot, deleteDoc, updateDoc, getDocs  } from "firebase/firestore";

const user = useUser()
const loader = ref(true)
const uid = user.userInfo.user_id
const confirmationDeleteTest = ref(false)
let createTestPopupIsActive = ref(false)
const tests = ref([])




const getMyTests = async() => {
    try {
        const q = query(collection(db, "tests"), where("user_id", "==", uid));
        const response = await getDocs(q)

        tests.value.length = 0

        response.forEach((doc) => {

            const property = doc.data()
            property.id = doc.id
            tests.value.push(property)

        });

    } catch (err) {

        console.error("error get", err);
        
    } 
}


let deleteTestId = ref(null)
const deleteTest = async(confirm) => {
    if(!confirm) {
        confirmationDeleteTest.value = false
        return
    }
    try {
        console.log(deleteTestId.value)
        await deleteDoc(doc(db, "tests", deleteTestId.value));
        getMyTests()
        confirmationDeleteTest.value = false
        deleteTestId.value = null
    } catch (err) {
        console.error("error delete test", err);
    }
}
onMounted(() => {
    getMyTests()
})
</script>

<template>
    <div class="tests__my">
        <my-tests-header
            @openCreateTestPopup="() => createTestPopupIsActive = true"
        />
        <create-test
            :createTestPopupIsActive="createTestPopupIsActive"
            @update:isActive="(newValue) => {(createTestPopupIsActive=newValue)}"
            @createTest="getMyTests()"
        />
        <my-tests-list
            :tests="tests"
            @deleteTest="(id) => {confirmationDeleteTest = !confirmationDeleteTest, deleteTestId = id}"
        />
        <confirmation-actions
            :isActive="confirmationDeleteTest"
            @update:isActive="(newValue) => {(confirmationDeleteTest=newValue)}"
            @answer="(answer) => deleteTest(answer)"
        >
            <template v-slot:text>
                Вы действительно удалить тест 
                <span>
                    удалить тест ?
                </span>
            </template>
            <template v-slot:btnYes>
                Да, удалить
            </template>
            <template v-slot:btnNo>
                Отмена
            </template>
        </confirmation-actions>
    </div>
</template>

<style lang="scss" scoped>

</style>
<!-- @deleteTest="(id) => deleteTest(id)" -->