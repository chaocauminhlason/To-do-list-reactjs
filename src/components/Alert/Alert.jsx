import  styles  from "./Alert.module.css";

export function Alert({  message, onClose }) {
    if (!message) return null;  
    return (
        <div className={styles.Alert}>
            <span>{message}</span>
            {onClose && <button onClick={onClose}>x</button>}
        </div>
    );
}