import {api} from "../api";
import { useEffect, useState } from "react";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  async function fetchTodos() {
    try {
      const data = await api.todos.getAll(filters);
      setTodos(data);
    }
    catch (error) {
      setErrorMessage("Error fetching todos, please try again later.");
    }
  }
  
  useEffect(() => {
    fetchTodos();
  }, [filters]);
  
  async function handleUpdate(id, newTodo) {
    try {
    await api.todos.update(id, newTodo);
    await fetchTodos();
    } catch (error) {
      setErrorMessage("Error updating todo, please try again later.");
    }
  }

  async function handleDelete(id) {
    try{
      await api.todos.delete(id);
      await fetchTodos();
    }
    catch (error) {
      setErrorMessage("Error deleting todo, please try again later.");
    }
  }

  async function handleCreate(newTodo) {
    try {
      await api.todos.create(newTodo);
      await fetchTodos();
    } catch (error) {
      setErrorMessage("Error creating todo, please try again later.");
    }
  }

  return { 
    data: todos, 
    create: handleCreate, 
    update: handleUpdate, 
    delete: handleDelete, 
    filter: setFilters,
    error: {
        message: errorMessage,
        clear: () => setErrorMessage()
    } 
};
}