const GITHUB_HOST = 'https://api.github.com'
const USER_AGENT = 'gas-github'

const urlSearchParams = (parameter: Record<string, unknown>): string => {
  return Object.entries(parameter).map(p => `${p[0]}=${p[1]}`).join('&')
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const get = (url: string, token: string): any => {
  const response = UrlFetchApp.fetch(
    `${GITHUB_HOST}${url}`,
    {
      headers: {
        'User-Agent': USER_AGENT,
        'Authorization': `token ${token}`
      }
    }
  )
  return JSON.parse(response.getContentText())
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const post = (url: string, payload: unknown, token: string): any => {
  const response = UrlFetchApp.fetch(
    `${GITHUB_HOST}${url}`,
    {
      method: 'post',
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      },
      payload: JSON.stringify(payload)
    }
  )
  return JSON.parse(response.getContentText())
}

export { urlSearchParams, get, post }
