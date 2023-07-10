<script setup>
import { Navigation, Pagination, Scrollbar,} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import { watch } from 'vue';
import { ref } from 'vue';
const props = defineProps({
    contentSlides: {
        type: Object,
        required: true,
    },
    currentSlide: {
        type: Number,
        required: false,
    }
})
const swiper = ref(null);
const modules = [Navigation, Pagination, Scrollbar,];

const onSwiper = (instance) => {
    swiper.value = instance;
};

const onSlideChange = () => {
};

const swiperSlideTo = (index) => {
    swiper.value.slideTo(index);

}

watch(
    () => props.currentSlide,
    () => {
        swiperSlideTo(props.currentSlide)
    },
    {deep: true}
)

</script>

<template>
    <Swiper 
        :modules="modules"
        :slides-per-view="1"
        :space-between="50"
        :navigation="true"
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
        @swiper="onSwiper"
        @slideChange="onSlideChange">
    <SwiperSlide
        :class="'swiper-images__slide'"
        v-for="(slide,index) of contentSlides" :key="index"
    >
        <img 
            :src="slide.src"
        >
    </SwiperSlide>
    </Swiper>
</template>

<style lang="scss" >
.swiper-images__slide {
    height: auto ;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
        max-width: 100%;
        border-radius: 15px;
        object-fit: cover;
    }
}
.popup-images {
    & .swiper {
        width: 300px;
        border-radius: 15px;
    }
    & .popup__content {
        position: static;
        padding: 5px;
        background: rgba(255,235,235,0.5);
        background: none;
        max-width: none;
        width: 100%;
    }
}
</style>