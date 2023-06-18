import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUser } from './user'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from 'vue-router'
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { collection, where, query, setDoc, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '@/firebase/config.js'


// const apiKey = import.meta.env.API_KEY_FIREBASE;
// const apiKey = 'AIzaSyDHVm4_wl2OyrXes6S2O33RturQ1boQDLI'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const user = useUser()
    const error = ref('');
    const loader = ref(false);
    const auth = getAuth()
    const signUp = async (email, password, firstName) => {
        try {
            error.value = ''
            loader.value = !loader.value
            let response = await createUserWithEmailAndPassword(getAuth(), email, password)
            const docRef = doc(db, 'users', response.user.uid);
            await setDoc(docRef, {
                user_id: response.user.uid,
                email: email,
                first_name: firstName,
                createdAt: response.user.metadata.creationTime,
                emailVerified: false,
                profile_avatar: 'default',
            });
            user.userIsLoggedIn = true
            router.push('/login')
        } catch(err) {
            console.error(err)
            error.value = err.code  
            throw error.value;
        } finally {
            loader.value = !loader.value
        }
    }
    const signIn = async (email, password) => {
        try {
            error.value = ''
            loader.value = !loader.value
            let response = await signInWithEmailAndPassword(auth, email, password)
            user.userIsLoggedIn = true
            router.push('/')
        } catch(err) {
            console.error(err)
            error.value = err.code
            throw error.value;
        } finally {
            loader.value = !loader.value
        }
    }
    const signOutUser = async () => {
        try {
            let response = await signOut(auth)
            user.logOutUser()
            router.push('/login')
        } catch(err) {
            console.error(err)
            error.value = err.code
            throw error.value;
        }
    }
    return { signUp, signIn, signOutUser, error, loader, }
})





