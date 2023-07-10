<template>
    <div class="level"
    @click="setLevel()"
    >
        {{ level.name }}
    </div>
</template>

<script>
    export default {
        name: 'gameLevel',
        props: {
            level: {
                type: Object,
            }
        },
        methods: {
            setLevel() {
                this.$emit('setLevel', this.level)
            }
        },
    }
</script>

<style lang="scss" scoped>
.level {
    cursor: pointer;
}
</style>