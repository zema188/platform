<script setup>
import { ref } from 'vue';

const props = defineProps({
    test: {
        type: Object,
        required: true,
    }
})


function dateToLocal(date) {
    const timestamp = date.seconds + date.nanoseconds / 1e9;
    const formattedDate = new Date(timestamp * 1000);

    const day = String(formattedDate.getDate()).padStart(2, '0');
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const year = formattedDate.getFullYear();

    const formattedDateString = `${day}.${month}.${year}`;
    return formattedDateString;
}


</script>

<template>
    <div class="tests__my-list-item">
        <div class="tests__my-item-top">
            <div class="tests__my-item-action">
                <font-awesome-icon :icon="['fas', 'file-pen']" />
                <font-awesome-icon :icon="['fas', 'copy']" />
                <font-awesome-icon :icon="['fass', 'trash']"  
                    @click="$emit('deleteTest', test.id)" 
                />
            </div>
            <router-link
                class="tests__my-item-name"
                :to="`tests/${test.id}`"
            >
                {{ test.name }}
            </router-link>
        </div>
        <div class="tests__my-item-bottom">
            <div class="tests__my-item-date">
                {{ dateToLocal(test.date) }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" >
.tests {

&__my-list-item {
    flex: 0 0 calc(20% - 16px);
    &:hover {
        & .tests__my-item-action {
            opacity: 1;
        }
    }
}

&__my-item-top {
    height: 175px;
    border-radius: 4px 4px 0 0;
    background: #6a7278;
    padding: 10px 10px 10px 10px;
}

&__my-item-name {
    color: #fff;
    font-size: 18px;
    font-weight: 500;
}

&__my-item-bottom {
    background: #fff;
    border-radius: 0 0 4px 4px;
    padding: 10px;
}

&__my-item-date {
}

&__my-item-action {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 5px;
    transition: .2s;
    opacity: 0;
    & svg {
        width: 20px;
        height: 20px;
        color: #ededff;
        transition: .2s;
        cursor: pointer;
        &:hover {
            color: #ccccf0;
        }
    }
}
}

</style>