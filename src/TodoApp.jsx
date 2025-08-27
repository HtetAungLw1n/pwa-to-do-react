import { useState } from "react";
import { Plus, X, Check } from "lucide-react";

export default function ToDoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
          createdAt: new Date().toLocaleDateString(),
        },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Todo<span className="text-red-500">.</span>
          </h1>
          <p className="text-gray-400">
            {totalCount > 0
              ? `${completedCount} of ${totalCount} tasks completed`
              : "No tasks yet. Add one below."}
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            />
            <button
              onClick={addTodo}
              disabled={!inputValue.trim()}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="mb-6">
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-600 text-6xl mb-4">✓</div>
              <p className="text-gray-400 text-lg">All caught up!</p>
              <p className="text-gray-500">Add a task to get started.</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className={`group bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-all duration-200 ${
                  todo.completed ? "opacity-75" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      todo.completed
                        ? "bg-red-500 border-red-500"
                        : "border-gray-600 hover:border-red-500"
                    }`}
                  >
                    {todo.completed && (
                      <Check size={14} className="text-white" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-lg ${
                        todo.completed
                          ? "line-through text-gray-500"
                          : "text-white"
                      }`}
                    >
                      {todo.text}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Added on {todo.createdAt}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {totalCount > 0 && (
          <div className="mt-8 text-center">
            <div className="inline-flex gap-6 text-sm text-gray-400">
              <span>{totalCount} total</span>
              <span>{completedCount} completed</span>
              <span>{totalCount - completedCount} remaining</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
