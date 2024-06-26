import { memo } from 'react';

import { type Todo } from '../../api';
import { useAppDispatch } from '../../store/hooks';
import { moveTodo, removeTodo, toggleCompleted } from '../../store/todosSlice';
import deleteIcon from '../../assets/images/delete.svg';
import styles from './TodoItem.module.scss';

interface Props {
  todo: Todo;
}

const TodoItem = memo(function TodoItem({ todo }: Props) {
  const dispatch = useAppDispatch();

  function handleToggleCompleted() {
    dispatch(toggleCompleted(todo.id));
  }

  function handleRemoveTodo() {
    dispatch(removeTodo(todo.id));
  }

  function handleMoveTodoUp() {
    dispatch(moveTodo(todo.id, 'up'));
  }

  function handleMoveTodoDown() {
    dispatch(moveTodo(todo.id, 'down'));
  }

  return (
    <div className={styles.todo}>
      <div className={styles.content}>
        <input
          type="checkbox"
          name="complete-todo"
          checked={todo.completed}
          onChange={handleToggleCompleted}
        />
        <span className={todo.completed ? styles.completed : ''}>
          {todo.title}
        </span>
      </div>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${styles.button_delete}`}
          onClick={handleRemoveTodo}
        >
          <img src={deleteIcon} alt="delete" />
        </button>
        <button className={styles.button} onClick={handleMoveTodoUp}>
          &uarr;
        </button>
        <button className={styles.button} onClick={handleMoveTodoDown}>
          &darr;
        </button>
      </div>
    </div>
  );
});

export default TodoItem;
