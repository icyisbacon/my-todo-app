"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

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

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
            ✨ NEON TODO ✨
          </h1>
          <p className="text-xl text-cyan-200 font-light">
            Add some sparkle to your tasks! 🌟
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="group"
              >
                <div className="flex items-center gap-4 p-4 bg-black/20 backdrop-blur-sm border-2 border-transparent rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  <motion.button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
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
                        className="text-white text-lg"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                  
                  <motion.span
                    className={`flex-1 text-lg transition-all duration-300 ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-white"
                    }`}
                    animate={{
                      color: todo.completed ? "#9CA3AF" : "#FFFFFF"
                    }}
                  >
                    {todo.text}
                  </motion.span>
                  
                  <motion.button
                    onClick={() => deleteTodo(todo.id)}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ×
                  </motion.button>
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
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-xl text-cyan-200">
              No tasks yet! Add one above to get started! ✨
            </p>
          </motion.div>
        )}

        {/* Stats */}
        {todos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex gap-6 px-6 py-4 bg-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl">
              <div className="text-cyan-300">
                <span className="text-2xl font-bold text-pink-400">
                  {todos.length}
                </span>
                <br />
                <span className="text-sm">Total</span>
              </div>
              <div className="text-cyan-300">
                <span className="text-2xl font-bold text-green-400">
                  {todos.filter(t => t.completed).length}
                </span>
                <br />
                <span className="text-sm">Done</span>
              </div>
              <div className="text-cyan-300">
                <span className="text-2xl font-bold text-yellow-400">
                  {todos.filter(t => !t.completed).length}
                </span>
                <br />
                <span className="text-sm">Pending</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
