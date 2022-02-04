<template>
  <div>
    <CreateToDo data-testid="create-to-do" @toDo:created="addToDo" />
    <v-switch
      v-model="showCompletedToDos"
      :label="`Show Completed: ${showCompletedToDos}`"
    />
    <ToDoList :to-dos="toDos" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import CreateToDo from '../components/CreateToDo.vue'
import ToDoList from '../components/ToDoList.vue'

type ComponentDataPropTypes = {
  toDos: ToDo[]
  showCompletedToDos: Boolean
}

export default Vue.extend({
  components: {
    CreateToDo,
    ToDoList,
  },
  data(): ComponentDataPropTypes {
    return {
      toDos: [], // type is defined in ComponentDataPropTypes
      showCompletedToDos: false,
    }
  },
  computed: {
    filteredToDos(): ToDo[] {
      return this.showCompletedToDos
        ? this.toDos
        : this.toDos.filter((toDo: ToDo): Boolean => !toDo.isComplete)
    },
  },
  methods: {
    addToDo(toDoDto: ToDo): void {
      this.toDos = [...this.toDos, toDoDto]
    },
    deleteToDo(toDoId: String): void {
      this.toDos = this.toDos.filter(
        (toDo: ToDo): Boolean => toDo.id !== toDoId
      )
    },
    completeToDo(toDoId: String): void {
      this.toDos = this.toDos.map((toDo: ToDo): ToDo => {
        if (toDo.id === toDoId) {
          return {
            ...toDo,
            isComplete: true,
          }
        }
        return toDo
      })
    },
    updateToDo(updatedToDoData: ToDo): void {
      this.toDos = this.toDos.map((toDo: ToDo): ToDo => {
        if (toDo.id === updatedToDoData.id) {
          return updatedToDoData
        }
        return toDo
      })
    },
  },
})
</script>
