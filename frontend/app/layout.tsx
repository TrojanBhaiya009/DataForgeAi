import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'DataForge AI - Transform Unstructured Data into ML-Ready Datasets',
  description: 'Convert scattered PDFs, reports, URLs, and documentation into structured, high-quality datasets for fine-tuning domain-specific LLMs. Enterprise-grade security and scalability.',
  keywords: ['AI', 'ML', 'Dataset', 'LLM', 'Fine-tuning', 'Data Pipeline', 'Enterprise'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#22d3ee',
          colorBackground: '#0a0a0f',
          colorText: '#f4f4f5',
          colorInputBackground: '#18181b',
          colorInputText: '#f4f4f5',
        },
        elements: {
          formButtonPrimary: 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400',
          card: 'bg-zinc-900/80 backdrop-blur-xl border border-white/5',
          headerTitle: 'text-zinc-100',
          headerSubtitle: 'text-zinc-400',
          socialButtonsBlockButton: 'bg-zinc-800/50 border-white/5 text-zinc-100 hover:bg-zinc-800',
          formFieldLabel: 'text-zinc-300',
          formFieldInput: 'bg-zinc-900/50 border-white/10 text-zinc-100',
          footerActionLink: 'text-cyan-400 hover:text-cyan-300',
        }
      }}
    >
      <html lang="en">
        <body className="min-h-screen bg-[#050508] text-zinc-100 flex flex-col antialiased">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
