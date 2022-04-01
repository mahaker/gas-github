import { Endpoints } from '@octokit/types'

type Endpoint = keyof Endpoints
type GetResponseType<K extends Endpoint> = Endpoints[K]["response"]["data"]

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
  createIssue(payload: unknown): GetResponseType<"POST /repos/{owner}/{repo}/issues"> {
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
    return JSON.parse(response.getContentText())
  }

  listMilestones(): GetResponseType<"GET /repos/{owner}/{repo}/milestones"> {
    const response = UrlFetchApp.fetch(
      `https://api.github.com/repos/${this.org}/${this.repo}/milestones`,
      {
        headers: {
          'User-Agent': 'gas-github',
          'Authorization': `token ${this.token}`
        }
      }
    )
    return JSON.parse(response.getContentText())
  }
}
