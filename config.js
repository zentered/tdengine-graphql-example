'use strict'

// import invariant from 'tiny-invariant'

// invariant(process.env.TDENGINE_CLOUD_URL, 'TDENGINE_CLOUD_URL must be set')

export const port = process.env.PORT || 3000
export const tdEngineToken = process.env.TDENGINE_CLOUD_TOKEN
export const tdEngineUrl = process.env.TDENGINE_CLOUD_URL
export const sinayApiKey = process.env.SINAY_API_KEY

// feature flags
export const enableGraphiQL = true
