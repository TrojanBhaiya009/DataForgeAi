'use client'

import Link from 'next/link'
import { Database, FileText, ExternalLink, Filter, Search, Plus, Download } from 'lucide-react'

interface DatasetItem {
  id: string
  name: string
  source: 'PDF' | 'URL' | 'DOCX'
  records: number
  quality: number
  updatedAt: string
  status: 'ready' | 'processing'
}

const mockDatasets: DatasetItem[] = [
  {
    id: 'ds_001',
    name: 'Clinical Trial Summaries',
    source: 'PDF',
    records: 1284,
    quality: 0.96,
    updatedAt: '2026-03-27T10:45:00Z',
    status: 'ready',
  },
  {
    id: 'ds_002',
    name: 'AI Policy Web Corpus',
    source: 'URL',
    records: 842,
    quality: 0.91,
    updatedAt: '2026-03-28T08:20:00Z',
    status: 'ready',
  },
  {
    id: 'ds_003',
    name: 'Financial Filings Batch',
    source: 'DOCX',
    records: 311,
    quality: 0.88,
    updatedAt: '2026-03-28T14:05:00Z',
    status: 'processing',
  },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function DatasetsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Datasets</h1>
            <p className="mt-2 text-zinc-400">
              Review processed outputs and export training-ready data.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-indigo-500"
            >
              <Plus className="h-4 w-4" />
              New Dataset
            </Link>
            <button className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/50 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-800">
              <Download className="h-4 w-4" />
              Export All
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search datasets"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/60 py-2 pl-9 pr-3 text-sm text-zinc-200 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white sm:w-auto">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/20">
          <div className="hidden grid-cols-12 border-b border-zinc-800 px-6 py-4 text-xs uppercase tracking-wide text-zinc-500 md:grid">
            <div className="col-span-4">Dataset</div>
            <div className="col-span-2">Source</div>
            <div className="col-span-2">Records</div>
            <div className="col-span-2">Quality</div>
            <div className="col-span-2">Actions</div>
          </div>

          <div className="divide-y divide-zinc-800">
            {mockDatasets.map((dataset) => (
              <div key={dataset.id} className="grid grid-cols-1 gap-3 px-4 py-5 md:grid-cols-12 md:items-center md:gap-0 md:px-6">
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-300">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{dataset.name}</p>
                      <p className="text-xs text-zinc-500">{dataset.id}</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <span className="inline-flex rounded-full border border-zinc-700 px-2.5 py-1 text-xs text-zinc-300">
                    {dataset.source}
                  </span>
                </div>

                <div className="text-sm text-zinc-300 md:col-span-2">{dataset.records.toLocaleString()}</div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${dataset.quality >= 0.9 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                    />
                    <span className="text-sm text-zinc-300">{Math.round(dataset.quality * 100)}%</span>
                    <span className="text-xs text-zinc-500">{dataset.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">Updated {formatDate(dataset.updatedAt)}</p>
                </div>

                <div className="md:col-span-2">
                  <Link
                    href={`/results/${dataset.id}`}
                    className="inline-flex items-center gap-1 text-sm text-indigo-300 transition-colors hover:text-indigo-200"
                  >
                    <FileText className="h-4 w-4" />
                    View
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
