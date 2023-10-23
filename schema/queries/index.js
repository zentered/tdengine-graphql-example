import { objectType } from 'nexus'
import { getVesselInformation } from '../../lib/sinay.js'
import { filterFields } from '../../lib/tdengine.js'

export const GenericQueries = objectType({
  name: 'Query',
  definition(t) {
    t.field('vessel', {
      type: 'Vessel',
      args: {
        mmsi: 'String'
      },
      resolve: async (root, args, { tdEngine }, info) => {
        const fields = filterFields(info, 'movements')
        const waiting = [
          getVesselInformation(args.mmsi),
          tdEngine.fetchData(
            `select ${fields} from vessel.ais_data where mmsi = '${args.mmsi}' order by ts desc limit 10;`
          )
        ]

        const results = await Promise.all(waiting)
        return {
          ...results[0][0],
          movements: results[1]
        }
      }
    })
    t.list.field('latestMovements', {
      type: 'VesselMovement',
      resolve: async (root, args, { tdEngine }, info) => {
        const fields = filterFields(info)
        return tdEngine.fetchData(
          `select last_row(${fields}) from vessel.ais_data partition by mmsi;`
        )
      }
    })
  }
})
