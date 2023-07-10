<template>
    <div class="nav__list">
        <settingsParametr
        :value="settingsGameParams.cols" @update:value="settingsGameParams.cols = $event"
        >
            <template v-slot:subtitle>
                Ширина
            </template>                            
        </settingsParametr>
        <settingsParametr
        :value="settingsGameParams.rows" @update:value="settingsGameParams.rows = $event"
        >
            <template v-slot:subtitle>
                Высота
            </template>                            
        </settingsParametr>
        <settingsParametr
        :value="settingsGameParams.bombs" @update:value="settingsGameParams.bombs = $event"
        >
            <template v-slot:subtitle>
                Бомбы
            </template>                            
        </settingsParametr>
    </div>
    <div class="nav__content-btn-add"
    @click="submitSettings"
    >
        Применить
    </div>
</template>

<script>
import settingsParametr from './settingsParametr.vue';
    export default {
        name: 'gameSettings',
        components: {
            settingsParametr
        },
        data() {
            return {
                settingsGameParams: {
                    rows: 15,
                    cols: 15,
                    bombs: 10,
                },
            }
        },
        methods: {
            submitSettings() {
                this.$emit('addSettings', this.settingsGameParams)
            }
        },
        mounted(){
            this.submitSettings()
        }
    }
</script>

<style lang="scss"  >

.nav__content-btn-add {
    margin-top: 7px;
    cursor: pointer;
    color: #fff;
}
</style>