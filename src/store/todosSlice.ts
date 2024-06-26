import {
  createAction,
  createSlice,
  nanoid,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from './store';
import { Todo, getTodos } from '../api';
import { call, put } from 'redux-saga/effects';

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    receivedTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.todos.unshift(action.payload);
      },
      prepare(title: string) {
        return {
          payload: {
            id: nanoid(),
            completed: false,
            title,
          },
        };
      },
    },
    toggleCompleted(state, action: PayloadAction<string | number>) {
      const id = action.payload;
      const selectedTodo = state.todos.find((todo) => todo.id === id);
      if (selectedTodo) {
        selectedTodo.completed = !selectedTodo.completed;
      }
    },
    removeTodo(state, action: PayloadAction<string | number>) {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    moveTodo: {
      reducer(
        state,
        action: PayloadAction<{ id: string | number; direction: 'up' | 'down' }>
      ) {
        const { id, direction } = action.payload;
        const todoIndex = state.todos.findIndex((todo) => todo.id === id);
        let swapIndex = todoIndex;
        if (direction === 'up' && todoIndex > 0) {
          swapIndex -= 1;
        } else if (direction === 'down' && todoIndex < state.todos.length - 1) {
          swapIndex += 1;
        }
        [state.todos[todoIndex], state.todos[swapIndex]] = [
          state.todos[swapIndex],
          state.todos[todoIndex],
        ];
      },
      prepare(id: string | number, direction: 'up' | 'down') {
        return {
          payload: { id, direction },
        };
      },
    },
  },
});

export const selectTodos = (state: RootState) => state.todos.todos;
export const { addTodo, receivedTodos, toggleCompleted, removeTodo, moveTodo } =
  todosSlice.actions;

export function* fetchTodosSaga() {
  const todos: Todo[] = yield call(getTodos);
  yield put(receivedTodos(todos.slice(0, 10)));
}

export const FETCH_TODOS = 'todos/fetchTodos';
export const fetchTodos = createAction(FETCH_TODOS);

export default todosSlice.reducer;
