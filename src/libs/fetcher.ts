export const fetchValorantProfile = async (username: string) => {
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    Accept: 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    DNT: '1',
    Connection: 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Cache-Control': 'max-age=0',
    Referer: 'https://tracker.gg/',
    Origin: 'https://tracker.gg',
  }

  try {
    // Add a small delay to not look like a bot
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 500),
    )

    const response = await fetch(
      `https://api.tracker.gg/api/v2/valorant/standard/profile/riot/${encodeURIComponent(
        username,
      )}`,
      {
        method: 'GET',
        headers,
        credentials: 'include',
      },
    )

    if (!response.ok) {
      console.log(`HTTP Error: ${response.status} - ${response.statusText}`)
      console.log(
        'Response headers:',
        Object.fromEntries(response.headers.entries()),
      )
    }

    const data = (await response.json()) as Record<string, any>
    if (data.data?.segments?.[0]) {
      const stats = data.data.segments[0].stats
      const { rank, peakRank, matchesWon, matchesLost, matchesTied } = stats
      return { rank, peakRank, matchesWon, matchesLost, matchesTied }
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
