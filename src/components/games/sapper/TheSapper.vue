<template>
    <div class="settings__list-btns">
      <pop-up
      :isActive="editTaskPopupIsActive"
      @update:isActive="(newValue) => {(editTaskPopupIsActive=newValue)}"
      >
          <gameSettigns
            @addSettings="addSettings"
          />
      </pop-up>
      <pop-up>
          <gameLevels
            @addSettings="addSettings"
          />
      </pop-up>
    </div>
      <gameField
      :gameParams="gameParams"
      />
  </template>
  
  <script>
  import gameField from '@/components/games/sapper/gameField.vue'
  import gameSettigns from '@/components/games/sapper/gameSettigns.vue';
  import PopUp from '@/components/UI/Popup.vue';
  import gameLevels from '@/components/games/sapper/gameLevels.vue';
  export default {
    components: {
      gameField,gameSettigns,gameLevels
    },
    data() {
      return {
        settingsOpen: false,
        gameParams: {
  
        },
        stateSettings: false,
      }
    },
    methods: {
      toggleSettings(state) {
        this.stateSettings = state
      },
      addSettings(settings) {
          this.gameParams = { ...settings}
      },
    },
  }
  </script>
  <style lang="scss">
  .settings__list-btns {
    display: flex;
    gap: 10px;
  }
  </style>
  