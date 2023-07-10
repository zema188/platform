<template>
    <div class="nav__item">
        <div class="nav__item-subtitle">
            <slot name="subtitle"></slot>
        </div>
        <div class="nav__item-btn nav__item-plus"
        @click="localValue++"
        ></div>
        <input
        v-model="localValue"
        >
        <div class="nav__item-btn nav__item-minus"
        @click="localValue--"
        ></div>
    </div>
</template>

<script>
export default {
  name: 'parametrGame',
  props: {
    value: {
      type: [Number],
    },
  },
  computed: {
    localValue: {
      get() {
        console.log(this.value)
        return this.value;
      },
      set(newValue) {
        this.$emit('update:value', newValue);
      }
    }
  }
};
</script>
<style lang="scss"  >
.nav {
&__content {
}

&__list {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
}

&__item {
    display: flex;
    align-items: center;
    column-gap: 5px;
    & input {
        height: 100%;
        width: 100%;
        max-width: 50px;
        border: 1px solid #7b7b7b;
        border-radius: 20px;
        text-align: center;
    }
}

&__item-btn {
    position: relative;
    width: 20px;
    height: 20px;
    background: #de9b9b;
    display: flex;
    justify-content: center;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 22px;
    cursor: pointer;
}

&__item-plus {
    &::after {
        content: '+'
    }
}

&__item-subtitle {
    flex: 1;
    max-width: 90px;
}

&__item-minus {
    &::after {
        transform: translateY(-3px);
        content: '-'
    }
}
}
</style>