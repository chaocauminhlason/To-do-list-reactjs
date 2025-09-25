import { PRIORITIES, PRIORITY_DEFAULT } from '../../constants/priorities';
import styles from './TodoListItem.module.css';
import { TodoFormFields } from '../TodoFormFields/TodoFormFields';
import { useState } from 'react';
export function TodoListItem({ todo, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isRemove, setIsRemove] = useState(false);
    function handleComplete(event) {
        onUpdate(todo.id, { ...todo, completed: event.target.checked });
    }
    const handleEdit = (event) => {
        event.preventDefault();

        const { elements } = event.target;

    if (elements.name.value === "") return "";
         setIsEditing(false);
    onUpdate (todo.id, {
        name: elements.name.value,
        description: elements.description.value,
        deadline: elements.deadline.value,
        priority: elements.priority.value,
        completed: todo.completed,
     });
    }
    const handleRemove = () => {
        onUpdate (todo.id, null);
    }
    const editingTemplate = (
        <form className={styles.Content} onReset={() => setIsEditing(false)} onSubmit={handleEdit} >
            <TodoFormFields todo={todo}/>
            <div className={styles.Controls}  >

                <input type="submit" value="💾" />
                <input type="reset" value="❌" />

            </div>
        </form>
    )
    const viewTemplate = (
                    <li key={todo.id} 
                    className={styles.TodoListItem}
                    data-completed={todo.completed} 
                    >
                        <div className={styles.Content}>
                        <input type="checkbox" 
                        defaultChecked={todo.completed}  
                        name="completed" 
                        onChange={handleComplete}
                        
                        />
                        </div>
                        <div className={styles.Info}>
                            {todo.name}
                            <br />
                            {todo.description && <>{todo.description}<br /></>}
                            {todo.deadline && <>{todo.deadline}<br /></>}
                            {todo.priority !== PRIORITY_DEFAULT && <span style={{color: PRIORITIES[todo.priority].color }} >{PRIORITIES[todo.priority].label}</span>}
                        
                        </div>
                        <div className={styles.Controls} >
                            <button onClick={() => setIsEditing(true)} >✏️</button>
                            <button onClick={() => onDelete(todo.id)} >🗑️</button>
                        </div>
                    </li>          
    )
  return (
    <li  data-completed={todo.completed}>
        {isEditing?editingTemplate:viewTemplate}
    </li>
  );
}