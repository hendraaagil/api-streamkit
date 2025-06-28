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
  const rank = data.rank.metadata.tierName
  const peakRank = `${data.peakRank.metadata.tierName} (${data.peakRank.metadata.actName})`
  const { matchesWon, matchesLost, matchesTied } = data
  const stats = `Wins: ${matchesWon.value}, Losses: ${matchesLost.value}, Ties: ${matchesTied.value}`

  return c.text(
    `${decodedUsername} - ${rank} | ${stats} | Peak Rank: ${peakRank}`,
  )
})

export default app
