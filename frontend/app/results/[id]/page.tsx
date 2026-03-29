'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, Copy, CheckCircle, FileText, Tag, Brain, BarChart3, Loader2, AlertCircle } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { api, type Job } from '@/lib/api'

interface Entity {
  type: string
  value: string
  confidence: number
}

interface ResultMetadata {
  pageCount: number
  wordCount: number
  processingTime: string
}

function extractJobId(idValue: string | string[] | undefined): string {
  if (Array.isArray(idValue)) return idValue[0] ?? ''
  return idValue ?? ''
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  return null
}

function formatDuration(createdAt?: string, completedAt?: string): string {
  if (!createdAt) return '-'
  if (!completedAt) return 'In progress'

  const start = new Date(createdAt).getTime()
  const end = new Date(completedAt).getTime()

  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return '-'

  const seconds = Math.max(1, Math.floor((end - start) / 1000))
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60

  if (minutes === 0) return `${remainder}s`
  return `${minutes}m ${remainder}s`
}

function extractMetadata(job: Job): ResultMetadata {
  const result = (job.result ?? {}) as Record<string, unknown>
  const structuredData = ((result.structuredData as Record<string, unknown>) ?? {})
  const metadata = ((structuredData.metadata as Record<string, unknown>) ?? {})

  const pageCount = toNumber(metadata.pageCount) ?? 1
  const wordCount =
    toNumber(result.tokensUsed) ??
    toNumber(structuredData.wordCount) ??
    0

  return {
    pageCount,
    wordCount,
    processingTime: formatDuration(job.createdAt, job.completedAt),
  }
}

export default function ResultsPage() {
  const params = useParams<{ id: string | string[] }>()
  const jobId = extractJobId(params?.id)
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'summary' | 'entities' | 'structured' | 'raw'>('summary')

  const fetchJob = useCallback(async (silent = false) => {
    if (!jobId) {
      setLoadError('Missing job ID in URL')
      setIsLoading(false)
      return
    }

    if (!silent) setIsLoading(true)
    const { data, error } = await api.getJob(jobId)

    if (error || !data) {
      setLoadError(error || 'Unable to load result')
      if (!silent) setIsLoading(false)
      return
    }

    setJob(data)
    setLoadError(null)
    if (!silent) setIsLoading(false)
  }, [jobId])

  useEffect(() => {
    void fetchJob()

    const timer = window.setInterval(() => {
      void fetchJob(true)
    }, 3000)

    return () => {
      window.clearInterval(timer)
    }
  }, [fetchJob])

  const result = useMemo(() => {
    return ((job?.result as Record<string, unknown>) ?? {})
  }, [job])

  const summary = useMemo(() => {
    if (typeof result.summary === 'string' && result.summary.trim()) return result.summary
    if (typeof job?.summary === 'string' && job.summary.trim()) return job.summary
    return 'No summary available yet.'
  }, [job?.summary, result.summary])

  const entities = useMemo<Entity[]>(() => {
    const raw = result.entities
    if (!Array.isArray(raw)) return []

    return raw
      .map((item) => {
        if (!item || typeof item !== 'object') return null
        const row = item as Record<string, unknown>
        const type = typeof row.type === 'string' ? row.type : 'ENTITY'
        const value = typeof row.value === 'string' ? row.value : ''
        const confidence = typeof row.confidence === 'number' ? row.confidence : 0
        if (!value) return null
        return { type, value, confidence }
      })
      .filter((entry): entry is Entity => entry !== null)
  }, [result.entities])

  const structuredData = useMemo<Record<string, unknown>>(() => {
    const data = result.structuredData
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return data as Record<string, unknown>
    }
    return {}
  }, [result.structuredData])

  const metadata = useMemo(() => {
    if (!job) {
      return {
        pageCount: 0,
        wordCount: 0,
        processingTime: '-',
      }
    }
    return extractMetadata(job)
  }, [job])

  const rawPayload = useMemo(() => {
    return {
      job,
      result,
    }
  }, [job, result])

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(rawPayload, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getEntityTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      CONCEPT: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      TECHNIQUE: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      METRIC: 'bg-green-500/10 text-green-400 border-green-500/20',
      DATASET: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      MODEL: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      ORGANIZATION: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    }
    return colors[type] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  }

  const renderStructuredValue = (value: unknown) => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <p className="mt-1 text-gray-500">No values</p>
      }
      return (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((item, index) => (
            <span key={`${index}-${String(item)}`} className="rounded-full bg-gray-800 px-3 py-1 text-sm text-white">
              {typeof item === 'string' ? item : JSON.stringify(item)}
            </span>
          ))}
        </div>
      )
    }

    if (value && typeof value === 'object') {
      return (
        <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-3 text-xs text-gray-300">
          {JSON.stringify(value, null, 2)}
        </pre>
      )
    }

    return <p className="mt-1 text-white">{String(value ?? '-')}</p>
  }

  if (isLoading) {
    return (
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center text-gray-300">
          <Loader2 className="mx-auto mb-3 h-6 w-6 animate-spin" />
          Loading result...
        </div>
      </div>
    )
  }

  if (loadError || !job) {
    return (
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-xl border border-rose-500/20 bg-rose-500/10 p-8">
          <div className="mb-3 flex items-center gap-2 text-rose-300">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">Failed to load result</span>
          </div>
          <p className="text-sm text-rose-200">{loadError ?? 'Unknown error'}</p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{job.name}</h1>
            <p className="mt-1 text-gray-400">
              Job ID: {job.id} • Processed {new Date(job.completedAt ?? job.createdAt).toLocaleString()}
            </p>
            {job.status !== 'completed' && (
              <p className="mt-2 text-sm text-amber-300">
                Current status: {job.status}
                {job.error ? ` - ${job.error}` : ''}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopyJson}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              {copied ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy JSON'}
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-500">
              <Download className="h-4 w-4" />
              Export Dataset
            </button>
          </div>
        </div>

        {/* Metadata Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10">
                <FileText className="h-5 w-5 text-brand-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metadata.pageCount}</p>
                <p className="text-sm text-gray-400">Pages</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Tag className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{typeof job.entities === 'number' ? job.entities : entities.length}</p>
                <p className="text-sm text-gray-400">Entities Extracted</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Brain className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metadata.wordCount.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Words Processed</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                <BarChart3 className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{metadata.processingTime}</p>
                <p className="text-sm text-gray-400">Processing Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-gray-800">
          <div className="flex gap-8">
            {(['summary', 'entities', 'structured', 'raw'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 pb-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-brand-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'summary' && (
            <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
              <h2 className="text-lg font-semibold text-white">Document Summary</h2>
              <p className="mt-4 text-gray-300 leading-relaxed">{summary}</p>
            </div>
          )}

          {activeTab === 'entities' && (
            <div className="space-y-4">
              {entities.length === 0 && (
                <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 text-sm text-gray-400">
                  No entities available for this job yet.
                </div>
              )}
              {entities.map((entity, index) => (
                <div
                  key={`${entity.value}-${index}`}
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getEntityTypeColor(entity.type)}`}>
                          {entity.type}
                        </span>
                        <span className="font-semibold text-white">{entity.value}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${entity.confidence >= 0.9 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {(entity.confidence * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-500">confidence</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'structured' && (
            <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Structured Data</h2>
              {Object.keys(structuredData).length === 0 ? (
                <p className="text-sm text-gray-400">No structured data returned for this job.</p>
              ) : (
                <div className="space-y-4">
                  {Object.entries(structuredData).map(([key, value]) => (
                    <div key={key}>
                      <h3 className="text-sm font-medium text-gray-400">{key}</h3>
                      {renderStructuredValue(value)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'raw' && (
            <div className="rounded-xl border border-gray-800 bg-gray-900/50">
              <pre className="overflow-x-auto p-6 text-sm text-gray-300">
                {JSON.stringify(rawPayload, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
