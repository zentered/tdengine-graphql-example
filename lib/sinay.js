import { sinayApiKey } from '../config.js'

const sinay = (mmsi) => {
  return `https://api.sinay.ai/ports-vessels/api/v1/vessels?vesselNameOrCode=${mmsi}&numberOfResult=10`
}

export async function getVesselInformation(mmsi) {
  console.log(`Fetching vessel information for ${mmsi}`)
  const response = await fetch(sinay(mmsi), {
    method: 'GET',
    headers: {
      accept: 'application/json',
      API_KEY: sinayApiKey
    }
  })
  const data = await response.json()
  return data.vesselsList
}
