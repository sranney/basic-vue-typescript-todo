<template>
  <div>
    <span>To Do List</span>
    <v-list>
      <v-list-item v-for="toDo in toDos" :key="toDo.id" class="d-flex">
        <div v-if="!isTaskBeingEdited(toDo.id)" class="d-flex align-center">
          <h1>{{ toDo.description }}</h1>
          <div v-if="!toDo.isComplete" class="ml-4">
            <v-btn
              icon
              color="red"
              class="close-icon"
              @click="$emit('toDo:remove', toDo.id)"
              ><v-icon>mdi-plus-circle-outline</v-icon></v-btn
            >
            <v-btn icon color="blue" @click="editToDo(toDo)"
              ><v-icon>mdi-pencil-box</v-icon></v-btn
            >
            <v-btn
              icon
              color="green"
              @click="$emit('toDo:markComplete', toDo.id)"
              ><v-icon>mdi-check-bold</v-icon></v-btn
            >
          </div>
          <v-icon v-if="toDo.isComplete" class="ml-4">mdi-check-bold</v-icon>
        </div>
        <div v-else class="d-flex align-center">
          <v-text-field v-model="updatedToDoDescription" />
          <v-btn icon color="red" class="close-icon" @click="cancelEdit"
            ><v-icon>mdi-plus-circle-outline</v-icon></v-btn
          >
          <v-btn icon color="green" @click="saveEdit(toDo)"
            ><v-icon>mdi-check-bold</v-icon></v-btn
          >
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
type ComponentDataPropertyTypes = {
  activelyEditedToDoId: String
  updatedToDoDescription: String
}
export default Vue.extend({
  props: {
    toDos: {
      type: Array as () => Array<ToDo>,
      required: true,
    },
  },
  data(): ComponentDataPropertyTypes {
    return {
      activelyEditedToDoId: '',
      updatedToDoDescription: '',
    }
  },
  methods: {
    isTaskBeingEdited(toDoId: String): Boolean {
      return toDoId === this.activelyEditedToDoId
    },
    cancelEdit(): void {
      this.activelyEditedToDoId = ''
      this.updatedToDoDescription = ''
    },
    saveEdit(toDo: ToDo): void {
      const updatedToDo: ToDo = {
        ...toDo,
        description: this.updatedToDoDescription,
        isComplete: false,
      }
      this.$emit('toDo:edit', updatedToDo)
      this.activelyEditedToDoId = ''
      this.updatedToDoDescription = ''
    },
    editToDo({ id, description }: ToDo): void {
      this.activelyEditedToDoId = id
      this.updatedToDoDescription = description
    },
  },
})
</script>
<style lang="scss">
.close-icon {
  transform: rotateZ(45deg);
}
</style>
