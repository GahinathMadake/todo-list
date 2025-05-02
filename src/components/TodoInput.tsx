
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput = ({ onAddTodo }: TodoInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
        autoFocus
      />
      <Button type="submit" className="bg-primary hover:bg-primary/80">
        <Plus className="h-5 w-5" />
        <span className="ml-1 hidden sm:inline">Add Task</span>
      </Button>
    </form>
  );
};

export default TodoInput;
