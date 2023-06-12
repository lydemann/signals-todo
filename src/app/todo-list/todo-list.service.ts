import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of } from 'rxjs';

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
  state = new BehaviorSubject<TodoListState>({ todoItems: [] });
  todoItems$: Observable<TodoItem[]> = this.state
    .asObservable()
    .pipe(map((state) => state.todoItems));

  deleteTodo(todoItemId: string) {
    const newTodoList = this.state.value.todoItems.filter(
      (todo) => todo.id !== todoItemId
    );
    this.state.next({ ...this.state.value, todoItems: newTodoList });
  }

  fetchTodoItems() {
    this.state.next({
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
    });
  }

  saveTodo(todoItemToSave: TodoItem) {
    if (todoItemToSave.id) {
      // update

      const updatedTodoList = this.state.value.todoItems.map(todoItem => {

        if(todoItem.id === todoItemToSave.id) {
          return todoItemToSave
        }
        return todoItem;
      })

      this.state.next({
        ...this.state.value,
        todoItems: [...updatedTodoList],
      });
    } else {
      // create
      const newTodoItem = {
        ...todoItemToSave,
        id: crypto.randomUUID(),
      } as TodoItem;
      this.state.next({
        ...this.state.value,
        todoItems: [...this.state.value.todoItems, newTodoItem],
      });
    }
  }
}
