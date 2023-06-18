<script setup>
    import { onMounted, ref } from "vue"
    import CloseCross from "./UI/CloseCross.vue";
    import EditIcon from "./UI/EditIcon.vue";

    const props = defineProps({
        task: {
            type: Object,
            required: true,
        }
    })

    const contentIsHidden = ref(false) 


    const checkForTimeOut = () => {
        const taskTime = props.task.time_from;
        const [targetHours, targetMinutes] = taskTime.split(":");
        const taskDate = props.task.date;
        const [targetYear, targetMonth, targetDay] = taskDate.split("-");

        const currentTime = new Date();
        const year = currentTime.getFullYear();
        const month = currentTime.getMonth() + 1;
        const day = currentTime.getDate();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();

        const taskDateTime = new Date(targetYear, targetMonth - 1, targetDay, targetHours, targetMinutes);
        const currentDateTime = new Date(year, month - 1, day, hours, minutes);

        return taskDateTime <= currentDateTime;
    };
    const checkForDisabled = () => {
        if(props.task.copy === false) {
            return true
        }
        return false
    }
    onMounted(() => {
        contentIsHidden.value = !checkForTimeOut()
    })
</script>



<template>
    <div 
    :class="['schedule-day__item', { 'timeOut': checkForTimeOut() }, { 'disabled': checkForDisabled() }]"
    @click="() => {if(task.description) contentIsHidden = !contentIsHidden}"
    >
        <div class="schedule-day__item-header">
            <i class="fa-thin fa-face-awesome"></i>
            <div class="schedule-day__item-title">
                {{ task.title }}
            </div>
            <edit-icon
            :class="'schedule-day__item-edit'"
            @click="(e) => {$emit('editTask', task), e.stopPropagation();}"
            />
            <div class="schedule-day__item-date">
                <div class="schedule-day__item-date-from">
                    {{ task.time_from }}
                </div>
                <div class="schedule-day__item-date-to">
                    {{ task.time_to }}
                </div>
            </div>
        </div>
        <transition name="slide-fade">
            <div
                :class="['schedule-day__item-content']"
                v-if="contentIsHidden"
                >
                <div class="schedule-day__item-description scroll_blue">
                    {{ task.description }}
                </div>
            </div>
        </transition>
        <close-cross
            :class="'schedule-day__item-close'"
            @click="(e) => {e.stopPropagation(), $emit('deleteTask', task.id)}"
            
            />
        <div class="disabled-block"
        @click="(e) => e.stopPropagation()"
        >
        </div>
    </div>
</template>



<style lang="scss" >

.schedule-day {

    &__item {
        position: relative;
        background: #e1e5eb;
        border-radius: 20px;
        padding: 15px 20px 35px;
        cursor: pointer;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
        &.timeOut {
            background: #f9d57f;
        }
        &:hover {
            & .schedule-day__item-edit {
                opacity: 1;
            }
            & .schedule-day__item-close {
                opacity: 1;
            }
            & .schedule-day__item-date {
                padding-right: 10px;
            }
        }
        & .disabled-block {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 20px;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0,0,0, 0.45);
            opacity: 0;
            z-index: -1;
        }
    }

    &__item-header {
        display: flex;
        justify-content: space-between;
        padding: 0 0 10px;
        position: relative;
        gap: 5px;
        & img {
            width: 40px;
            height: 40px;
        }
    }

    &__item-title {
        flex: 1;
        font-weight: 600;
    }

    &__item-date {
        transition: .2s;
    }

    &__item-date-from {
    }

    &__item-date-to {
    }
    &__item-edit {
        bottom: -26px;
        width: 31px;
        height: 33px;
        opacity: 0;
        transition: .2s;
    }
    &__item-close {
        position: absolute;
        right: 10px;
        top: 10px;      
        width: 15px;
        height: 15px;
        opacity: 0;
        transition: .2s;
    }
    &__item-content {
        &.hidden {
            display: none;
        }
    }

    &__item-description {
        font-weight: 400;
        line-height: 17px;
        font-size: 15px;
        display: inline-block;
        max-height:90px;
        overflow-Y: auto;
    }

    
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.schedule-day__list_copy {
    & .schedule-day__item {
        &.disabled {
            &:hover {
                & .schedule-day__item-edit {
                    opacity: 0;
                }
                & .schedule-day__item-close {
                    opacity: 1;
                    z-index: 3;
                }
                & .schedule-day__item-date {
                    padding-right: 10px;
                }
            }
        }
    }
}
</style>