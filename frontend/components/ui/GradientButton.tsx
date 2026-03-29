'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface GradientButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  className?: string
  disabled?: boolean
}

const variants = {
  primary: `
    bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500
    text-white font-semibold
    shadow-lg shadow-cyan-500/25
    hover:shadow-cyan-500/40 hover:scale-[1.02]
  `,
  secondary: `
    bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600
    text-white font-semibold
    shadow-lg shadow-violet-500/25
    hover:shadow-violet-500/40 hover:scale-[1.02]
  `,
  outline: `
    border border-white/10 bg-transparent
    text-zinc-300 font-medium
    hover:bg-white/5 hover:border-white/20 hover:text-white
  `,
  ghost: `
    bg-transparent text-zinc-400
    hover:bg-white/5 hover:text-white
  `,
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
}

export default function GradientButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
}: GradientButtonProps) {
  const buttonClasses = `
    inline-flex items-center justify-center gap-2
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="h-5 w-5" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="h-5 w-5" />}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={buttonClasses}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={buttonClasses}
    >
      {content}
    </motion.button>
  )
}
