
import TodoList from "@/components/TodoList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 px-4">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Todo List</h1>
        <p className="text-gray-600 text-center mb-8">Stay organized and productive with todo-list</p>
        <TodoList />
      </div>
    </div>
  );
};

export default Index;
