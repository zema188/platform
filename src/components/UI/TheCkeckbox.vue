<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  checked: {
    type: Boolean,
    required: false,
  }
});
</script>

<template>
    <label class="custom-w"
        :class="[{disabled: disabled}]"
    >
        <div class="custom-w-btn">
            <input 
                :type="type"        
                :name="name"    
                :disabled="disabled"
                :checked="checked"
            >
            <i class="custom-checkbox"
                :class="[{'custom-checkbox_radio': type==='radio'}]"
            >
            </i>
            <span>
                <slot>
                </slot>
            </span>
        </div>
    </label>
</template>

<style lang="scss" scoped>
.custom-w  {
    display: flex;
    row-gap: 0;
    column-gap: 10px;
    &.disabled {
        & .custom-checkbox {
            cursor: auto;
        }
        & span {
            cursor: auto;
        }
    }
    & span {
      font-weight: 400;
      cursor: pointer;
    }
    &:hover {
      & .custom-checkbox {
        // border: 0.7px solid var(--var-orange);
      }
    }
  }
  
.custom-w input {
    display: none;
}
.custom-w-btn {
    display: flex;
    column-gap: 10px;
}
.custom-checkbox {
    position: relative;
    display: block;
    min-width: 18px;
    min-height: 18px;
    max-width: 18px;
    max-height: 18px;
    transition: .2s;
    background: #F9F9F9;
    border: 0.7px solid #D7D7D7;
    border-radius: 4px;
    cursor: pointer;
}
.custom-checkbox_radio {
    border-radius: 50%;
}
.custom-checkbox::before {
    content: "";
    position: absolute;
    width: 12px;
    height: 9px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    opacity: 0;
    transition: 0.2s;
    background: url('@/assets/images/icons/checkbox-custom.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.custom-checkbox_radio::before {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    opacity: 0;
    transition: 0.2s;
    background: #272727;
}
.custom-w input:checked + .custom-checkbox::before {
    opacity: 1;
}

.custom-w input:checked + .custom-checkbox {
    background: var(--var-orange-bg);
    border: 0.7px solid var(--var-orange);
}

.custom-checkbox {
    min-width: 18px;
    min-height: 18px;
    max-width: 18px;
    max-height: 18px;
}
[dark] {
    .custom-checkbox {
        background: var(--var-svg-grey)
    }
}
</style>