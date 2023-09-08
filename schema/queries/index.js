import { objectType } from 'nexus'
import { getVesselInformation } from '../../lib/sinay.js'

export const GenericQueries = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('vessels', {
      type: 'Vessel',
      args: {
        mmsi: 'String'
      },
      resolve: async (root, args, {}, info) => {
        return getVesselInformation(args.mmsi)
      }
    })
    t.field('latestMovement', {
      type: 'Vessel',
      args: {
        mmsi: 'String'
      },
      resolve: async (root, args, { tdEngine }, info) => {
        const lastRow = await tdEngine.fetchData(
          `select last_row(ts, mmsi, latitute, longitude) from vessel.ais_data;`
        )
        console.log(lastRow)
        const vesselInfo = await getVesselInformation(lastRow[0].mmsi)
      }
    })
    t.list.field('latestMovements', {
      type: 'VesselMovement',
      resolve: async (root, args, { tdEngine }, info) => {
        return tdEngine.fetchData(
          `select last_row(ts, mmsi, latitute, longitude) from vessel.ais_data;`
        )
      }
    })
  }
})
