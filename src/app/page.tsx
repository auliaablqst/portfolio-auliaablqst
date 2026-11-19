"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Aulia Bilqisty
            </motion.h1>
            <motion.div
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Sparkles className="w-6 h-6 text-purple-500" />
              <span className="text-xl md:text-2xl text-gray-700 font-medium">
                Data Science • UI Design • Business Analyst
              </span>
              <Sparkles className="w-6 h-6 text-purple-500" />
            </motion.div>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Mahasiswa Sistem Informasi Bisnis di Politeknik Negeri Malang yang
            menggabungkan analisis data, desain antarmuka, dan wawasan bisnis
            untuk menciptakan solusi inovatif yang berdampak.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Link
              href="/projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Lihat Proyek Saya</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-purple-300 text-purple-600 font-semibold rounded-2xl hover:bg-purple-50 transition-colors duration-300"
            >
              Hubungi Saya
            </Link>
          </motion.div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <ChevronDown className="w-8 h-8 text-gray-400 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Glassmorphism Preview Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Apa yang Saya Lakukan
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Data Science",
                description: "Menganalisis data untuk insights bisnis yang actionable menggunakan Python, machine learning, dan visualisasi data.",
                icon: "📊",
              },
              {
                title: "UI Design",
                description: "Mendesain antarmuka yang intuitif dan estetis dengan fokus pada user experience dan accessibility.",
                icon: "🎨",
              },
              {
                title: "Business Analysis",
                description: "Mengidentifikasi peluang bisnis dan mengoptimalkan proses melalui analisis sistem informasi.",
                icon: "💼",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}