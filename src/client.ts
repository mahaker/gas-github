export class Client {
  constructor(
    readonly org: string,
    readonly repo: string,
    readonly token: string
  ) {}

  openIssue(payload: {title: string, body?: string, labels?: string[]}): number {
    const response = UrlFetchApp.fetch(
      `https://api.github.com/repos/${this.org}/${this.repo}/issues`,
      {
        method: 'post',
        headers: {
          'User-Agent': 'gas-github',
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'Authorization': `token ${this.token}`
        },
        payload: JSON.stringify({
          title: payload.title,
          body: payload.body || '',
          labels: payload.labels || []
        })
      }
    )
    return JSON.parse(response.getContentText()).number
  }
}
