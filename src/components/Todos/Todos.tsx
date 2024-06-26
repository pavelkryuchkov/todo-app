import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { receivedTodos, selectTodos } from '../../store/todosSlice';
import { getTodos } from '../../api';
import TodoItem from '../Todo/Todo';
import styles from './Todos.module.scss';

function Todos() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodos().then((todos) => {
      dispatch(receivedTodos(todos.slice(0, 10)));
    });
  }, [dispatch]);

  const todos = useAppSelector(selectTodos);

  return (
    <div className={styles.todos}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default Todos;
