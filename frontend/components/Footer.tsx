'use client'

import Link from 'next/link'
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'

const footerLinks = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/docs' },
    { label: 'Changelog', href: '/changelog' },
  ],
  solutions: [
    { label: 'Research Labs', href: '/solutions/research' },
    { label: 'Legal & Compliance', href: '/solutions/legal' },
    { label: 'Healthcare AI', href: '/solutions/healthcare' },
    { label: 'Financial Services', href: '/solutions/finance' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security', href: '/security' },
    { label: 'GDPR', href: '/gdpr' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050508]">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-lg shadow-cyan-500/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-zinc-100">
                DataForge<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">AI</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
              Transform unstructured data into high-quality, ML-ready datasets for fine-tuning domain-specific LLMs.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Github, href: 'https://github.com' },
                { icon: Twitter, href: 'https://twitter.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
              ].map(({ icon: Icon, href }) => (
                <a 
                  key={href}
                  href={href} 
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-zinc-500 hover:bg-white/10 hover:text-cyan-400 transition-all"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Product</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-cyan-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Solutions</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-violet-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-lg font-semibold text-zinc-100">Stay updated</h3>
              <p className="mt-1 text-sm text-zinc-500">Get the latest updates on features and releases.</p>
            </div>
            <div className="flex w-full max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
              />
              <button className="rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} DataForge AI. All rights reserved.
          </p>
          <p className="text-sm text-zinc-700 flex items-center gap-2">
            Built for the future of AI 
            <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  )
}
