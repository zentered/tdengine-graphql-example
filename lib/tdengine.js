'use strict'

import tdengine from '@tdengine/rest'
import { tdEngineToken, tdEngineUrl } from '../config.js'
import parseFields from 'graphql-parse-fields'

const { options: tdOptions, connect: tdConnect } = tdengine
tdOptions.query = { token: tdEngineToken }
tdOptions.url = tdEngineUrl

export default function TdEngine(log) {
  this.log = log
  const conn = tdConnect(tdOptions)
  this.cursor = conn.cursor()
}

export function filterFields(info, context) {
  const invalidFields = ['__typename', 'date']
  const parsedFields = parseFields(info)
  const fields = context ? parsedFields[context] : parsedFields
  const filteredFields = Object.keys(fields).filter(
    (f) => !invalidFields.includes(f)
  )
  return filteredFields.join(',')
}

TdEngine.prototype.fetchData = async function fetchData(sql) {
  this.log.debug('fetchData()')
  this.log.debug(sql)

  const result = await this.cursor.query(sql)
  const data = result.getData()
  const errorCode = result.getErrCode()
  const columns = result.getMeta()

  if (errorCode !== 0) {
    this.log.error(`fetchData() error: ${result.getErrStr()}`)
    throw new Error(result.getErrStr())
  }

  return data.map((r) => {
    const res = {}
    r.forEach((c, idx) => {
      const columnName = columns[idx].columnName
        .replace(/`/g, '')
        .replace('last_row(', '')
        .replace(')', '')
      if (c !== null) {
        res[columnName] = c
      }
    })
    return res
  })
}
