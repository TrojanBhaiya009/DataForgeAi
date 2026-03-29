import Link from 'next/link'
import { Book, Code, Terminal, FileJson, Zap, ExternalLink, Copy, Sparkles, ArrowRight } from 'lucide-react'

const sections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Zap,
  },
  {
    id: 'api',
    title: 'API Reference',
    icon: Code,
  },
  {
    id: 'endpoints',
    title: 'Endpoints',
    icon: Terminal,
  },
  {
    id: 'sdks',
    title: 'SDKs',
    icon: FileJson,
  },
]

const endpoints = [
  {
    method: 'POST',
    path: '/api/upload',
    description: 'Upload a file for processing',
    example: `curl -X POST https://api.dataforgeai.com/v1/upload \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.pdf"`,
    response: `{
  "jobId": "job_abc123",
  "status": "processing",
  "message": "File uploaded successfully"
}`,
  },
  {
    method: 'POST',
    path: '/api/process/url',
    description: 'Process content from a URL',
    example: `curl -X POST https://api.dataforgeai.com/v1/process/url \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/paper.pdf"}'`,
    response: `{
  "jobId": "job_def456",
  "status": "processing",
  "message": "URL queued for processing"
}`,
  },
  {
    method: 'GET',
    path: '/api/jobs',
    description: 'List all processing jobs',
    example: `curl https://api.dataforgeai.com/v1/jobs \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    response: `[
  {
    "id": "job_abc123",
    "name": "document.pdf",
    "status": "completed",
    "entities": 156,
    "confidence": 0.94
  }
]`,
  },
  {
    method: 'GET',
    path: '/api/jobs/:id',
    description: 'Get job details and results',
    example: `curl https://api.dataforgeai.com/v1/jobs/job_abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    response: `{
  "id": "job_abc123",
  "status": "completed",
  "result": {
    "entities": [...],
    "structuredData": {...}
  }
}`,
  },
  {
    method: 'POST',
    path: '/api/inference',
    description: 'Run ML inference on text',
    example: `curl -X POST https://api.dataforgeai.com/v1/inference \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Extract entities from...", "context": {}}'`,
    response: `{
  "result": {
    "entities": [...],
    "summary": "..."
  }
}`,
  },
]

const sdks = [
  { name: 'Python', status: 'Available', command: 'pip install dataforgeai', color: 'bg-blue-500/20 text-blue-400' },
  { name: 'Node.js', status: 'Available', command: 'npm install @dataforgeai/sdk', color: 'bg-green-500/20 text-green-400' },
  { name: 'Go', status: 'Coming Soon', command: 'go get github.com/dataforgeai/go-sdk', color: 'bg-zinc-500/20 text-zinc-400' },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <nav className="sticky top-24 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                <p className="mb-4 text-sm font-semibold text-white flex items-center gap-2">
                  <Book className="h-4 w-4 text-indigo-400" />
                  Documentation
                </p>
                <div className="space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white"
                    >
                      <section.icon className="h-4 w-4" />
                      {section.title}
                    </a>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-500"
                  >
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="min-w-0">
              {/* Header */}
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400 mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span>Developer Documentation</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                  API <span className="text-gradient">Documentation</span>
                </h1>
                <p className="text-lg text-zinc-400">
                  Learn how to integrate DataForge AI into your data pipeline. Full REST API with SDKs for Python, Node.js, and Go.
                </p>
              </div>

              {/* Getting Started */}
              <section id="getting-started" className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">
                    <Zap className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Getting Started</h2>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
                  <ol className="space-y-6">
                    <li className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">1</span>
                      <div>
                        <p className="font-semibold text-white text-lg">Create an account and get your API key</p>
                        <p className="mt-2 text-zinc-400">Sign up at dataforgeai.com and navigate to Settings → API Keys to generate your key.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">2</span>
                      <div>
                        <p className="font-semibold text-white text-lg">Install the SDK or use the REST API</p>
                        <p className="mt-2 text-zinc-400">Use our Python or Node.js SDK, or make direct HTTP requests to our REST API.</p>
                        <div className="mt-3 flex gap-3">
                          <code className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-indigo-400">pip install dataforgeai</code>
                          <code className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm text-indigo-400">npm install @dataforgeai/sdk</code>
                        </div>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">3</span>
                      <div>
                        <p className="font-semibold text-white text-lg">Upload documents and process data</p>
                        <p className="mt-2 text-zinc-400">Upload PDFs, DOCX files, or paste URLs. Our AI will extract, structure, and validate the content.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">4</span>
                      <div>
                        <p className="font-semibold text-white text-lg">Export ML-ready datasets</p>
                        <p className="mt-2 text-zinc-400">Download your processed data in JSONL, Parquet, or CSV format for LLM fine-tuning.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </section>

              {/* API Reference */}
              <section id="api" className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                    <Code className="h-6 w-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold">API Reference</h2>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
                  <div className="mb-6">
                    <p className="text-zinc-300 mb-4">Base URL:</p>
                    <code className="rounded-lg bg-zinc-800 px-4 py-2 text-indigo-400 text-lg">https://api.dataforgeai.com/v1</code>
                  </div>
                  <div className="border-t border-zinc-800 pt-6">
                    <p className="text-zinc-300 mb-4">All requests require an Authorization header:</p>
                    <pre className="rounded-xl bg-[#0a0a0f] p-4 text-sm overflow-x-auto">
                      <code className="text-zinc-300">Authorization: Bearer <span className="text-indigo-400">YOUR_API_KEY</span></code>
                    </pre>
                  </div>
                </div>
              </section>

              {/* Endpoints */}
              <section id="endpoints" className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Terminal className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Endpoints</h2>
                </div>
                <div className="space-y-6">
                  {endpoints.map((endpoint) => (
                    <div key={endpoint.path} className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
                      <div className="border-b border-zinc-800 p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`rounded-lg px-3 py-1 text-xs font-bold ${
                            endpoint.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="text-white font-mono">{endpoint.path}</code>
                        </div>
                        <p className="text-zinc-400">{endpoint.description}</p>
                      </div>
                      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                        <div className="p-6">
                          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Request</p>
                          <pre className="rounded-xl bg-[#0a0a0f] p-4 text-sm text-zinc-300 overflow-x-auto">
                            {endpoint.example}
                          </pre>
                        </div>
                        <div className="p-6">
                          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Response</p>
                          <pre className="rounded-xl bg-[#0a0a0f] p-4 text-sm text-zinc-300 overflow-x-auto">
                            {endpoint.response}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SDKs */}
              <section id="sdks" className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                    <FileJson className="h-6 w-6 text-amber-400" />
                  </div>
                  <h2 className="text-2xl font-bold">SDKs & Libraries</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-3">
                  {sdks.map((sdk) => (
                    <div key={sdk.name} className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white text-lg">{sdk.name}</h3>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${sdk.color}`}>
                          {sdk.status}
                        </span>
                      </div>
                      <code className="text-sm text-zinc-400 block">{sdk.command}</code>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to get started?</h3>
                <p className="text-zinc-400 mb-6">Create your account and start processing documents in minutes.</p>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-500 shadow-lg shadow-indigo-600/25"
                >
                  Get Your API Key
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
