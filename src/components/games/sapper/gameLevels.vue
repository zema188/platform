<template>
    <div class="levels__list">
        <gameLevel
        v-for="(level, index) in levels" :key="index"
        :level="level"
        @setLevel="setLevel"
        />
    </div>
</template>

<script>
import gameLevel from './gameLevel.vue';
    export default {
        name: 'gameLevels',
        components: {
            gameLevel
        },
        data() {
            return {
                levels: [
                    {name: 'ez', cols: 10, rows: 10, bombs: 10},
                    {name: 'mid', cols: 20, rows: 20, bombs: 20},
                    {name: 'hard', cols: 30, rows: 30, bombs: 30},
                ]
            }
        },
        methods: {
            setLevel(level) {
                console.log(level)
                this.$emit('setLevel', level)
            }
        }
    }

</script>

<style lang="scss" scoped>
.levels__list {
    display: flex;
    gap: 10px;
    justify-content: space-around;
}
</style>