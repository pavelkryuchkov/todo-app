import { memo, useState, type FormEvent } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addTodo } from '../../store/todosSlice';
import styles from './NewTodo.module.scss';

const NewTodo = memo(function NewTodo() {
  const dispatch = useAppDispatch();

  const [todoTitle, setTodoTitle] = useState('');

  function handleAddTodo(e: FormEvent) {
    e.preventDefault();
    dispatch(addTodo(todoTitle));
    setTodoTitle('');
  }

  return (
    <form className={styles.form} onSubmit={handleAddTodo}>
      <input
        type="text"
        name="new-todo"
        placeholder="New Todo"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
});

export default NewTodo;
