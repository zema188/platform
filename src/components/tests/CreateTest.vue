<script setup>
import { ref } from 'vue'
import PopUp from '@/components/UI/PopUp.vue'
import TheInput from '@/components/UI/TheInput.vue'
import TheButton from '@/components/UI/TheButton.vue'

import { useUser } from '@/stores/user'
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, addDoc, setDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";

const props = defineProps({
    createTestPopupIsActive: {
        type: Boolean,
        required: true
    }
})

const user = useUser()
const uid = user.userInfo.user_id

let testName = ref("")

const createTest = async () => {
    try {
        const testCollection = collection(db, "tests");
        const docRef = doc(testCollection);

        const response = await setDoc(docRef, {
            user_id: uid,
            date: new Date(),
            name: testName.value,
            passed: 0,
            number_of_questions: 0,
            test_info: [],
        });

        
    } catch(err) {
        console.error("Error create task: ", err);
    }
}
</script>

<template>
    <pop-up
    :class="'popup-create-test'"
    :isActive="createTestPopupIsActive"
    @update:isActive="(newValue) => {(createTestPopupIsActive=newValue)}"
    >
        <div class="popup-create-test__header">
            <div class="popup-create-test__title">
                Добавление нового теста
            </div>
        </div>
        <div class="popup-create-test__content">
            <div class="popup-create-test__subtitle">
                Введите название теста
            </div>
            <the-input
                :modelValue="testName"    
                @update:modelValue="(newValue) => {(testName=newValue)}"
                :type="'text'"
            />
        </div>
        <div class="popup-create-test__footer">
            <the-button
                @click="createTest(), $emit('createTest')"
            >
                Добавить
            </the-button>
            <the-button
                @click="$emit('update:isActive', false)"
            >
                Отмена
            </the-button>
        </div>
    </pop-up>
</template>

<style lang="scss" scoped>
.popup-create-test {

&__header {
}

&__title {
    font-size: 20px;
    margin-bottom: 20px;
}

&__content {
    margin-bottom: 30px;
}

&__subtitle {
}

&__footer {
    display: flex;
    gap: 5px;
}
}

</style>