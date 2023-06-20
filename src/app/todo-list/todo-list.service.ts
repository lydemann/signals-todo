import { Injectable, computed, signal } from '@angular/core';

export interface TodoItem {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface TodoListState {
  todoItems: TodoItem[];
}

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  state = signal<TodoListState>({ todoItems: [] });

  todoItems = computed(() => this.state().todoItems);

  deleteTodo(todoItemId: string) {
    const newTodoList = this.state().todoItems.filter(
      (todo) => todo.id !== todoItemId
    );
    this.state.update((state) => ({ ...state, todoItems: newTodoList }));
  }

  fetchTodoItems() {
    this.state.update((state) => ({
      ...state,
      todoItems: [
        {
          id: '1',
          name: 'Create YT video',
          isCompleted: false,
        } as TodoItem,
        {
          id: '2',
          name: 'Go to the gym',
          isCompleted: false,
        } as TodoItem,
        {
          id: '3',
          name: 'Buy flowers',
          isCompleted: false,
        } as TodoItem,
      ],
    }));
  }

  saveTodo(todoItemToSave: TodoItem) {
    if (todoItemToSave.id) {
      // update

      const updatedTodoList = this.state().todoItems.map((todoItem) => {
        if (todoItem.id === todoItemToSave.id) {
          return todoItemToSave;
        }
        return todoItem;
      });

      this.state.update((state) => ({
        ...state,
        todoItems: [...updatedTodoList],
      }));
    } else {
      // create
      const newTodoItem = {
        ...todoItemToSave,
        id: crypto.randomUUID(),
      } as TodoItem;
      this.state.update((state) => ({
        ...state,
        todoItems: [...state.todoItems, newTodoItem],
      }));
    }
  }
}
