<script setup>
import PopUp from '@/components/UI/Popup.vue';
import TheButton from './UI/TheButton.vue';
import { ref } from 'vue';

let props = defineProps({
    confirmationPopupIsActive: {
        type: Boolean,
        required: true,
    },
})


</script>

<template>
    <pop-up
    :class="'popup-confirm'"
        :isActive="confirmationPopupIsActive"
        @update:isActive="(newValue) => {(confirmationPopupIsActive=newValue)}"
    >
        <div class="popup-confirm__text">
            <slot name="text">
                Подтвердить действие?
            </slot>
        </div>    
        <div class="popup-confirm__btns">
            <the-button
                @click="$emit('answer', true)"
            >
                <slot name="btnYes"
                >
                    да
                </slot>
            </the-button>
            <the-button
                @click="$emit('answer', false)"
            >
                <slot name="btnNo">
                    Нет
                </slot>
            </the-button>
        </div>
    </pop-up>
</template>

<style  lang="scss">
.popup-confirm {
    &__text {
        text-align: center;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        & span {
            display: inline-block;
        }
    }
    &__btns {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        & .button {
            width: calc(50% - 10px);
        }
    }
}
</style>