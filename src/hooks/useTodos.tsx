
import { useState, useEffect } from "react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type FilterType = "all" | "completed" | "pending";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });
  
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filterType === "all") return true;
    if (filterType === "completed") return todo.completed;
    if (filterType === "pending") return !todo.completed;
    return true;
  });

  const addTodo = (text: string) => {
    if (text.trim() === "") return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    };
    
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (id: string) => {
    setEditingId(id);
  };

  const finishEditing = (id: string, newText: string) => {
    if (newText.trim() === "") {
      deleteTodo(id);
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText.trim() } : todo
        )
      );
    }
    setEditingId(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  return {
    todos: filteredTodos,
    filterType,
    editingId,
    setFilterType,
    addTodo,
    deleteTodo,
    toggleComplete,
    startEditing,
    finishEditing,
    cancelEditing,
  };
};
