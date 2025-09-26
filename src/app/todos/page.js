"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function TodosPage() {
  // Persisted state loaded from KV via /api/todo
  const [todos, setTodos] = useState([]);
  
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTodo = async () => {
    const text = inputValue.trim();
    if (!text) return;
    const res = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    if (res.ok) {
      setTodos(data.todos || []);
      setInputValue("");
    }
  };

  const toggleTodo = async (id) => {
    const target = todos.find(t => t.id === id);
    if (!target) return;
    const res = await fetch("/api/todo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !target.completed })
    });
    if (res.ok) {
      const data = await res.json();
      setTodos(data.todos || []);
    }
  };

  const deleteTodo = async (id) => {
    const res = await fetch(`/api/todo?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      const data = await res.json();
      setTodos(data.todos || []);
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.text);
  };

  const saveEdit = async () => {
    const text = editValue.trim();
    if (!text || !editingId) return;
    const res = await fetch("/api/todo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, text })
    });
    if (res.ok) {
      const data = await res.json();
      setTodos(data.todos || []);
      setEditingId(null);
      setEditValue("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  // Load todos on mount
  React.useEffect(() => {
    const load = async () => {
      try {
        console.log("Loading todos from /api/todo...");
        const res = await fetch("/api/todo");
        console.log("API response status:", res.status);
        const data = await res.json();
        console.log("API response data:", data);
        setTodos(Array.isArray(data) ? data : (data.todos || []));
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    };
    load();
  }, []);

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-between mb-8"
        >
          <Link href="/">
            <motion.button
              className="px-6 py-3 bg-black/30 backdrop-blur-sm border-2 border-cyan-400/50 rounded-xl text-cyan-300 font-semibold hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Home
            </motion.button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 drop-shadow-2xl">
              ✨ NEON TODO ✨
            </h1>
            <p className="text-lg text-cyan-200 font-light">
              Add some sparkle to your tasks! 🌟
            </p>
          </div>
          
          <div className="w-32"></div> {/* Spacer for centering */}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center gap-8 px-6 py-4 bg-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">{totalCount}</div>
              <div className="text-sm text-cyan-300">Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{completedCount}</div>
              <div className="text-sm text-cyan-300">Done</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{totalCount - completedCount}</div>
              <div className="text-sm text-cyan-300">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
              </div>
              <div className="text-sm text-cyan-300">Progress</div>
            </div>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex gap-4">
            <motion.input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done? ✨"
              className="flex-1 px-6 py-4 text-lg bg-black/30 backdrop-blur-sm border-2 border-cyan-400 rounded-2xl text-white placeholder-cyan-300 focus:outline-none focus:border-pink-400 focus:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-300"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              onClick={addTodo}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(236,72,153,1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              ADD
            </motion.button>
          </div>
        </motion.div>

        {/* Todo List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.8 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                className="group"
              >
                <div className="flex items-center gap-4 p-5 bg-black/20 backdrop-blur-sm border-2 border-transparent rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  <motion.button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      todo.completed
                        ? "bg-gradient-to-r from-green-400 to-emerald-500 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                        : "border-cyan-400 hover:border-pink-400 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {todo.completed && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-white text-xl"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                  
                  <div className="flex-1">
                    {editingId === todo.id ? (
                      <motion.input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={handleEditKeyPress}
                        onBlur={saveEdit}
                        className="w-full px-3 py-2 bg-black/40 backdrop-blur-sm border border-cyan-400 rounded-lg text-white focus:outline-none focus:border-pink-400"
                        autoFocus
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                      />
                    ) : (
                      <motion.div
                        className={`text-lg transition-all duration-300 ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-white"
                        }`}
                        animate={{
                          color: todo.completed ? "#9CA3AF" : "#FFFFFF"
                        }}
                        onDoubleClick={() => startEdit(todo)}
                      >
                        {todo.text}
                      </motion.div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(todo.createdAt || Date.now()).toLocaleTimeString()}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => editingId === todo.id ? saveEdit() : startEdit(todo)}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title={editingId === todo.id ? "Save" : "Edit"}
                    >
                      {editingId === todo.id ? "✓" : "✏️"}
                    </motion.button>
                    
                    {editingId === todo.id && (
                      <motion.button
                        onClick={cancelEdit}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 text-white flex items-center justify-center hover:shadow-[0_0_15px_rgba(107,114,128,0.5)] transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Cancel"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        ✕
                      </motion.button>
                    )}
                    
                    <motion.button
                      onClick={() => deleteTodo(todo.id)}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete"
                    >
                      🗑️
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {todos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6">🎯</div>
            <p className="text-2xl text-cyan-200 mb-4">
              All done! Great job! 🎉
            </p>
            <p className="text-lg text-gray-300">
              Add a new task above to keep the productivity flowing! ✨
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
