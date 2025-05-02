
import { useTodos } from "@/hooks/useTodos";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import TodoFilter from "./TodoFilter";
import { Separator } from "./ui/separator";

const TodoList = () => {
  const {
    todos,
    filterType,
    editingId,
    setFilterType,
    addTodo,
    deleteTodo,
    toggleComplete,
    startEditing,
    finishEditing,
    cancelEditing,
  } = useTodos();

  return (
    <div className="w-full max-w-md mx-auto">
      <TodoInput onAddTodo={addTodo} />
      
      <TodoFilter currentFilter={filterType} onFilterChange={setFilterType} />

      <Separator className="my-6"/>
      
      {todos.length > 0 ? (
        <ul className="mt-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editingId === todo.id}
              onDelete={deleteTodo}
              onToggleComplete={toggleComplete}
              onStartEditing={startEditing}
              onFinishEditing={finishEditing}
              onCancelEditing={cancelEditing}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {filterType === "all" 
            ? "No tasks yet. Add one above!"
            : filterType === "completed" 
              ? "No completed tasks yet."
              : "No pending tasks."}
        </div>
      )}
      
      {todos.length > 0 && (
        <div className="text-center mt-4 text-sm text-gray-500">
          {todos.length} {todos.length === 1 ? "task" : "tasks"} 
          {filterType !== "all" ? ` (${filterType})` : ""}
        </div>
      )}
    </div>
  );
};

export default TodoList;
