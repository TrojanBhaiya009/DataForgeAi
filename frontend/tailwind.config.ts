import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#22d3ee',
          emerald: '#10b981',
          amber: '#f59e0b',
          violet: '#8b5cf6',
          rose: '#f43f5e',
        },
        dark: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#0a0a0f',
          1000: '#050508',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow-multi 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-xy': 'gradient-xy 5s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow-multi': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.2), 0 0 40px rgba(16, 185, 129, 0.1)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(34, 211, 238, 0.3), 0 0 80px rgba(16, 185, 129, 0.2)' 
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-xy': {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': `
          radial-gradient(at 20% 20%, rgba(34, 211, 238, 0.08) 0px, transparent 50%),
          radial-gradient(at 80% 80%, rgba(16, 185, 129, 0.08) 0px, transparent 50%),
          radial-gradient(at 40% 60%, rgba(139, 92, 246, 0.05) 0px, transparent 50%)
        `,
      },
    },
  },
  plugins: [],
}

export default config
