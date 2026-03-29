'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/docs', label: 'Docs' },
]

const authNavLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/upload', label: 'Upload' },
  { href: '/datasets', label: 'Datasets' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-lg shadow-cyan-500/20 transition-all group-hover:shadow-cyan-500/40">
              <Sparkles className="h-5 w-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity blur-lg -z-10" />
            </div>
            <span className="text-xl font-bold text-zinc-100">
              DataForge<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-zinc-400 rounded-lg transition-all hover:text-zinc-100 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <SignedIn>
              {authNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-zinc-400 rounded-lg transition-all hover:text-zinc-100 hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </SignedIn>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium text-zinc-300 rounded-lg transition-colors hover:text-white hover:bg-white/5">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2 text-sm font-medium text-white transition-all hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2 text-sm font-medium text-white transition-all hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
              >
                Dashboard
              </Link>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 ring-2 ring-white/10 hover:ring-cyan-500/50 transition-all"
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 border-t border-white/5 mt-2 pt-4 overflow-hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-4 py-3 text-base font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <SignedIn>
                  <div className="my-2 border-t border-white/5" />
                  {authNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg px-4 py-3 text-base font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </SignedIn>
                <div className="mt-4 flex flex-col gap-2">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="rounded-lg px-4 py-3 text-base font-medium text-zinc-300 bg-white/5 transition-colors hover:bg-white/10">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-3 text-base font-medium text-white transition-colors hover:from-cyan-400 hover:to-emerald-400">
                        Get Started
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg">
                      <span className="text-sm text-zinc-400">Account</span>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
