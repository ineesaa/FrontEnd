import { ToDoItem } from "./ToDoItem";

export const List = ({ items, onRemove, onToggle }) => {
  return (
    <div>
      {items.map(todo => (
        <ToDoItem
          key={todo.id}
          {...todo}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};
