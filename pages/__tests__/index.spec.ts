import { shallowMount } from '@vue/test-utils'
import Component from '../index.vue'

describe('index page', () => {
  it('should update the rendered todos when a new todo is created', async () => {
    const wrapper = shallowMount(Component, {
      stubs: {
        'v-switch': true,
      },
    })
    const CreateToDo = wrapper.find('[data-testid="create-to-do"]')
    const eventPayload: ToDo = {
      id: 'abc-123',
      description: 'new to-do',
      isComplete: false,
    }
    CreateToDo.vm.$emit('toDo:created', eventPayload)
    await wrapper.vm.$nextTick()
    const expectedToDos: ToDo[] = [
      {
        id: 'abc-123',
        description: 'new to-do',
        isComplete: false,
      },
    ]
    expect(wrapper.vm.toDos).toEqual(expectedToDos)
  })
})
