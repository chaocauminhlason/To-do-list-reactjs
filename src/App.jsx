import { useState, useEffect } from "react";

import { TodoForm } from "./components/TodoForm/TodoForm";
import styles from "./App.module.css";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoFilters } from "./components/TodoFilters/TodoFilters";
import { api } from "./api";
const TODOS_DEFAULT = [
  {
    id: "1",
    name: "Buy an Ice Cream",
    description: "The white one with chocolate",
    deadline: "2025-02-09",
    priority: "low",
    completed: false,
  },
  {
    id: "2",
    name: "Sell old MacBook Pro 2025",
    description: "Try to sell it on OLX",
    deadline: "2025-02-28",
    priority: "high",
    completed: false,
  },
  {
    id: "3",
    name: "Charge Powerbank",
    description: "For the next travelling",
    deadline: "2025-02-15",
    priority: "medium",
    completed: true,
  },
  {
    id: "4",
    name: "Test Todo onlye with a name",
    description: "",
    deadline: "",
    priority: "none",
    completed: false,
  },
];

function App() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({});

  async function fetchTodos() {
    try {
      const data = await api.todos.getAll(filters);
      setTodos(data);
    }
    catch (error) {
      console.log("Error fetching todos, please try again later.");
    }
  }

  async function handleUpdate(id, newTodo) {
    try {
    await api.todos.update(id, newTodo);
    await fetchTodos();
    } catch (error) {
      console.log("Error updating todo, please try again later.");
    }
  }

  async function handleRemove(id) {
    try{
      await api.todos.delete(id);
      await fetchTodos();
    }
    catch (error) {
      console.log("Error deleting todo, please try again later.");
    }
  }

  async function handleCreate(newTodo) {
    try {
      await api.todos.create(newTodo);
      await fetchTodos();
    } catch (error) {
      console.log("Error creating todo, please try again later.");
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [filters]);

  // function handleCreate(newTodo) {
  //   setTodos((prevTodos) => [
  //     ...prevTodos,
  //     { id: `${prevTodos.length + 1}`, ...newTodo },
  //   ]);
  // }
  // function handleRemove(id) {
  //   setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  // }
  // function handleUpdate(id, newTodo) {
  //   setTodos((prevTodos) =>
  //     prevTodos.map((todo) => (todo.id === id ? newTodo : todo))
  //   );
  // }
  function filterTodos(todo) {
    const { completed, priority } = filters;

    return (
      (completed === "" || todo.completed === completed) &&
      (priority === "" || todo.priority === priority)
    );
  }
  console.log("API URL:", import.meta.env.VITE_MOCKAPI_BASE_URL);
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do.png" />
        <h2 className={styles.Title}>To-Do App</h2>
      </header>

      <div className={styles.AppContainer}>
        <TodoForm onCreate={handleCreate} />
        <TodoFilters onFilter={setFilters} />
        <TodoList
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleRemove}
        />
      </div>
    </div>
  );
}

export default App;
