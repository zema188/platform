<script setup>

</script>

<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<style >
.button {
    background: #2C64EE;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 13px 15px;
    border-radius: 10px;
    transition: 0.2s;
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;
    position: relative;
    height: fit-content;
    width: fit-content;
    cursor: pointer;
}
</style>