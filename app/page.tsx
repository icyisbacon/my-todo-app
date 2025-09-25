"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
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

      <div className="relative z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-7xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            ✨ Welcome ✨
          </h1>
          <p className="text-2xl text-cyan-200 font-light mb-8">
            Your productivity journey starts here! 🚀
          </p>
        </motion.div>

        {/* Navigation Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/todos">
            <motion.button
              className="px-12 py-6 text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white rounded-3xl shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] transition-all duration-300 border-2 border-transparent hover:border-white/20"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 50px rgba(236,72,153,1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              🎯 Start Todo App
            </motion.button>
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl"
          >
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-cyan-300 mb-2">Beautiful Design</h3>
            <p className="text-gray-300">Modern UI with stunning animations</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-black/20 backdrop-blur-sm border border-pink-400/30 rounded-2xl"
          >
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-pink-300 mb-2">Fast & Smooth</h3>
            <p className="text-gray-300">Lightning-fast interactions</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-black/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-purple-300 mb-2">Stay Focused</h3>
            <p className="text-gray-300">Organize your tasks efficiently</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
