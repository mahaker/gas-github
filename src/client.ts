import * as http from './http'
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

    return http.post(
      `/repos/${this.org}/${this.repo}/issues`,
      payload,
      this.token
    )
  }

  listMilestones(): GetResponseType<"GET /repos/{owner}/{repo}/milestones"> {
    return http.get(
      `/repos/${this.org}/${this.repo}/milestones`,
      this.token
    )
  }
}
