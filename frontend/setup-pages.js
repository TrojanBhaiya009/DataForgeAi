const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'app');

const directories = [
  'features',
  'datasets', 
  'about',
  '(auth)',
  '(auth)/sign-in',
  '(auth)/sign-in/[[...sign-in]]',
  '(auth)/sign-up',
  '(auth)/sign-up/[[...sign-up]]'
];

directories.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  } else {
    console.log(`- Exists: ${dir}`);
  }
});

// Create sign-in page
const signInPage = `import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] py-12 px-4">
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-zinc-900 border border-zinc-800 shadow-2xl",
          }
        }}
      />
    </div>
  )
}
`;

// Create sign-up page
const signUpPage = `import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] py-12 px-4">
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-zinc-900 border border-zinc-800 shadow-2xl",
          }
        }}
      />
    </div>
  )
}
`;

// Create features page
const featuresPage = `import Link from 'next/link'
import { 
  FileText, Globe, Database, Brain, Shield, BarChart3, 
  Zap, Lock, CheckCircle, ArrowRight, Sparkles,
  Layers, Code, RefreshCw, Settings, Users, Cloud
} from 'lucide-react'

const mainFeatures = [
  {
    icon: FileText,
    title: 'Multi-Format Document Processing',
    description: 'Process PDFs, Word documents, markdown, HTML, JSON, CSV, and plain text files.',
    highlights: ['OCR for scanned documents', 'Table extraction', 'Image analysis']
  },
  {
    icon: Globe,
    title: 'Web Content Ingestion',
    description: 'Crawl and process web content from any URL. Extract clean, structured data.',
    highlights: ['JavaScript rendering', 'Anti-bot bypass', 'Recursive crawling']
  },
  {
    icon: Brain,
    title: 'AI-Powered Extraction',
    description: 'Leverage state-of-the-art ML models for intelligent content extraction.',
    highlights: ['Named entity recognition', 'Sentiment analysis', 'Topic modeling']
  },
  {
    icon: Database,
    title: 'Dataset Generation',
    description: 'Generate high-quality datasets optimized for LLM fine-tuning.',
    highlights: ['JSONL for fine-tuning', 'Parquet for analytics', 'Custom schemas']
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 Type II compliant with end-to-end encryption.',
    highlights: ['AES-256 encryption', 'RBAC', 'Audit logs']
  },
  {
    icon: BarChart3,
    title: 'Quality Validation',
    description: 'Built-in quality scoring and validation pipelines.',
    highlights: ['Confidence scores', 'Deduplication', 'Schema validation']
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <section className="px-4 py-20 sm:px-6 lg:px-8 gradient-bg">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400 mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Powerful Features for Enterprise AI</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Everything You Need to{' '}
              <span className="text-gradient">Transform Data</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              A complete platform for converting unstructured documents into ML-ready datasets.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {mainFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 transition-all duration-300 hover:border-indigo-500/30"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/10 shrink-0">
                    <feature.icon className="h-7 w-7 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-zinc-400 mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.highlights.map((highlight) => (
                        <span key={highlight} className="inline-flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-xs text-zinc-300">
                          <CheckCircle className="h-3 w-3 text-emerald-400" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 px-8 py-16 text-center sm:px-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Ready to Get Started?</h2>
            <Link href="/sign-up" className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-indigo-600">
              Start Free Trial <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
`;

// Create datasets page
const datasetsPage = \`'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Database, Download, Eye, Trash2, Clock, CheckCircle, FileJson, Table, Code, Search } from 'lucide-react'

interface Dataset {
  id: string
  name: string
  format: 'jsonl' | 'parquet' | 'csv'
  records: number
  size: string
  createdAt: string
  status: 'ready' | 'generating'
}

const mockDatasets: Dataset[] = [
  { id: 'ds_001', name: 'Research Papers Q1 2024', format: 'jsonl', records: 15420, size: '124.5 MB', createdAt: '2024-03-15', status: 'ready' },
  { id: 'ds_002', name: 'Technical Documentation', format: 'parquet', records: 8930, size: '67.2 MB', createdAt: '2024-03-14', status: 'ready' },
  { id: 'ds_003', name: 'Legal Contracts Analysis', format: 'jsonl', records: 3240, size: '28.1 MB', createdAt: '2024-03-13', status: 'generating' },
  { id: 'ds_004', name: 'Financial Reports 2023', format: 'csv', records: 12100, size: '89.3 MB', createdAt: '2024-03-12', status: 'ready' },
]

export default function DatasetsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDatasets = mockDatasets.filter(ds => 
    ds.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'jsonl': return <FileJson className="h-5 w-5 text-amber-400" />
      case 'parquet': return <Table className="h-5 w-5 text-blue-400" />
      case 'csv': return <Code className="h-5 w-5 text-green-400" />
      default: return <Database className="h-5 w-5 text-zinc-400" />
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Datasets</h1>
            <p className="mt-2 text-zinc-400">Your generated ML-ready datasets</p>
          </div>
          <Link href="/upload" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white">
            <Database className="h-5 w-5" /> Generate New Dataset
          </Link>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800/50 py-3 pl-10 pr-4 text-white placeholder-zinc-500"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 overflow-hidden">
          <div className="divide-y divide-zinc-800">
            {filteredDatasets.map((dataset) => (
              <div key={dataset.id} className="flex items-center gap-4 p-6 hover:bg-zinc-800/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800">
                  {getFormatIcon(dataset.format)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-medium text-white">{dataset.name}</p>
                    <span className={\\\`rounded-full px-2 py-0.5 text-xs font-medium \\\${
                      dataset.status === 'ready' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }\\\`}>
                      {dataset.status === 'ready' ? <CheckCircle className="h-3 w-3 inline mr-1" /> : <Clock className="h-3 w-3 inline mr-1" />}
                      {dataset.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-500">
                    <span>{dataset.format.toUpperCase()}</span>
                    <span>•</span>
                    <span>{dataset.records.toLocaleString()} records</span>
                    <span>•</span>
                    <span>{dataset.size}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"><Eye className="h-5 w-5" /></button>
                  <button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"><Download className="h-5 w-5" /></button>
                  <button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-red-400"><Trash2 className="h-5 w-5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
\`;

// Write files
const pagesToCreate = [
  { path: path.join(baseDir, '(auth)/sign-in/[[...sign-in]]/page.tsx'), content: signInPage },
  { path: path.join(baseDir, '(auth)/sign-up/[[...sign-up]]/page.tsx'), content: signUpPage },
  { path: path.join(baseDir, 'features/page.tsx'), content: featuresPage },
  { path: path.join(baseDir, 'datasets/page.tsx'), content: datasetsPage },
];

pagesToCreate.forEach(({ path: filePath, content }) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content);
  console.log(\`✓ Created: \${path.relative(baseDir, filePath)}\`);
});

console.log('\\n✅ Setup complete! Now run: npm install');
