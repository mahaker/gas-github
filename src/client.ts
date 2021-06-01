export class Client {
  constructor(
    readonly org: string,
    readonly repo: string,
    readonly token: string
  ) {}

  /**
   * The properties that can be specified are as follows.
   * https://docs.github.com/en/rest/reference/issues#create-an-issue
   */
  createIssue(payload: unknown): number {
    /**
     * Verify payload has 'title' property.
     */
    if(!(typeof payload === 'object' && payload !== null && 'title' in payload)) throw new Error('gas-github: createIssue required "title" property.')

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
        payload: JSON.stringify(payload)
      }
    )
    return JSON.parse(response.getContentText()).number
  }
}
