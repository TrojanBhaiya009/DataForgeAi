'use client'

import { motion } from 'framer-motion'

interface StatCardProps {
  value: string
  label: string
  gradient: 'cyan' | 'emerald' | 'amber' | 'violet'
  index?: number
}

const gradientText = {
  cyan: 'bg-gradient-to-r from-cyan-400 to-teal-400',
  emerald: 'bg-gradient-to-r from-emerald-400 to-green-400',
  amber: 'bg-gradient-to-r from-amber-400 to-orange-400',
  violet: 'bg-gradient-to-r from-violet-400 to-purple-400',
}

export default function StatCard({ value, label, gradient, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center p-6"
    >
      <p className={`
        text-5xl md:text-6xl font-bold
        bg-clip-text text-transparent
        ${gradientText[gradient]}
      `}>
        {value}
      </p>
      <p className="mt-2 text-sm text-zinc-500 uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  )
}
