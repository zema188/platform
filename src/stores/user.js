import { ref } from 'vue'
import { defineStore } from 'pinia'
import { collection, where, query, doc, getDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase/config.js'


export const useUser = defineStore('user', () => {
    const userInfo = ref({
        // token: '',
        // email: '',
        // uid: '',
        // refreshToken: '',
        // expiresIn: ''
    });

    const userIsLoggedIn = ref(false)

    const logOutUser = () => {
        for (let property of Object.keys(userInfo.value)) {
            userInfo.value[property] = '';
        }
        userIsLoggedIn.value = false
    }

    const getInfoUser = async (id) => {
        try {
            const docRef = doc(db, "users", id);
            const response = await getDoc(docRef)
            userInfo.value = {
                ...response.data()
            }
        } catch(err) {
            console.error(err)
        }
    }


    
    return { userInfo, userIsLoggedIn, logOutUser, getInfoUser }
})