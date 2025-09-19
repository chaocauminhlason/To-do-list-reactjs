import { PRIORITIES, PRIORITY_DEFAULT } from '../../constants/Priorites';
import styles from './TodoListItem.module.css';

export function TodoListItem({ todo, onUpdate }) {
    function handleComplete(event) {
        onUpdate(todo.id, { ...todo, completed: event.target.checked });
    }
  return (
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

                    </li>    
  )
}