import { PRIORITIES, PRIORITY_DEFAULT } from "../../constants/priorities";
import styles from "./TodoListItem.module.css";
import { TodoFormFields } from "../TodoFormFields/TodoFormFields";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { getTodoSchema } from "../../schemas/todo";
import { useForm } from "react-hook-form";

export function TodoListItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(getTodoSchema()), defaultValues: todo });

  function handleComplete(event) {
    onUpdate(todo.id, { ...todo, completed: event.target.checked });
  }
  const handleEdit = (data) => {
    onUpdate(todo.id, data);
    setIsEditing(false);
  };

  const priorityObj = PRIORITIES[todo.priority] || PRIORITIES[PRIORITY_DEFAULT];
  const editingTemplate = (
    <form
      className={styles.Content}
      onReset={() => setIsEditing(false)}
      onSubmit={handleSubmit(handleEdit)}
    >
      <TodoFormFields todo={todo} register={register} errors={errors} />
      <div className={styles.Controls}>
        <input type="submit" value="💾" />
        <input type="reset" value="❌" />
      </div>
    </form>
  );
  const viewTemplate = (
    <div className={styles.Content}>
      <input
        type="checkbox"
        checked={todo.completed}
        name="completed"
        onChange={handleComplete}
        className={styles.status}
      />
      <div className={styles.Info}>
        {todo.name}
        {todo.description && (
          <span className={styles.Description}>{todo.description}</span>
        )}

        <div className={styles.AdditionalInfo}>
          {todo.deadline}{" "}
          {todo.priority !== PRIORITY_DEFAULT && (
            <span style={{ color: PRIORITIES[todo.priority].color }}>
              {PRIORITIES[todo.priority].label}
            </span>
          )}
        </div>
      </div>

      <div className={styles.Controls}>
        <button onClick={() => setIsEditing(true)}>✏️</button>
        <button onClick={() => onDelete(todo.id)}>🗑️</button>
      </div>
    </div>
  );
  return (
    <li className={styles.TodoListItem} data-completed={todo.completed}>
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}
