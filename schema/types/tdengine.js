import { scalarType } from 'nexus'

export const Timestamp = scalarType({
  name: 'Timestamp',
  asNexusMethod: 'ts',
  description: 'TDEngine Timestamp',
  serialize(value) {
    return new Date(value).getTime()
  }
})

export const TDDate = scalarType({
  name: 'TDDate',
  asNexusMethod: 'tdDate',
  description: 'TDEngine Timestamp as Date',
  serialize(value) {
    return new Date(value).toJSON()
  }
})
