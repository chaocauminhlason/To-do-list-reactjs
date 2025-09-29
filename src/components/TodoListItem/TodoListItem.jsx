import { PRIORITIES, PRIORITY_DEFAULT } from '../../constants/priorities';
import styles from './TodoListItem.module.css';
import { TodoFormFields } from '../TodoFormFields/TodoFormFields';
import { useState } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { getTodoSchema } from "../../schemas/todo";
import { useForm } from 'react-hook-form';

export function TodoListItem({ todo, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const { register, 
        handleSubmit, 
        formState: {errors}, 
    } = useForm({  resolver: yupResolver(getTodoSchema()),defaultValues: todo });

    function handleComplete(event) {
        onUpdate(todo.id, { ...todo, completed: event.target.checked });
    }
    const handleEdit = (data) => {
    onUpdate (todo.id,data);
    setIsEditing(false);
    }
    
    const editingTemplate = (
        <form className={styles.Content} onReset={() => setIsEditing(false)} onSubmit={handleSubmit(handleEdit)} >
            <TodoFormFields todo={todo} register={register} errors={errors} />
            <div className={styles.Controls}  >

                <input type="submit" value="💾" />
                <input type="reset" value="❌" />

            </div>
        </form>
    )
    const viewTemplate = (
                    <div key={todo.id} 
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
                            {todo.priority !== PRIORITY_DEFAULT && (
                            <span style={{color: PRIORITIES[todo.priority].color }} >
                                {PRIORITIES[todo.priority].label}
                            </span>)}
                        
                        </div>
                        <div className={styles.Controls} >
                            <button onClick={() => setIsEditing(true)} >✏️</button>
                            <button onClick={() => onDelete(todo.id)} >🗑️</button>
                        </div>
                    </div>          
    )
  return (
    <li  data-completed={todo.completed}>
        {isEditing?editingTemplate:viewTemplate}
    </li>
  );
}