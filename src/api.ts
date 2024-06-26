export interface Todo {
  id: number | string;
  title: string;
  completed: boolean;
}

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

async function getTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Could not fetch todos.');
  }
  const data = await response.json();

  return data;
}

export { getTodos };
