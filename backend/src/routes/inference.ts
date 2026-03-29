import { Router } from 'express'

interface InferenceRequestBody {
  prompt?: string
  context?: Record<string, unknown>
}

export const inferenceRouter = Router()

inferenceRouter.post('/', (req, res) => {
  const body = req.body as InferenceRequestBody

  if (!body?.prompt || typeof body.prompt !== 'string') {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Field "prompt" is required and must be a string.',
    })
  }

  return res.status(200).json({
    message: 'ML model is not integrated yet. This is an integration-ready placeholder endpoint.',
    received: {
      prompt: body.prompt,
      context: body.context ?? {},
    },
    result: {
      summary: 'Connect your model adapter here and return structured output.',
      confidence: null,
      tokensUsed: null,
    },
  })
})
