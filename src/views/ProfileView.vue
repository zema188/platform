<script setup>
import { onMounted, ref } from 'vue';
import { db } from '@/firebase/config.js'
import { useUser } from '@/stores/user';
import { collection, where, query, doc, getDoc, onSnapshot, getDocs, or, setDoc, updateDoc, deleteDoc} from "firebase/firestore";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const profile = ref({})
const friendsStatus = ref({})
const profileId = route.params.id
const user = useUser()
let deleteArrowBtn = ref(false)
let freindsStatusSnapShot = ref(null)
const getProfileInfo = async() => {

    try {
        const userDoc = doc(db, "users", profileId)

        const response = await getDoc(userDoc)

        profile.value = {
            avatar: response.data().profile_avatar,
            first_name: response.data().first_name,
            last_name: response.data().last_name,
        }
    } catch(err) {
        console.error(err)
    }
}

const getFriendStatus = async () => {
  try {
    const q = query(collection(db, "friends"),
    or(
        (where("user_requesterId", "==", profileId), where("user_recipientId", "==", user.userInfo.user_id)),
        (where("user_requesterId", "==", user.userInfo.user_id), where("user_recipientId", "==",profileId)),
    ));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc)
        })
        const doc = querySnapshot.docs[0];
        if(doc === undefined) {
            friendsStatus.value = {}
        } else {
            friendsStatus.value = {
                ...doc.data(),
                id: doc.id
            };
        }

    });

    return unsubscribe;
  } catch (err) {
    console.error(err);
  }
};


const addFriend = async () => {
    try {
        const FriendsCollection = collection(db, "friends")
        const docRef = doc(FriendsCollection)

        const response = await setDoc(docRef, {
            user_requesterId: user.userInfo.user_id,
            user_recipientId: profileId,
            status: 0,
            created: new Date()
        })
        freindsStatusSnapShot.value = await getFriendStatus()
    } catch(err) {
        console.error(err)
    }
}

const addFriendAgain = async () => {
    try {
        const docRef = doc(db, "friends", friendsStatus.value.id);
        await updateDoc(docRef, {
            status: 0
        });

    } catch(err) {
        console.error(err)
    }
}

const addFriendNew = async () => {
    try {
        const docRef = doc(db, "friends", friendsStatus.value.id);
        await updateDoc(docRef, {
            status: 0,
            user_recipientId: profileId,
            user_requesterId: user.userInfo.user_id,
        });

    } catch(err) {
        console.error(err)
    }
}

const acceptFriend = async () => {
    try {
        const docRef = doc(db, "friends", friendsStatus.value.id);
        await updateDoc(docRef, {
            status: 1
        });

    } catch(err) {
        console.error(err)
    }
}

const deleteFriend = async () => {
    try {
        freindsStatusSnapShot.value()
        const docRef = doc(db, "friends", friendsStatus.value.id);
        await deleteDoc(docRef)
        friendsStatus.value = {}
    } catch(err) {
        console.error(err)
    }
}

const rejectFriend = async () => {
    try {
        const docRef = doc(db, "friends", friendsStatus.value.id);
        console.log(friendsStatus.value.id)
        await updateDoc(docRef, {
            status: 2
        });
    } catch(err) {
        console.error(err)
    }
}



onMounted( async() => {
    await getProfileInfo()
    if(profileId !== user.userInfo.user_id) 
    freindsStatusSnapShot.value = await getFriendStatus()
})
</script>


<template>
    <div class="profile block">
        <div class="profile__name">
            {{ profile.first_name }}
            {{ profile.last_name }}
        </div>
        <div class="profile__avatar">
            <img
                :src="profile.avatar"
                :alt="avatar"
            >
        </div>
        <div class="profile__Friend-status"
            v-if="profileId !== user.userInfo.user_id"
        >
            <span class="profile__Friend-add"
                v-if="friendsStatus.status == undefined"
                @click="addFriend()"
            >
                Добавить в друзья
            </span>
            <span
                v-if="friendsStatus.status === 0 && friendsStatus.user_requesterId === user.userInfo.user_id"
            >
                Заявка отправлена
                <div class="profile__Friend-action">
                    <span
                        @click="deleteFriend()"
                    >
                        Отменить заявку
                    </span>
                </div>
            </span>
            <span
                v-if="friendsStatus.status === 0 && friendsStatus.user_recipientId === user.userInfo.user_id"
            >
                Хочет добавить вас в друзья
                <div class="profile__Friend-action">
                    <span
                        @click="acceptFriend()"
                    >
                        Принять
                    </span>
                    <span
                        @click="rejectFriend()"
                    >
                        Отклонить
                    </span>
                </div>
            </span>
            <span
                class="profile__Friend-delete"
                v-if="friendsStatus.status === 1"
            >
                У вас в друзья
                
                <div class="profile__Friend-delete-arrow"
                    :class="[{active: deleteArrowBtn}]"
                    @click="deleteArrowBtn = !deleteArrowBtn"
                >
                    <svg  xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 1024 1024" class="icon" version="1.1"><path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/>
                    
                    </svg>
                    <span
                        @click="deleteFriend()"
                    >
                        Удалить из друзуй
                    </span>
                </div>
            </span>
            <span
                v-if="friendsStatus.status === 2 && friendsStatus.user_recipientId === user.userInfo.user_id"
            >
                Вы отклонили заявку
                <div class="profile__Friend-action">
                    <span
                        @click="addFriendNew()"
                    >
                        Отправить заявку в друзья
                    </span>
                </div>
            </span>
            <span
                v-if="friendsStatus.status === 2 && friendsStatus.user_requesterId === user.userInfo.user_id"
            >
                Заявка в друзья отклонена
                <div class="profile__Friend-action">
                    <span
                        @click="addFriendAgain()"
                    >
                        Отправить запрос заново
                    </span>
                </div>
            </span>
        </div>
    </div>
</template>

<style lang="scss">
.profile {
    padding: 30px 30px 30px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    &__name {
        font-weight: 500;
        font-size: 20px;
    }

    &__avatar {
        width: 100px;
        height: 100px;
        & img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &__Friend-action {
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
        & span {
            cursor: pointer;
        }
    }
    &__Friend-add {
        cursor: pointer;
    }
    &__Friend-delete-arrow {
        position: relative;
        &.active {
            & span {
                display: block;
            }
            & svg {
                transform: rotate(180deg);
            }
        }
        & svg {
            width: 20px;
            height: 20px;
            transition: .2s;
            cursor: pointer;
        }
        & span {
            background: #dbd8d8;
            position: absolute;
            white-space: nowrap;
            top: 100%;
            left: 50%;
            transform: translate(-50%, 0);
            padding: 5px;
            border-radius: 20px;
            display: none;
            cursor: pointer;
        }
    }
    &__Friend-delete {
        display: flex;
        gap: 5px;
    }
    &__Friend-status {
        text-align: center;
    }
}

</style>