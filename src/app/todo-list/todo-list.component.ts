import { CommonModule } from '@angular/common';
import { Component, Signal, TrackByFunction } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoItem, TodoListService } from './todo-list.service';

@Component({
  selector: 'app-demo-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodoItemComponent, SharedModule],
  template: `
    <div class="block mb-6">
      <app-todo-item
        class="mb-1"
        *ngFor="let todoItem of todoItems(); trackBy: todoItemsTrackBy"
        [todoItem]="todoItem"
        (delete)="onDeleteTodo($event)"
        (edit)="onEdit($event)"
        (isCompletedChange)="onIsCompletedChange($event)"
      >
      </app-todo-item>
    </div>

    <form [formGroup]="formGroup" (submit)="onSaveTodo()">
      <mat-form-field class="example-form-field" appearance="fill">
        <mat-label>Todo name</mat-label>
        <input matInput type="text" formControlName="name" />
      </mat-form-field>

      <button
        mat-button
        color="primary"
        [disabled]="formGroup.invalid"
        type="submit"
      >
        Save
      </button>
    </form>
  `,
  styles: [
    `
      :host {
        @apply flex justify-center flex-col items-center;
      }
    `,
  ],
})
export class TodoListComponent {
  selectedTodo!: TodoItem | null;
  todoItems: Signal<TodoItem[]>;
  formGroup: FormGroup<{
    name: FormControl<string | null>;
  }>;

  constructor(private todoListService: TodoListService) {
    this.todoItems = todoListService.todoItems;

    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  onDeleteTodo(todoItemId: string) {
    this.todoListService.deleteTodo(todoItemId);
  }

  onIsCompletedChange(todoItem: TodoItem) {
    this.todoListService.saveTodo(todoItem);
  }

  onEdit(todoItem: TodoItem) {
    this.selectedTodo = todoItem;

    this.formGroup.setValue({
      name: this.selectedTodo.name,
    });
  }

  onSaveTodo() {
    const todoItem = {
      ...this.selectedTodo,
      name: this.formGroup.value.name,
    } as TodoItem;

    this.todoListService.saveTodo(todoItem);

    this.selectedTodo = null;
    this.formGroup.reset();
  }

  todoItemsTrackBy: TrackByFunction<TodoItem> = (idx, item) => {
    return item.id;
  };
}
