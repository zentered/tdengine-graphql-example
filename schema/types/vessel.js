import { objectType } from 'nexus'

export const Vessel = objectType({
  name: 'Vessel',
  definition(t) {
    t.string('mmsi')
    t.string('name')
    t.nullable.string('imo')
    t.list.field('movements', { type: 'VesselMovement' })
  }
})
