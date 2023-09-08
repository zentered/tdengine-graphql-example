'use strict'

import tdengine from '@tdengine/rest'
import { tdEngineToken, tdEngineUrl } from '../config.js'
console.log(tdEngineToken)
const invalidFields = ['__typename']

const { options: tdOptions, connect: tdConnect } = tdengine
tdOptions.query = { token: tdEngineToken }
tdOptions.url = tdEngineUrl

export default function TdEngine(log) {
  this.log = log
  const conn = tdConnect(tdOptions)
  this.cursor = conn.cursor()
}

TdEngine.prototype.fetchData = async function fetchData(sql, keys) {
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
      let columnName = columns[idx].columnName
      columnName = columnName.replace(/`/g, '')
      if (columnName.startsWith('last_row')) {
        columnName = columnName.replace('last_row(', '').replace(')', '')
      }
      if (c !== null) {
        res[columnName] = c
      }
    })
    return res
  })
}
