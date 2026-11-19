"use client";

import { motion } from "framer-motion";
import { GraduationCap, Target, Code, Palette, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Tentang Saya</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Perjalanan saya dalam menggabungkan teknologi dan bisnis untuk menciptakan nilai.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Latar Belakang Akademis</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <GraduationCap className="w-6 h-6 text-purple-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Sistem Informasi Bisnis</h3>
                  <p className="text-purple-600">Politeknik Negeri Malang</p>
                  <p className="text-gray-600">2022 - Present</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Belajar tentang sistem informasi, analisis bisnis, dan teknologi informasi
                yang membentuk dasar pemahaman saya tentang bagaimana teknologi dapat
                mendukung keputusan bisnis yang lebih baik.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Visi Karier</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700">Menjadi bridge antara bisnis dan teknologi</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Mengembangkan solusi data-driven</span>
              </div>
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-pink-500" />
                <span className="text-gray-700">Menciptakan pengalaman user yang luar biasa</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Mendorong inovasi melalui analisis bisnis</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-12">Pendekatan Saya</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Analitis",
                description: "Selalu memulai dengan data dan fakta untuk membuat keputusan yang tepat.",
              },
              {
                title: "Kolaboratif",
                description: "Percaya bahwa solusi terbaik datang dari kerja sama tim yang solid.",
              },
              {
                title: "Inovatif",
                description: "Terus belajar dan menerapkan teknologi terbaru untuk masalah masa kini.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}