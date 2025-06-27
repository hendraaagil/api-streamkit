import { Hono } from 'hono'
import { fetchValorantProfile } from './libs/fetcher'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello from StreamKit!')
})

app.get('/valorant', async (c) => {
  const username = c.req.query('username') ?? ''
  const data = await fetchValorantProfile(username)
  if (!data) {
    return c.text('Failed to fetch data')
  }

  const decodedUsername = decodeURIComponent(username)
  const rank = data.rank.value ? data.rank.metadata.tierName : 'Unranked'
  const currentRank = rank + (data.rank.value ? ` (${data.rank.value} RR)` : '')
  const peakRank = data.peakRank.displayValue || 'Unranked'
  const peakAct = data.peakRank.displayValue
    ? `(${data.peakRank.metadata.actName})`
    : ''

  return c.text(
    `${decodedUsername} - ${currentRank} | Peak Rank: ${peakRank} ${peakAct}`,
  )
})

export default app
