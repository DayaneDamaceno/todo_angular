import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root', // <app-root>
  templateUrl: './app.component.html', // ou template: '<p>meu template</p>'
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    // o primeiro '' é o Valor padrão
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  add() {
    //pega o valor inserido na tela
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;

    this.todos.push(new Todo(id, title, false));
    this.saveData();
    this.clear();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.saveData();
  }

  //eu recebo a referencia do obj original
  markAsDone(todo: Todo) {
    todo.done = true;
    this.saveData();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.saveData();
  }

  clear() {
    this.form.reset();
  }

  saveData(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  load() {
    const data = localStorage.getItem('todos');
    if(data){
      this.todos = JSON.parse(data);
    }
  }

}
