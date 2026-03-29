'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradient: 'cyan' | 'emerald' | 'amber' | 'rose' | 'violet' | 'teal'
  index?: number
}

const gradientColors = {
  cyan: {
    icon: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    border: 'group-hover:border-cyan-500/30',
    glow: 'group-hover:shadow-cyan-500/10',
  },
  emerald: {
    icon: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    border: 'group-hover:border-emerald-500/30',
    glow: 'group-hover:shadow-emerald-500/10',
  },
  amber: {
    icon: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    border: 'group-hover:border-amber-500/30',
    glow: 'group-hover:shadow-amber-500/10',
  },
  rose: {
    icon: 'text-rose-400',
    iconBg: 'bg-rose-500/10',
    border: 'group-hover:border-rose-500/30',
    glow: 'group-hover:shadow-rose-500/10',
  },
  violet: {
    icon: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    border: 'group-hover:border-violet-500/30',
    glow: 'group-hover:shadow-violet-500/10',
  },
  teal: {
    icon: 'text-teal-400',
    iconBg: 'bg-teal-500/10',
    border: 'group-hover:border-teal-500/30',
    glow: 'group-hover:shadow-teal-500/10',
  },
}

export default function FeatureCard({ icon: Icon, title, description, gradient, index = 0 }: FeatureCardProps) {
  const colors = gradientColors[gradient]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        group relative p-8 rounded-2xl
        border border-white/5 bg-zinc-900/30 backdrop-blur-sm
        transition-all duration-500
        hover:bg-zinc-900/50 hover:shadow-2xl
        ${colors.border} ${colors.glow}
      `}
    >
      {/* Gradient orb */}
      <div className={`
        absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0
        transition-opacity duration-500 group-hover:opacity-20
        ${colors.iconBg.replace('/10', '')}
      `} />
      
      <div className={`
        inline-flex h-14 w-14 items-center justify-center rounded-xl
        ${colors.iconBg}
        transition-all duration-300 group-hover:scale-110
      `}>
        <Icon className={`h-7 w-7 ${colors.icon}`} />
      </div>
      
      <h3 className="mt-6 text-xl font-semibold text-white">
        {title}
      </h3>
      
      <p className="mt-3 text-zinc-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
