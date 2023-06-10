<script setup>
    import jQuery from "jquery";
    import { ref } from "vue"

    const $ = jQuery;
    window.$ = $;

    const props = defineProps({
        task: {
            type: Object,
            required: true,
        }
    })

    const contentIsHidden = ref(false) 
    
    const toggleHiddenContent = () => {
        contentIsHidden
    }
</script>



<template>
    <div 
    :class="['schedule-day__item', { 'active': true }]"
    @click="contentIsHidden = !contentIsHidden"
    >
        <div class="schedule-day__item-header">
            <div class="schedule-day__item-title">
                {{ task.title }}
            </div>
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
                <div class="schedule-day__item-description">
                    {{ task.description }}
                </div>
            </div>
        </transition>
    </div>
</template>



<style lang="scss" >
.schedule-day {

    &__item {
        background: #fbfbfe;
        border-radius: 20px;
        padding: 15px 20px;
        cursor: pointer;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    &__item-header {
        display: flex;
        justify-content: space-between;
        padding: 0 0 10px;
    }

    &__item-title {
        font-weight: 600;
    }

    &__item-date {
    }

    &__item-date-from {
    }

    &__item-date-to {
    }

    &__item-content {
        &.hidden {
            display: none;
        }
    }

    &__item-description {
        font-weight: 400;
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
</style>