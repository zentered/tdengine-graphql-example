'use strict'

import Fastify from 'fastify'
import mercurius from 'mercurius'
import nexus from 'nexus'
import * as types from './schema/index.js'
import TdEngine from './lib/tdengine.js'
import { enableGraphiQL } from './config.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const { makeSchema } = nexus

const fastify = Fastify()
const tdEngine = new TdEngine(fastify.log)

const schema = makeSchema({
  types: types,
  features: {
    abstractTypeStrategies: {
      resolveType: false
    }
  },
  nonNullDefaults: {
    output: true
  },
  outputs: {
    schema: join(__dirname, './schema.graphql'),
    typegen: join(__dirname, './generated-types.d.ts')
  },
  plugins: []
})

fastify.register(mercurius, {
  schema,
  context: (req) => {
    return {
      tdEngine: tdEngine,
      log: fastify.log
    }
  },
  graphiql: {
    enabled: enableGraphiQL
  }
})

await fastify.listen({ port: 3000, host: 'localhost' })
fastify.ready(() => {
  console.log(`listening on ${JSON.stringify(fastify.server.address())}`)
  console.log(fastify.printRoutes())
})
