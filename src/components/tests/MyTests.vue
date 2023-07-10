<script setup>
import { onMounted, ref } from 'vue';
import MyTestsHeader from '@/components/tests/MyTestsHeader.vue'
import CreateTest from './CreateTest.vue';
import MyTestsList from '@/components/tests/MyTestsLists.vue'

import { useUser } from '@/stores/user'
import TheLoader from '@/components/UI/TheLoader.vue'
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, addDoc, setDoc, onSnapshot, deleteDoc, updateDoc, getDocs  } from "firebase/firestore";

const user = useUser()
const loader = ref(true)
const uid = user.userInfo.user_id

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

const deleteTest = async(testId) => {
    try {
        await deleteDoc(doc(db, "tests", testId));
        getMyTests()
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
            @deleteTest="(id) => deleteTest(id)"
        />
    </div>
</template>

<style lang="scss" scoped>

</style>