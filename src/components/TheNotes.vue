<script setup>
    import NotesList from './NotesList.vue';

    const notes = [
        {id: 1, title: 'note-1', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. voluptatum consequatur tempore placeat', date: "Июнь 7, 2023"},
        {id: 2, title: 'note-2', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. voluptatum consequatur tempore placeat', date: "Июнь 7, 2023"},
        {id: 3, title: 'note-3', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. voluptatum consequatur tempore placeat', date: "Июнь 7, 2023"},
    ]

    



</script>

<template>
    <div class="notes container">
        <NotesList
        :notes="notes"
        />
    </div>
    <div>
    </div>
</template>

<style lang="scss">
.notes {
    &__list {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
    }
    &__item {
        height: 250px;
        border-radius: 5px;
        padding: 15px 20px 20px;
        background: #fff;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        flex: 0 0 calc(33.333% - 10px);
        display: flex;
        flex-direction: column;
    }
    &__item-text {
        flex: 1;
    }
    & span {
        font-size: 22px;
        font-weight: 500;   
    }
    & p {
        color: #575757;
        font-size: 16px;
        margin-top: 5px;
    }
    &__item-bottom {
        padding-top: 10px;
        border-top: 1px solid #ccc;
    }
    &__item-date {
        color: #6D6D6D;
        font-size: 14px;
    }
}
</style>