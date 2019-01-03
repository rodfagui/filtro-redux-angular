import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../../todo/todo.actions';

import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  pendientes: number;
  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.contarPendientes(state.todos);
    });
  }

  cambiarFiltro( nuevoFiltro: fromFiltro.filtrosValidos ) {
    const accion = new fromFiltro.SetFiltroAction( nuevoFiltro );
    this.store.dispatch( accion );
  }

  contarPendientes( todos: Todo[] ) {
    this.pendientes = todos.filter(todo => !todo.completado).length;
  }

  eliminarCompletadas() {
    const accion = new fromTodo.BorrarAllTodoAction();
    this.store.dispatch( accion );
  }
 }
