
import { TodoForm } from "./components/TodoForm/TodoForm";
import styles from "./App.module.css";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoFilters } from "./components/TodoFilters/TodoFilters";
import { useTodos } from "./hooks/todo";
import { Alert } from "./components/Alert/Alert";

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
  const todos= useTodos();

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
 
  
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/to-do.png" />
        <h2 className={styles.Title}>To-Do App</h2>
      </header>

      <div className={styles.AppContainer}>
        {!!todos.error.message &&
        <Alert type="error" message={todos.error.message} onClose={todos.error.clear} />
        }
        <TodoForm onCreate={todos.create} />
        <TodoFilters onFilter={todos.filter} />
        <TodoList
          todos={todos.data}
          onUpdate={todos.update}
          onDelete={todos.delete}
        />
      </div>
    </div>
  );
}

export default App;
