<script setup>
import ChatList from '../components/chat/ChatMassegesList.vue';
import { onMounted, ref } from 'vue';
import { storage, db } from '@/firebase/config.js'
import { collection, where, query, doc, getDoc, onSnapshot, setDoc, orderBy } from "firebase/firestore";
import { ref as  frRef, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
import { useUser } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'
import TheInput from '../components/UI/TheInput.vue';
import ChatFiles from '../components/chat/ChatFiles.vue';
import ImagesSwiper from '../components/chat/ImagesSwiper.vue';
import PopUp from '@/components/UI/PopUp.vue'

const router = useRouter()
const route = useRoute()
const user = useUser()
const friendInfo = ref({})
const chatMessages = ref([])
let swiperImagesPopupIsActive = ref(false)
let attachFiles= ref([])
let files = ref([])
let allImagesInChat = ref([])
let currentImageActive = ref(0)

let fieldMessage = ref('')
let chatId = ref('')

const accessCheck = async() => {
    try {
        const chachUsersDoc = doc(db, `chats/${chatId}`)

        const response = await getDoc(chachUsersDoc)

        return(response.data().participator.includes(user.userInfo.user_id))
    } catch(err) {
        console.error(err)
    }
}

const getFreindInfo = async() => {

    try {
        const freindDoc = doc(db, `users/${friendInfo.value.id}`)

        const response = await getDoc(freindDoc)
        friendInfo.value.profile_avatar = response.data().profile_avatar
        friendInfo.value.first_name = response.data().first_name
        friendInfo.value.last_name = response.data().last_name
    } catch(err) {
        console.error(err)
    }
}

const getChatUsersInfo = async() => {
    try {
        const chachUsersDoc = doc(db, `chats/${chatId}`)

        const response = await getDoc(chachUsersDoc)

        friendInfo.value.id = user.userInfo.user_id === response.data().participator[0]
        ? response.data().participator[1]
        : response.data().participator[0]

    } catch(err) {
        console.error(err)
    }
}

const getChatMessages = async () => {
    try {
        const q = query(collection(db, "messages"),
        where("chat_id", "==", chatId),
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            chatMessages.value = []
            querySnapshot.forEach((doc) => {
                const messageInfo = {
                    message_id: doc.id,
                    ...doc.data()
                }
                chatMessages.value.push(messageInfo)
            });

            chatMessages.value.sort((a, b) => {
                const dateA = a.date_create.toDate();
                const dateB = b.date_create.toDate();
                return dateB - dateA;
            });
        });

        
        return unsubscribe;
    } catch (err) {
        console.error(err);
    }
};



const sendMessage = async () => {
    try {
        if(checkEmptySpaces(fieldMessage.value) && !attachFiles.value.length)
            return
        const messageCollection = collection(db, "messages") 
        const messageDoc = doc(messageCollection)

        const savedFiles = await Promise.all(files.value.map(file => saveFilesInStorage(file)));
        const response = await setDoc(messageDoc, {
            chat_id: chatId,
            date_create: new Date(),
            message_text: fieldMessage.value,
            user_id: user.userInfo.user_id,
            files: savedFiles,
        })
        fieldMessage.value = ''
        attachFiles.value = []
        files.value = []
    } catch(err) {
        console.error(err)

    }
}
const saveFilesInStorage = async (file) => {
    try {
        console.log(file)
        const docImage = frRef(storage, `images/messages-images/${file.name}-${Math.floor(Date.now() / 1000).toString()}`);
        await uploadBytes(docImage, file);
        const downloadURL = await getDownloadURL(docImage);
        console.log(downloadURL)
        return downloadURL;
    } catch(err) {
        console.error(err);
    }
}
function checkEmptySpaces(text) {
  const trimmedText = text.replace(/\s/g, '');
  const isEmpty = trimmedText.length === 0;
  
  return isEmpty;
}

function addFiles(e) {
    files.value = Array.from(e.target.files);

    files.value.forEach(file => {
        console.log(file)
        const fileReader = new FileReader();
        fileReader.onload = function() {
            attachFiles.value.push({
                'path': fileReader.result,
                'name': file.name
            });
            // Дополнительные действия с результатом чтения файла
        };
        fileReader.readAsDataURL(file);
    });
}
function enlarge() {

}
function deleteAttachFile(path) {
    let files = attachFiles.value.filter((item) => {
        return  item.path !== path
    })
    attachFiles.value = [...files]
}

const messagesList = ref(null);
function getAllImagesInchat(src) {
    if(!messagesList.value) {
        return
    }

    const images = messagesList.value.querySelectorAll('img');
    allImagesInChat.value.length = 0
    allImagesInChat.value = [...images]
    swiperImagesPopupIsActive.value = true
    currentImageActive.value = Array.from(images).findIndex((img) => img.src === src);

}
onMounted(async () => {
    chatId = route.params.id
    if(!await accessCheck()) {
        router.push('/chats')
    } else {
        await getChatUsersInfo()
        await getFreindInfo()
        await getChatMessages()
    }

})
</script>

<template>
    <div class="chat block"
    >
        <pop-up
            :class="'popup-images'"
            :isActive="swiperImagesPopupIsActive"
            @update:isActive="(newValue) => {(swiperImagesPopupIsActive=newValue)}"
        >
            <images-swiper
                :contentSlides="allImagesInChat.reverse()"
                :currentSlide="currentImageActive"
            />
        </pop-up>
        <div class="chat__header">
            <div class="chat__friend">
                <div class="chat__friend-avatar">
                    <img 
                        :src="friendInfo.profile_avatar"
                    >
                </div>
                <div class="chat__friend-name">
                    {{ friendInfo.first_name }}
                    {{ friendInfo.last_name }}
                </div>
            </div>
        </div>
        <div class="chat__content"
            ref="messagesList"
        >
            <chat-list
                :messagesList="chatMessages"
                @enlarge="(src) => getAllImagesInchat(src)"
            />
        </div>
        <div class="chat__field-message">
            <the-input
                :modelValue="fieldMessage"    
                :placeHolder="'Напишите сообщение'"
                v-model="fieldMessage"
                @update:modelValue="(newValue) => {(fieldMessage=newValue)}"
                @keydown.enter="sendMessage()"
                class="main-field-message"
            />
            <label class="attach">
                <input 
                    type="file"
                    multiple="multiple"
                    @change="(e) => addFiles(e)"
                >
                <font-awesome-icon
                    icon="paperclip"
                    
                />
            </label>
            <svg 
                class="send"
                @click="sendMessage()"
                xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
				<path d="M20.33 3.66996C20.1408 3.48213 19.9035 3.35008 19.6442 3.28833C19.3849 3.22659 19.1135 3.23753 18.86 3.31996L4.23 8.19996C3.95867 8.28593 3.71891 8.45039 3.54099 8.67255C3.36307 8.89471 3.25498 9.16462 3.23037 9.44818C3.20576 9.73174 3.26573 10.0162 3.40271 10.2657C3.5397 10.5152 3.74754 10.7185 4 10.85L10.07 13.85L13.07 19.94C13.1906 20.1783 13.3751 20.3785 13.6029 20.518C13.8307 20.6575 14.0929 20.7309 14.36 20.73H14.46C14.7461 20.7089 15.0192 20.6023 15.2439 20.4239C15.4686 20.2456 15.6345 20.0038 15.72 19.73L20.67 5.13996C20.7584 4.88789 20.7734 4.6159 20.7132 4.35565C20.653 4.09541 20.5201 3.85762 20.33 3.66996ZM4.85 9.57996L17.62 5.31996L10.53 12.41L4.85 9.57996ZM14.43 19.15L11.59 13.47L18.68 6.37996L14.43 19.15Z" fill="#000000"></path>
			</svg>
        </div>
        <div class="attach-files-list"
            v-if="attachFiles.length"
        >
            <chat-files
                v-for="(file,index) of attachFiles" :key="index" :file="file"
                @deleteAttachFile="(path) => deleteAttachFile(path)"
            />
        </div>
    </div>
</template>

<style lang="scss" >
.chat {
    & .test {
        width: 20px;
        height: 20px;
        background: red;
    }
    padding: 0px;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & .main-field-message {
        & input {
            border-radius: 0px;
        }
    }
    &__header {
        border-bottom: 0.7px solid #969696;
        padding: 10px 20px;
    }

    &__friend {
        display: flex;
        gap: 10px;
    }

    &__friend-avatar {
        width: 50px;
        height: 50px;
        & img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__friend-name {
        font-size: 18px;
        padding-top: 5px;
    }

    &__content {
        height: 400px;
    }

    &__field-message {
        position: relative;
        & input {
            border-radius: 0;
            &::placeholder {
                color: #9696967a;
            }
            &:focus {
                &::placeholder {
                    color: #9696967a;
                }
            }
        }
        & .attach {
            position: absolute;
            right: 45px;
            top: 50%;
            transform: translate(0, -50%);
            cursor: pointer;
            & svg {
                width: 26px;
                height: 26px;
            }
            & input {
                display: none;
            }
        }
        & .send {
            position: absolute;
            right: 10px;
            cursor: pointer;
            top: 50%;
            transform: translate(0, -50%);
            width: 30px;
            height: 30px;
        }
    }
    & .attach-files-list {
        display: flex;
        gap: 5px;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 10px;
    }
}

</style>