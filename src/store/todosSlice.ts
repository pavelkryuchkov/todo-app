import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Todo } from '../api';

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
        state.todos.push(action.payload);
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
    moveTodoUp(state, action: PayloadAction<string | number>) {
      const id = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex > 0) {
        const prevIndex = todoIndex - 1;
        [state.todos[todoIndex], state.todos[prevIndex]] = [
          state.todos[prevIndex],
          state.todos[todoIndex],
        ];
      }
    },
    moveTodoDown(state, action: PayloadAction<string | number>) {
      const id = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex < state.todos.length - 1) {
        const nextIndex = todoIndex + 1;
        [state.todos[todoIndex], state.todos[nextIndex]] = [
          state.todos[nextIndex],
          state.todos[todoIndex],
        ];
      }
    },
  },
});

export const selectTodos = (state: RootState) => state.todos.todos;
export const {
  addTodo,
  receivedTodos,
  toggleCompleted,
  removeTodo,
  moveTodoUp,
  moveTodoDown,
} = todosSlice.actions;

export default todosSlice.reducer;
