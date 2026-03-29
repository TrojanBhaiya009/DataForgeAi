import Link from 'next/link'
import { Brain, Database, FileText, Globe, Shield, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'

const featureCards = [
  {
    icon: FileText,
    title: 'Document Intelligence',
    description:
      'Parse PDFs, DOCX, and mixed layouts into clean structured records with resilient extraction logic.',
  },
  {
    icon: Globe,
    title: 'Web Content Ingestion',
    description:
      'Capture and normalize web pages, reports, and references into a consistent schema for downstream ML.',
  },
  {
    icon: Brain,
    title: 'ML-Assisted Structuring',
    description:
      'Apply model-driven entity extraction, cleanup, and semantic labeling to improve data readiness.',
  },
  {
    icon: Database,
    title: 'Training-Ready Exports',
    description:
      'Export validated datasets as JSONL and related formats suitable for tuning and analytics workflows.',
  },
  {
    icon: Shield,
    title: 'Secure By Design',
    description:
      'Enforce authenticated access and controlled processing paths for enterprise-grade reliability.',
  },
  {
    icon: Zap,
    title: 'Pipeline Automation',
    description:
      'Run repeatable processing jobs with status tracking so teams can move from raw input to output quickly.',
  },
]

const highlights = [
  'Batch upload and URL ingestion',
  'Job status tracking with result history',
  'Configurable extraction and validation steps',
  'Output suited for LLM fine-tuning datasets',
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            <CheckCircle2 className="h-4 w-4" />
            Platform Capabilities
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Features Built for Structured AI Data Pipelines
          </h1>
          <p className="mt-5 text-lg text-zinc-400">
            Everything needed to convert unstructured documents and web sources into high-quality, machine-learning-ready datasets.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all hover:border-indigo-500/40 hover:bg-zinc-900/70">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
                <feature.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">{feature.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 sm:p-10">
          <h3 className="text-2xl font-semibold text-white">What teams use most</h3>
          <ul className="mt-5 grid gap-3 text-zinc-300 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-indigo-500"
            >
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800/60 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-800"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
