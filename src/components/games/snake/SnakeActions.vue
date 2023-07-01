<script setup>
import PopUp from '@/components/UI/PopUp.vue'
import { ref } from 'vue'
import TheButton from '@/components/UI/TheButton.vue'

const props = defineProps({
    actionPopupIsActive: {
        type: Boolean,
        required: true,
    },
    gameLoseInfo: {
        type: Object,
        required: false,
    },
    userGameInfo: {
        type: Object,
        required: false,
    }
})

</script>

<template>
    <pop-up
        :class="'snake__popup'"
        :isActive="actionPopupIsActive"
        @update:isActive="(newValue) => {(actionPopupIsActive=newValue)}"
    >
        <div class="snake__actions">
            <div class="snake__actions-content">
                <div class="snake__actions-pic">
                    <img src="@/assets/images/snake/preview.png">
                </div>
                <div class="snake__actions-info">
                    <div class="snake__actions-info-item">
                        <font-awesome-icon :icon="['fass', 'apple-whole']" style="color: rgba(101,243,133,1);" />
                        {{ gameLoseInfo.foodEat }}
                    </div>
                    <div class="snake__actions-info-item">
                        <font-awesome-icon :icon="['fasr', 'trophy']" style="color: #e1ff00;" />
                        {{ userGameInfo.recordFoodEat }}
                    </div>
                </div>
            </div>
            <div class="snake__actions-footer">
                <the-button
                :class="'play'"
                @click="$emit('startGame')"
                >
                    <font-awesome-icon :icon="['', 'play']" />
                    Играть
                </the-button>
                <the-button>
                    <font-awesome-icon :icon="['', 'share-nodes']" />
                </the-button>
                <the-button>
                    <font-awesome-icon icon="gear" />
                </the-button>
            </div>
        </div>
    </pop-up>
</template>

<style lang="scss" >
.snake__popup {
    & .popup__content {
        background: transparent;
    }
}
.snake {

&__actions {
}

&__actions-content {
    position: relative;
}

&__actions-pic {
    & img {
        height: 338px;
        object-fit: cover;
        width: 100%;
        border-radius: 15px;
    }
}

&__actions-info {
    position: absolute;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    line-height: 23px;
    top: 70px;
    left: 50%;
    transform: translate(-50%, 0px);
    display: flex;
    gap: 80px;
}
&__actions-info-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    & svg {
        width: 50px;
        height: 50px;
        display: block;
    }
}
&__actions-footer {
    padding: 10px 0 0 0 ;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    & button {
        & svg {
            height: 19px;
        }
    }
    & .play {
        gap: 10px;
        flex: 1;
    }
}
}

</style>