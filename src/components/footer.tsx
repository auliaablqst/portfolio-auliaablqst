"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", emoji: "🐙", href: "#" },
    { name: "LinkedIn", emoji: "💼", href: "#" },
    { name: "Email", emoji: "📧", href: "mailto:aulia.bilqisty@email.com" },
  ];

  return (
    <footer className="backdrop-blur-xl bg-white/10 border-t border-white/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Aulia Bilqisty
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Data Science • UI Design • Business Analyst
              <br />
              Politeknik Negeri Malang
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: "About", href: "/about" },
                { name: "Projects", href: "/projects" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 hover:text-purple-600 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/20 border border-white/30 rounded-xl flex items-center justify-center text-gray-700 hover:text-purple-600 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  target={social.name !== "Email" ? "_blank" : undefined}
                  rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                >
                  <span className="text-lg">{social.emoji}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/20 mt-8 pt-8 text-center"
        >
          <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
            © {currentYear} Aulia Bilqisty. Made with
            <span className="text-red-500">❤️</span>
            using Next.js & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
}