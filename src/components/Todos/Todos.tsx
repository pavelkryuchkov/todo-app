import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTodos, selectTodos } from '../../store/todosSlice';
import TodoItem from '../Todo/TodoItem';
import NewTodo from '../NewTodo/NewTodo';
import styles from './Todos.module.scss';

function Todos() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const todos = useAppSelector(selectTodos);

  return (
    <div className={styles.todos}>
      <NewTodo />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default Todos;
