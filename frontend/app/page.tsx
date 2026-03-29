'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, Globe, Database, Shield, BarChart3, Upload, Sparkles, Brain, Lock, Clock, ChevronRight, Layers, Zap, Code2 } from 'lucide-react'
import ShapeGrid from '@/components/ui/ShapeGrid'
import FeatureCard from '@/components/ui/FeatureCard'
import StatCard from '@/components/ui/StatCard'
import GlassCard from '@/components/ui/GlassCard'

const features = [
  {
    icon: FileText,
    title: 'PDF & Document Processing',
    description: 'Extract structured data from research papers, reports, and documentation with high accuracy using advanced OCR and NLP.',
    gradient: 'cyan' as const,
  },
  {
    icon: Globe,
    title: 'URL & Web Scraping',
    description: 'Crawl and process web content, converting unstructured HTML into clean, structured datasets automatically.',
    gradient: 'emerald' as const,
  },
  {
    icon: Database,
    title: 'Multi-format Support',
    description: 'Handle PDFs, Word docs, markdown, HTML, JSON, CSV, and plain text in a unified processing pipeline.',
    gradient: 'amber' as const,
  },
  {
    icon: Brain,
    title: 'AI-Powered Extraction',
    description: 'Leverage state-of-the-art ML models for intelligent content extraction, summarization, and structuring.',
    gradient: 'violet' as const,
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant infrastructure with end-to-end encryption, role-based access, and audit logging.',
    gradient: 'rose' as const,
  },
  {
    icon: BarChart3,
    title: 'Quality Validation',
    description: 'Built-in quality scoring, deduplication, and validation to ensure your datasets meet fine-tuning standards.',
    gradient: 'teal' as const,
  },
]

const steps = [
  {
    step: '01',
    title: 'Upload Your Data',
    description: 'Drag and drop PDFs, paste URLs, or connect to your cloud storage. We support batch uploads and API integration.',
    icon: Upload,
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    step: '02',
    title: 'AI Processing',
    description: 'Our ML pipeline extracts, structures, cleans, and validates the content automatically with quality scoring.',
    icon: Brain,
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    step: '03',
    title: 'Export Datasets',
    description: 'Download clean, structured datasets in JSONL, Parquet, or custom formats ready for LLM fine-tuning.',
    icon: Database,
    gradient: 'from-amber-500 to-orange-500',
  },
]

const stats = [
  { value: '10M+', label: 'Documents Processed', gradient: 'cyan' as const },
  { value: '99.9%', label: 'Uptime SLA', gradient: 'emerald' as const },
  { value: '50+', label: 'Enterprise Clients', gradient: 'amber' as const },
  { value: '5x', label: 'Faster Than Manual', gradient: 'violet' as const },
]

const useCases = [
  {
    title: 'Research Labs',
    description: 'Process thousands of academic papers into structured training data for domain-specific models.',
    icon: '🔬',
    color: 'cyan',
  },
  {
    title: 'Legal & Compliance',
    description: 'Convert legal documents, contracts, and regulations into queryable datasets.',
    icon: '⚖️',
    color: 'emerald',
  },
  {
    title: 'Healthcare AI',
    description: 'Transform medical literature and clinical notes into HIPAA-compliant training datasets.',
    icon: '🏥',
    color: 'rose',
  },
  {
    title: 'Financial Services',
    description: 'Process financial reports, SEC filings, and market research for trading models.',
    icon: '📊',
    color: 'amber',
  },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with ShapeGrid */}
      <section className="relative min-h-[90vh] flex items-center px-4 pt-20 pb-32 sm:px-6 lg:px-8">
        {/* ShapeGrid Background */}
        <div className="absolute inset-0 -z-10">
          <ShapeGrid 
            speed={0.3}
            squareSize={50}
            direction="diagonal"
            borderColor="#1a1a2e"
            hoverFillColor="#222"
            shape="square"
            hoverTrailAmount={3}
          />
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-violet-500/3 blur-[150px]" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-2.5 text-sm text-cyan-400 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>Automated Dataset Preparation for Enterprise AI</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Transform Unstructured Data into{' '}
              <span className="text-gradient">
                ML-Ready Datasets
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto"
            >
              DataForge AI automates the conversion of scattered PDFs, reports, URLs, and documentation 
              into structured, high-quality datasets for fine-tuning domain-specific large language models.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:scale-105"
              >
                <Upload className="h-5 w-5" />
                Start Processing
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
              >
                Explore Features
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-zinc-500 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <Shield className="h-5 w-5 text-emerald-500" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
                <Lock className="h-5 w-5 text-cyan-500" />
                <span>End-to-End Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <Clock className="h-5 w-5 text-amber-500" />
                <span>99.9% Uptime SLA</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative border-y border-white/5 bg-zinc-900/20 px-4 py-16 sm:px-6 lg:px-8 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-4 py-28 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 mesh-gradient opacity-50" />
        
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Everything You Need for{' '}
              <span className="text-gradient">Data Preparation</span>
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              A complete enterprise-grade pipeline for converting raw documents into structured, validated datasets.
            </p>
          </motion.div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative px-4 py-28 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
          <div className="absolute top-1/2 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[100px]" />
        </div>
        
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              Three simple steps to transform your unstructured data into ML-ready datasets.
            </p>
          </motion.div>

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {steps.map((item, index) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="absolute top-16 left-full hidden w-full md:flex items-center justify-center" style={{ width: 'calc(100% - 4rem)' }}>
                    <ChevronRight className="h-8 w-8 text-zinc-700" />
                  </div>
                )}
                <GlassCard className="p-8 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient}`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-5xl font-bold text-white/10">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-zinc-400 leading-relaxed">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="relative px-4 py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Built for <span className="text-gradient">Enterprise</span>
            </h2>
            <p className="mt-6 text-lg text-zinc-400">
              Trusted by AI teams across industries to prepare high-quality training data.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                  rounded-2xl border border-white/5 bg-zinc-900/30 p-6 
                  transition-all duration-300 hover:bg-zinc-900/50
                  hover:border-${useCase.color}-500/20
                `}
              >
                <span className="text-4xl">{useCase.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-white">{useCase.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/90 via-emerald-600/90 to-teal-600/90" />
            
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
                backgroundSize: '32px 32px' 
              }} />
            </div>
            
            <div className="relative z-10 px-8 py-20 text-center sm:px-16">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Ready to Transform Your Data Pipeline?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-xl text-white/80">
                Start processing your documents today. Get started with our free tier — no credit card required.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/sign-up"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-emerald-600 shadow-xl transition-all hover:bg-zinc-100 hover:scale-105"
                >
                  <Sparkles className="h-5 w-5" />
                  Get Started Free
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
