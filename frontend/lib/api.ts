const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export interface ApiResponse<T> {
  data?: T
  error?: string
}

export interface Job {
  id: string
  name: string
  type: 'pdf' | 'url' | 'doc'
  status: 'queued' | 'processing' | 'completed' | 'failed'
  createdAt: string
  completedAt?: string
  entities?: number
  confidence?: number
  size?: string
  summary?: string
  error?: string
  filePath?: string
  result?: Record<string, unknown>
}

export interface UploadResponse {
  jobId: string
  message: string
}

export interface InferenceRequest {
  prompt: string
  context?: Record<string, unknown>
}

export interface InferenceResponse {
  message: string
  result: {
    summary: string
    confidence: number | null
    tokensUsed: number | null
    entities?: Array<{
      type: string
      value: string
      confidence: number
    }>
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      return { error: error || `HTTP ${response.status}` }
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export const api = {
  // Health check
  health: () => fetchApi<{ status: string }>('/api/health'),

  // Upload file
  upload: async (file: File): Promise<ApiResponse<UploadResponse>> => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        return { error: `Upload failed: ${response.statusText}` }
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Upload failed' }
    }
  },

  // Process URL
  processUrl: (url: string) =>
    fetchApi<UploadResponse>('/api/process/url', {
      method: 'POST',
      body: JSON.stringify({ url }),
    }),

  // Get all jobs
  getJobs: () => fetchApi<Job[]>('/api/jobs'),

  // Get single job
  getJob: (id: string) => fetchApi<Job>(`/api/jobs/${id}`),

  // Delete job
  deleteJob: (id: string) =>
    fetchApi<{ message: string }>(`/api/jobs/${id}`, {
      method: 'DELETE',
    }),

  // Run inference
  inference: (request: InferenceRequest) =>
    fetchApi<InferenceResponse>('/api/inference', {
      method: 'POST',
      body: JSON.stringify(request),
    }),
}
