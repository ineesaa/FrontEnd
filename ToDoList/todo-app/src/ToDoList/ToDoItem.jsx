export const ToDoItem = ({ id, text, completed, onRemove, onToggle }) => {
    return (
      <div className="todo-item">
        <span className={`todo-text ${completed ? "completed" : ""}`}>
          {text}
        </span>
  
        <div className="todo-actions">
          <button className="btn-delete" onClick={() => onRemove(id)}>
            delete
          </button>
          <button className="btn-toggle" onClick={() => onToggle(id)}>
            {completed ? "cancel" : "complete"}
          </button>
        </div>
      </div>
    );
  };
  