import { objectType } from 'nexus'

export const VesselMovement = objectType({
  name: 'VesselMovement',
  definition(t) {
    t.ts('ts')
    t.string('mmsi')
    t.string('name')
    t.float('latitude')
    t.float('longitude')
    t.float('speed')
    t.float('heading')
    t.int('nav_status')
  }
})
