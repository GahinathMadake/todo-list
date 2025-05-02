
import { useState, useRef, useEffect } from "react";
import { Todo } from "@/hooks/useTodos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Pencil, Trash2 } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onStartEditing: (id: string) => void;
  onFinishEditing: (id: string, newText: string) => void;
  onCancelEditing: () => void;
}

const TodoItem = ({
  todo,
  isEditing,
  onDelete,
  onToggleComplete,
  onStartEditing,
  onFinishEditing,
  onCancelEditing,
}: TodoItemProps) => {
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onFinishEditing(todo.id, editText);
    } else if (e.key === "Escape") {
      onCancelEditing();
    }
  };

  return (
    <li className="flex items-center justify-between py-3 px-4 bg-white rounded-lg shadow-sm mb-2 border border-gray-100 hover:shadow-md transition-all group">
      {isEditing ? (
        <div className="flex items-center flex-1 gap-2">
          <Input
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => onFinishEditing(todo.id, editText)}
            className="flex-1"
          />
        </div>
      ) : (
        <>
          <div className="flex items-center flex-1">
            <div 
              className="w-5 h-5 min-w-5 rounded-full border border-gray-300 mr-3 flex items-center justify-center cursor-pointer hover:border-primary"
              onClick={() => onToggleComplete(todo.id)}
            >
              {todo.completed && <Check className="h-3 w-3 text-primary" />}
            </div>
            <span 
              className={`flex-1 ${todo.completed ? "completed-task" : ""}`}
              onClick={() => onToggleComplete(todo.id)}
            >
              {todo.text}
            </span>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 text-gray-500"
              onClick={() => onStartEditing(todo.id)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-900 hover:text-destructive"
              onClick={() => onDelete(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
