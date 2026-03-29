'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { 
  FileText, Clock, CheckCircle, AlertCircle, Loader2, 
  Eye, Trash2, Download, Upload, Database, TrendingUp,
  Search, RefreshCw
} from 'lucide-react'
import ShapeGrid from '@/components/ui/ShapeGrid'
import GlassCard from '@/components/ui/GlassCard'
import { api, type Job } from '@/lib/api'

const statCards = [
  { icon: Database, label: 'Total Jobs', color: 'cyan' },
  { icon: CheckCircle, label: 'Completed', color: 'emerald' },
  { icon: Loader2, label: 'Processing', color: 'amber' },
  { icon: TrendingUp, label: 'Entities Extracted', color: 'violet' },
]

export default function DashboardPage() {
  const { user } = useUser()
  const [jobs, setJobs] = useState<Job[]>([])
  const [filter, setFilter] = useState<'all' | 'completed' | 'processing' | 'failed'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadJobs = useCallback(async (silent = false) => {
    if (!silent) setIsRefreshing(true)

    const { data, error } = await api.getJobs()

    if (error || !data) {
      setErrorMessage(error || 'Failed to load jobs')
      if (!silent) setIsRefreshing(false)
      setIsLoading(false)
      return
    }

    const sorted = [...data].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    setJobs(sorted)
    setErrorMessage(null)
    if (!silent) setIsRefreshing(false)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    void loadJobs()
    const timer = window.setInterval(() => {
      void loadJobs(true)
    }, 3000)

    return () => {
      window.clearInterval(timer)
    }
  }, [loadJobs])

  const filteredJobs = jobs.filter((job) => {
    const matchesFilter = filter === 'all' 
      || (filter === 'processing' && (job.status === 'processing' || job.status === 'queued'))
      || job.status === filter
    const matchesSearch = job.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleRefresh = () => {
    void loadJobs()
  }

  const handleDelete = async (jobId: string) => {
    const { error } = await api.deleteJob(jobId)
    if (error) {
      setErrorMessage(error)
      return
    }
    setJobs((prev) => prev.filter((job) => job.id !== jobId))
  }

  const getStatusBadge = (status: Job['status']) => {
    const styles = {
      queued: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
      processing: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      failed: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    }

    const icons = {
      queued: <Clock className="h-3.5 w-3.5" />,
      processing: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
      completed: <CheckCircle className="h-3.5 w-3.5" />,
      failed: <AlertCircle className="h-3.5 w-3.5" />,
    }

    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const stats = {
    total: jobs.length,
    completed: jobs.filter((j) => j.status === 'completed').length,
    processing: jobs.filter((j) => j.status === 'processing' || j.status === 'queued').length,
    failed: jobs.filter((j) => j.status === 'failed').length,
    totalEntities: jobs.reduce((acc, j) => acc + (j.entities || 0), 0),
  }

  const statValues = [stats.total, stats.completed, stats.processing, stats.totalEntities]
  const statColors = ['text-cyan-400', 'text-emerald-400', 'text-amber-400', 'text-violet-400']
  const iconBgs = ['bg-cyan-500/10', 'bg-emerald-500/10', 'bg-amber-500/10', 'bg-violet-500/10']
  const iconColors = ['text-cyan-400', 'text-emerald-400', 'text-amber-400', 'text-violet-400']

  return (
    <div className="relative min-h-screen bg-[#050508]">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <ShapeGrid 
          speed={0.2}
          squareSize={60}
          direction="diagonal"
          borderColor="#111118"
          hoverFillColor="#1a1a2e"
          shape="square"
          hoverTrailAmount={2}
        />
      </div>

      <div className="relative z-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Welcome Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back{user?.firstName ? `, ${user.firstName}` : ''}! 
              <span className="ml-2">👋</span>
            </h1>
            <p className="mt-2 text-zinc-500">
              Here's an overview of your data processing pipeline.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {statCards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBgs[index]}`}>
                      <card.icon className={`h-6 w-6 ${iconColors[index]}`} />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">{card.label}</p>
                      <p className={`text-2xl font-bold ${statColors[index]}`}>{statValues[index]}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <Link
              href="/upload"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 text-sm font-medium text-white transition-all hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              <Upload className="h-5 w-5" />
              Upload New Documents
            </Link>
            <Link
              href="/datasets"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 backdrop-blur-sm"
            >
              <Database className="h-5 w-5" />
              View Datasets
            </Link>
          </motion.div>

          {/* Jobs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="overflow-hidden">
              {/* Header */}
              <div className="border-b border-white/5 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl font-semibold text-white">Processing Jobs</h2>
                  <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-64 rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-sm text-white placeholder-zinc-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                      />
                    </div>
                    {/* Refresh */}
                    <button
                      onClick={handleRefresh}
                      className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {(['all', 'completed', 'processing', 'failed'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all whitespace-nowrap ${
                        filter === f
                          ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/20'
                          : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                      {f !== 'all' && (
                        <span className="ml-2 text-xs opacity-70">
                          ({f === 'processing' ? stats.processing : f === 'completed' ? stats.completed : stats.failed})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Jobs List */}
              <div className="divide-y divide-white/5">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 sm:p-6 transition-colors hover:bg-white/[0.02]"
                  >
                    {/* Icon */}
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                      <FileText className="h-6 w-6 text-zinc-500" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="truncate font-medium text-white">{job.name}</p>
                        {getStatusBadge(job.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600">
                        <span>{job.id}</span>
                        <span>•</span>
                        <span>{formatDate(job.createdAt)}</span>
                        {job.size && (
                          <>
                            <span>•</span>
                            <span>{job.size}</span>
                          </>
                        )}
                        {typeof job.entities === 'number' && (
                          <>
                            <span>•</span>
                            <span className="text-violet-400">{job.entities} entities</span>
                          </>
                        )}
                        {typeof job.confidence === 'number' && (
                          <>
                            <span>•</span>
                            <span className={job.confidence >= 0.9 ? 'text-emerald-400' : 'text-amber-400'}>
                              {(job.confidence * 100).toFixed(0)}% confidence
                            </span>
                          </>
                        )}
                      </div>
                      {job.status === 'failed' && job.error && (
                        <p className="mt-2 text-xs text-rose-300">{job.error}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {job.status === 'completed' && (
                        <>
                          <Link
                            href={`/results/${job.id}`}
                            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-cyan-400"
                            title="View Results"
                          >
                            <Eye className="h-5 w-5" />
                          </Link>
                          <button
                            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-emerald-400"
                            title="Download Dataset"
                          >
                            <Download className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => {
                          void handleDelete(job.id)
                        }}
                        className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {isLoading && (
                <div className="px-6 py-16 text-center text-zinc-500">Loading jobs...</div>
              )}

              {!isLoading && errorMessage && (
                <div className="px-6 py-6 text-center text-rose-300">
                  {errorMessage}
                </div>
              )}

              {!isLoading && !errorMessage && filteredJobs.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                    <FileText className="h-8 w-8 text-zinc-600" />
                  </div>
                  <p className="text-zinc-500 mb-4">No jobs found for this filter.</p>
                  <Link
                    href="/upload"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    Upload your first document
                  </Link>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
