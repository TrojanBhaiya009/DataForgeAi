'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  gradient?: 'cyan' | 'emerald' | 'amber' | 'rose' | 'violet' | 'none'
  hover?: boolean
}

const gradientStyles = {
  cyan: 'before:bg-gradient-to-br before:from-cyan-500/10 before:to-transparent hover:border-cyan-500/30',
  emerald: 'before:bg-gradient-to-br before:from-emerald-500/10 before:to-transparent hover:border-emerald-500/30',
  amber: 'before:bg-gradient-to-br before:from-amber-500/10 before:to-transparent hover:border-amber-500/30',
  rose: 'before:bg-gradient-to-br before:from-rose-500/10 before:to-transparent hover:border-rose-500/30',
  violet: 'before:bg-gradient-to-br before:from-violet-500/10 before:to-transparent hover:border-violet-500/30',
  none: '',
}

export default function GlassCard({ 
  children, 
  className = '', 
  gradient = 'none',
  hover = true 
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`
        relative overflow-hidden rounded-2xl 
        border border-white/5 
        bg-zinc-900/40 backdrop-blur-xl
        before:absolute before:inset-0 before:rounded-2xl before:opacity-0
        ${hover ? 'transition-all duration-300 hover:border-white/10 hover:bg-zinc-900/60 before:hover:opacity-100' : ''}
        ${gradientStyles[gradient]}
        ${className}
      `}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
