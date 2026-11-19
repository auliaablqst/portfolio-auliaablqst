"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      title: "Customer Segmentation Analysis",
      description: "Analisis segmentasi pelanggan menggunakan algoritma K-Means clustering untuk mengidentifikasi pola pembelian dan meningkatkan strategi marketing.",
      tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
      type: "Data Science",
      github: "#",
      demo: "#",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "E-Commerce Dashboard",
      description: "Dashboard interaktif untuk monitoring performa e-commerce dengan visualisasi real-time sales, inventory, dan customer behavior.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
      type: "Web Development",
      github: "#",
      demo: "#",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Business Process Optimization",
      description: "Sistem analisis dan optimasi proses bisnis menggunakan Java untuk mengidentifikasi bottleneck dan meningkatkan efisiensi operasional.",
      tech: ["Java", "Spring Boot", "MySQL", "JPA"],
      type: "Business Analysis",
      github: "#",
      demo: "#",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Predictive Sales Model",
      description: "Model machine learning untuk memprediksi penjualan menggunakan time series analysis dan regression algorithms.",
      tech: ["Python", "TensorFlow", "NumPy", "Seaborn"],
      type: "Data Science",
      github: "#",
      demo: "#",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "UI/UX Design System",
      description: "Design system komprehensif untuk aplikasi mobile banking dengan komponen reusable dan guidelines yang konsisten.",
      tech: ["Figma", "Adobe XD", "Sketch", "InVision"],
      type: "UI Design",
      github: "#",
      demo: "#",
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Inventory Management System",
      description: "Aplikasi manajemen inventori dengan fitur forecasting demand menggunakan algoritma machine learning sederhana.",
      tech: ["Java", "JavaFX", "SQLite", "Maven"],
      type: "Business Analysis",
      github: "#",
      demo: "#",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Proyek Saya</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Koleksi proyek yang menunjukkan kemampuan saya dalam data science,
            UI design, dan business analysis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className={`h-2 bg-gradient-to-r ${project.color} rounded-full mb-4`}></div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-white/20 text-xs font-medium text-gray-700 rounded-full">
                  {project.type}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/20 text-xs text-gray-700 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Link
                  href={project.github}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <span>🐙</span>
                  Code
                </Link>
                <Link
                  href={project.demo}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Tertarik untuk melihat lebih banyak? Mari kita diskusikan proyek berikutnya!
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Hubungi Saya
          </Link>
        </motion.div>
      </div>
    </div>
  );
}