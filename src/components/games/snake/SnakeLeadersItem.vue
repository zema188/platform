<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
    position: {
        type: Number,
        required: true,
    }
})
</script>

<template>
    <div class="snake__leaders-item">
        <div class="snake__leaders-item-position">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" id="Layer_1" width="800px" height="800px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                <g>
                    <path fill="#394240" d="M51.999,20C51.999,8.953,43.046,0,32,0C20.953,0,12,8.953,12,20c0,4.484,1.527,8.578,4.016,11.913   c0,0.031-0.016,0.055-0.016,0.086v28c0,1.477,0.812,2.832,2.113,3.527c1.297,0.699,2.879,0.617,4.105-0.199L32,56.808l9.78,6.52   c0.668,0.445,1.441,0.672,2.219,0.672c0.648,0,1.297-0.156,1.887-0.473c1.301-0.695,2.113-2.051,2.113-3.527v-28   c0-0.031-0.016-0.055-0.016-0.086C50.472,28.578,51.999,24.484,51.999,20z M32,8c6.625,0,11.999,5.375,11.999,12   S38.625,31.999,32,31.999S20,26.625,20,20S25.375,8,32,8z M34.219,48.671c-1.344-0.898-3.094-0.898-4.438,0L24,52.526V38.312   c2.453,1.074,5.152,1.688,8,1.688s5.547-0.613,8-1.688v14.215L34.219,48.671z"/>
                    <circle fill="#F9EBB2" cx="32" cy="20" r="12"/>
                    <path fill="#45AAB8" d="M34.219,48.671c-1.344-0.898-3.094-0.898-4.438,0L24,52.526V38.312c2.453,1.074,5.152,1.688,8,1.688   s5.547-0.613,8-1.688v14.215L34.219,48.671z"/>
                </g>
            </svg>
            <span>
                {{ position }}
            </span>
        </div>
        <div class="snake__leaders-item-pic">
            <img 
                :src="user.profile_avatar"
            >
        </div>
        <div class="snake__leaders-item-info">
            <div class="snake__leaders-item-name">
                {{ user.first_name }}
                {{ user.last_name }}
            </div>
            <div class="snake__leaders-item-points">
                {{ user.score }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.snake {

&__leaders-item {
    display: flex;
    gap: 20px;
    align-items: center;
    &:not(:last-child) {
        margin-bottom: 15px;
    }
}

&__leaders-item-pic {
    & img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 50%;
    }
}
&__leaders-item-info {
    border-radius: 10px;
    padding: 9px 10px;
    background: #7860ff;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 25px;
    justify-content: space-between;
    flex: 1;
}
&__leaders-item-position {
    position: relative;
& svg {
    width: 40px;
    height: 40px;
  }
  & span {
    position: absolute;
    left: 50%;
    top: 4px;
    color: #000;
    transform: translate(-50%, 0px);
  }
}
}

</style>