<script setup>
import TheInput from '@/components/UI/TheInput.vue'
import TheTextarea from '@/components/UI/TheTextarea.vue'
import TheButton from '@/components/UI/TheButton.vue'
import AnswersList from '@/components/tests/AnswersList.vue'
import { ref, watch } from 'vue'
import { useUser } from '@/stores/user'
import { db } from '@/firebase/config.js'
import { collection, where, query, doc, arrayUnion, addDoc, setDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
const props = defineProps({
    testId: {
        type: String,
        required: true,
    }
})

let saveBtnIsDisabled = ref(true)
const answers = ref([
    {
        text: '',
        points: 0,
    },
    {
        text: '',
        points: 0,
    },
])

let question = ref('')

function addAnswer() {
    answers.value.push({
        text: '',
        points: 0,
    })
}
function deleteAnswer(index) {
    answers.value.splice(index,1)
}

const createAnswer = async () => {
    try {

        if(!answers.value.length) return 0
        const docRef = doc(collection(db, "tests"), props.testId)
        await updateDoc(docRef, {
            test_info: arrayUnion({
                type: 'Single',
                question: question.value,
                answers: answers.value,
            })
        });
        this.$emit('createAnswer');
    } catch (error) {
        console.error("Error posting test: ", error);
    }
}

watch (
  [() => answers.value, () => question.value],
  () => {
    if(answers.value.length && question.value.length) {
        console.log('test')
        saveBtnIsDisabled.value = false
    } else [
        saveBtnIsDisabled.value = true
    ]
},{deep:true});

    
</script>

<template>
    <div class="test__single test__create-question">
        <font-awesome-icon class="close" :icon="['fas', 'xmark']" 
                @click="$emit('closeCreating')"
        />
        <span class="subtitle">
            Текст вопроса
        </span>
        <the-textarea class="question-text"
            :modelValue="question"
            v-model="question"
            @update:modelValue="(newValue) => {(question=newValue)}"
        />
        <div class="answers__top">
            <span class="subtitle">
                Варианты ответов
            </span>
            <the-button
                @click="addAnswer()"
            >
                Добавить
            </the-button>
        </div>
        <answers-list
            :answers="answers"
            @delete="deleteAnswer()"
        />
        <the-button
            @click="createAnswer()"
            :disabled="saveBtnIsDisabled"
        >
            Сохранить
        </the-button>
    </div>
</template>

<style lang="scss" >
.test {
&__create-question {
    padding-top: 20px;
    display: none;
    position: relative;
    &.active {
        display: block;
    }
    & .subtitle {
        margin-bottom: 5px;
    }   
    & .close {
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
}
&__single{
    width: 100%;
}
}
.subtitle {
    display: block;
}
.question-text {
    margin-bottom: 20px;
}
.answers__top {
    display: flex;
    justify-content: space-between;
}
</style>