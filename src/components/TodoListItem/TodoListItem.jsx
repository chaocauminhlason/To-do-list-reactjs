import { PRIORITIES, PRIORITY_DEFAULT } from '../../constants/priorities';
import styles from './TodoListItem.module.css';
import { TodoFormFields } from '../TodoFormFields/TodoFormFields';
import { useState } from 'react';
export function TodoListItem({ todo, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    function handleComplete(event) {
        onUpdate(todo.id, { ...todo, completed: event.target.checked });
    }
    const editingTemplate = (
        <form className={styles.Content} onReset={() => setIsEditing(false)}>
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
                        </div>
                    </li>          
    )
  return (
    <li  data-completed={todo.completed}>
        {isEditing?editingTemplate:viewTemplate}
    </li>
  );
}