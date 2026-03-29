'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Upload, FileText, Link as LinkIcon, X, Loader2, CheckCircle, AlertCircle,
  ArrowRight, Database, Sparkles, FileUp, Globe, File
} from 'lucide-react'
import ShapeGrid from '@/components/ui/ShapeGrid'
import GlassCard from '@/components/ui/GlassCard'
import { api } from '@/lib/api'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
  jobId?: string
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [urlInput, setUrlInput] = useState('')
  const [isSubmittingUrl, setIsSubmittingUrl] = useState(false)
  const [activeTab, setActiveTab] = useState<'files' | 'url'>('files')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const pollingTimersRef = useRef<Record<string, number>>({})

  const stopPolling = useCallback((jobId: string) => {
    const timer = pollingTimersRef.current[jobId]
    if (timer) {
      window.clearInterval(timer)
      delete pollingTimersRef.current[jobId]
    }
  }, [])

  const mapJobStatusToUi = (status: 'queued' | 'processing' | 'completed' | 'failed'): UploadedFile['status'] => {
    if (status === 'completed') return 'completed'
    if (status === 'failed') return 'error'
    return 'processing'
  }

  const startJobPolling = useCallback(
    (fileId: string, jobId: string) => {
      const pollOnce = async () => {
        const { data, error } = await api.getJob(jobId)

        if (error || !data) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? { ...f, status: 'error', progress: 100 }
                : f
            ),
          )
          stopPolling(jobId)
          return
        }

        const nextStatus = mapJobStatusToUi(data.status)
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, status: nextStatus, progress: 100, jobId }
              : f
          ),
        )

        if (data.status === 'completed' || data.status === 'failed') {
          stopPolling(jobId)
        }
      }

      void pollOnce()
      stopPolling(jobId)
      pollingTimersRef.current[jobId] = window.setInterval(() => {
        void pollOnce()
      }, 2000)
    },
    [stopPolling],
  )

  useEffect(() => {
    return () => {
      Object.values(pollingTimersRef.current).forEach((timer) => {
        window.clearInterval(timer)
      })
      pollingTimersRef.current = {}
    }
  }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setSubmitError(null)

    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 20,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    acceptedFiles.forEach(async (file, index) => {
      const item = newFiles[index]
      if (!item) return

      const { data, error } = await api.upload(file)

      if (error || !data) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? { ...f, status: 'error', progress: 100 }
              : f
          ),
        )
        setSubmitError(error || 'Upload failed')
        return
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === item.id
            ? { ...f, status: 'processing', progress: 100, jobId: data.jobId }
            : f
        ),
      )

      startJobPolling(item.id, data.jobId)
    })
  }, [startJobPolling])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
      'text/csv': ['.csv'],
      'application/json': ['.json'],
    },
  })

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!urlInput.trim()) return

    setIsSubmittingUrl(true)
    setSubmitError(null)
    const url = urlInput.trim()
    
    const newFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: url,
      size: 0,
      type: 'url',
      status: 'uploading',
      progress: 25,
    }

    setFiles((prev) => [...prev, newFile])
    setUrlInput('')

    const { data, error } = await api.processUrl(url)

    if (error || !data) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === newFile.id
            ? { ...f, status: 'error', progress: 100 }
            : f,
        ),
      )
      setSubmitError(error || 'URL processing failed')
      setIsSubmittingUrl(false)
      return
    }

    setFiles((prev) =>
      prev.map((f) =>
        f.id === newFile.id
          ? { ...f, status: 'processing', progress: 100, jobId: data.jobId }
          : f,
      ),
    )
    setIsSubmittingUrl(false)
    startJobPolling(newFile.id, data.jobId)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return 'URL'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-emerald-400" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-rose-400" />
    }
  }

  const getFileIcon = (type: string) => {
    if (type === 'url') return <Globe className="h-5 w-5 text-cyan-400" />
    if (type.includes('pdf')) return <FileText className="h-5 w-5 text-rose-400" />
    return <File className="h-5 w-5 text-zinc-400" />
  }

  const completedFiles = files.filter(f => f.status === 'completed')
  const processingFiles = files.filter(f => f.status === 'uploading' || f.status === 'processing')

  return (
    <div className="relative min-h-screen bg-[#050508] px-4 py-12 sm:px-6 lg:px-8">
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

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-sm text-cyan-400 mb-6">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Data Processing</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Upload Your <span className="text-gradient">Documents</span>
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Drop your PDFs, documents, or paste URLs. Our AI will extract, structure, and validate the content automatically.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex rounded-xl border border-white/5 bg-white/[0.02] p-1 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('files')}
              className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'files'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileUp className="h-4 w-4" />
              Upload Files
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'url'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Globe className="h-4 w-4" />
              Process URL
            </button>
          </div>
        </motion.div>

        {/* Upload Zone */}
        {activeTab === 'files' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div
              {...getRootProps()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-16 text-center transition-all ${
                isDragActive
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
              }`}
            >
              <input {...getInputProps()} />
              <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10`}>
                <Upload className={`h-10 w-10 text-cyan-400 transition-transform ${isDragActive ? 'scale-110' : ''}`} />
              </div>
              <p className="text-xl font-semibold text-white mb-2">
                {isDragActive ? 'Drop files here...' : 'Drag & drop files here'}
              </p>
              <p className="text-zinc-500 mb-4">
                or click to browse your computer
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['PDF', 'DOC', 'DOCX', 'TXT', 'MD', 'CSV', 'JSON'].map((format) => (
                  <span
                    key={format}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-500"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* URL Input */}
        {activeTab === 'url' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <GlassCard className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/10">
                  <Globe className="h-7 w-7 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Process Web Content</h3>
                  <p className="text-sm text-zinc-500">Enter a URL to extract and structure content</p>
                </div>
              </div>
              <form onSubmit={handleUrlSubmit} className="flex gap-4">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-600" />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/research-paper or https://arxiv.org/abs/..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingUrl || !urlInput.trim()}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-4 font-medium text-white transition-all hover:from-cyan-400 hover:to-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 shadow-lg shadow-cyan-500/20"
                >
                  {isSubmittingUrl ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Process'
                  )}
                </button>
              </form>
            </GlassCard>
          </motion.div>
        )}

        {/* File List */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
          >
            {submitError}
          </motion.div>
        )}

        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="overflow-hidden">
              <div className="border-b border-white/5 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    Uploaded Files ({files.length})
                  </h2>
                  {processingFiles.length > 0 && (
                    <span className="text-sm text-cyan-400">
                      {processingFiles.length} processing...
                    </span>
                  )}
                </div>
              </div>
              <div className="divide-y divide-white/5">
                {files.map((file, index) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium text-white">{file.name}</p>
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <span>{formatFileSize(file.size)}</span>
                        {file.status === 'completed' && file.jobId && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-400">Job: {file.jobId}</span>
                          </>
                        )}
                        {file.status === 'processing' && (
                          <>
                            <span>•</span>
                            <span className="text-cyan-400">Processing with AI...</span>
                          </>
                        )}
                      </div>
                      {(file.status === 'uploading' || file.status === 'processing') && (
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(file.status)}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-rose-400 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {completedFiles.length > 0 && (
                <div className="border-t border-white/5 p-6 bg-white/[0.01]">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{completedFiles.length} file(s) processed</p>
                        <p className="text-sm text-zinc-500">Ready for dataset generation</p>
                      </div>
                    </div>
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 font-medium text-white transition-all hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20"
                    >
                      View in Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}

        {/* Info Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Sparkles, title: 'AI Extraction', desc: 'Advanced ML models extract entities, relationships, and structured data.', color: 'cyan' },
            { icon: CheckCircle, title: 'Quality Validation', desc: 'Automatic quality scoring and deduplication for clean datasets.', color: 'emerald' },
            { icon: Database, title: 'Export Ready', desc: 'Download in JSONL, Parquet, or custom formats for LLM fine-tuning.', color: 'violet' },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${card.color}-500/10 mb-4`}>
                  <card.icon className={`h-6 w-6 text-${card.color}-400`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-zinc-500">{card.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
