import { useState, useEffect } from "react";

import { TodoForm } from "./components/TodoForm/TodoForm";
import styles from "./App.module.css";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoFilters } from "./components/TodoFilters/TodoFilters";

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
  
  function fetchTodos() {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}todos`, {
      method: 'GET',
      headers: {'content-type':'application/json'},
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    })
    .then((data) => {
      console.log("Fetched todos:", data);
      setTodos(data);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setTodos([]); // hoặc dùng TODOS_DEFAULT để test
    });
}

  function handleUpdate(id, newTodo) {
    fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}todos/${id}`, {
      method: 'PUT',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(newTodo),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    })
    .then(fetchTodos)}
    
    function handleRemove(id) {
      const searchParams = new URLSearchParams(filters).toString();
      fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}todos/${id}?${searchParams}`, {
        method: 'DELETE',
        headers: {'content-type':'application/json'},
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network error');
        return response.json();
      })
      .then(fetchTodos)}
      
      function handleCreate(newTodo) {
        fetch(`${import.meta.env.VITE_MOCKAPI_BASE_URL}todos`, {
          method: 'POST',
          headers: {'content-type':'application/json'},
          body: JSON.stringify(newTodo),
      })
        .then((response) => {
          if (!response.ok) throw new Error('Network error');
          return response.json();
        })
        .then(fetchTodos)}

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
          <TodoFilters onFilter={setFilters}/>
        <TodoList todos={todos.filter(filterTodos)} onUpdate={handleUpdate} onDelete={handleRemove} />
      </div>
      
    </div>
  );
}

export default App;
