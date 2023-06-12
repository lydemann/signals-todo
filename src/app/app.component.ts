import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListService } from './todo-list/todo-list.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'web';

  /**
   *
   */
  constructor(todoListService: TodoListService) {
    todoListService.fetchTodoItems();
  }
}
