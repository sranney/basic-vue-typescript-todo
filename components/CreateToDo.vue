<template>
  <div>
    <v-text-field
      v-model="newToDoDescription"
      placeholder="Enter To-Do text here"
    />
    <v-btn color="primary" @click="createNewToDo">Create New To Do</v-btn>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
type ComponentDataPropertyTypes = {
  newToDoDescription: String
}
export default Vue.extend({
  data(): ComponentDataPropertyTypes {
    return {
      newToDoDescription: '',
    }
  },
  methods: {
    createNewToDo(): void {
      const newToDo: ToDo = {
        id: uuidv4(),
        description: this.newToDoDescription,
        isComplete: false,
      }
      this.$emit('toDo:created', newToDo)
      this.newToDoDescription = ''
    },
  },
})
</script>
