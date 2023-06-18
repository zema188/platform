

<script setup>
let props = defineProps({
    isActive: {
        type: Boolean,
        required: true,
    }
})
</script>


<template>
    <div class="popup"
    :class="{active : isActive}"
    @click="$emit('update:isActive', false)"
    >
        <div class="popup__body"
        @click.stop
        >
            <div class="popup__content">
                <slot></slot>
                <div class="popup__close"
                @click="$emit('update:isActive', false)"
                >
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" >
.popup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: none;
  z-index: 104;
  &.active {
    display: block;
  }
  &::before {
    content: "";
    background: #000000;
    opacity: 0.4;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }
  &__body {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 10px;
    min-height: 100%;
  }
  &__content {
    position: relative;
    background: #9cbae9;
    border-radius: 15px;
    width: 95%;
    max-width: 344px;
    padding: 5px 22px 22px;
    z-index: 105;
  }
  &__title {
    text-align: center;
    margin-bottom: 10px;
  }
  &__times {
    display: flex;
    gap: 10px;
  }
  &__times-col {
    flex: 0 0 calc(50% - 5px);
  }
  &__subtitle {
    text-align: center;
    margin-bottom: 3px;
    font-size: 14px;
    &_left {
      text-align: start;
    }
  }
  &__close {
    position: absolute;
    cursor: pointer;
    right: 5px;
    top: 12px;
    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: -5px;
        display: block;
        width: 16px;
        height: 14px;
    }
    & span {
        width: 17px;
        display: block;
        height: 1px;
        background: #fff;
        &:first-child {
            transform: rotate(135deg) translate(1px, 0px);
        }
        &:last-child {
            transform: rotate(-135deg);
        }
    }
  }
}
.popup-editor {
    & input {
        margin-bottom: 10px;
    }
}
</style>