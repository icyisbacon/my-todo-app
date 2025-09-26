"use client";
import { useEffect, useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Load todos from KV on page load
  useEffect(() => {
    fetch("/api/todo")
      .then(res => res.json())
      .then(data => setTodos(data || []));
  }, []);

  // Add todo to KV
  const addTodo = async () => {
    if (!input.trim()) return;
    
    const response = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });
    
    const result = await response.json();
    setTodos(result.todos);
    setInput("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Todo App</h1>
      <div className="flex mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          className="border px-3 py-2 flex-1 mr-2"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2">
          Add
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="py-2 border-b">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}