import * as http from './http'
import { Endpoints } from '@octokit/types'

type Endpoint = keyof Endpoints
type GetResponseType<K extends Endpoint> = Endpoints[K]["response"]["data"]
type GetParameterType<K extends Endpoint> = Omit<Endpoints[K]["parameters"], "accept" | "owner" | "repo">

const urlSearchParams = (parameter: Record<string, unknown>): string => {
  return Object.entries(parameter).map(p => `${p[0]}=${p[1]}`).join('&')
}

export class Client {
  constructor(
    readonly org: string,
    readonly repo: string,
    readonly token: string
  ) {}

  createIssue(parameter: GetParameterType<"POST /repos/{owner}/{repo}/issues">): GetResponseType<"POST /repos/{owner}/{repo}/issues"> {
    /**
     * Verify payload has 'title' property.
     */
    if(!parameter.title) throw new Error('gas-github: createIssue required "title" property.')

    return http.post(
      `/repos/${this.org}/${this.repo}/issues`,
      parameter,
      this.token
    )
  }

  listMilestones(parameter?: GetParameterType<"GET /repos/{owner}/{repo}/milestones">): GetResponseType<"GET /repos/{owner}/{repo}/milestones"> {
    const params = parameter ? `?${urlSearchParams(parameter)}` : ''
    return http.get(
      `/repos/${this.org}/${this.repo}/milestones${params}`,
      this.token
    )
  }

  listRepositoryProjects(parameter?: GetParameterType<"GET /repos/{owner}/{repo}/projects">): GetResponseType<"GET /repos/{owner}/{repo}/projects"> {
    const params = parameter ? `?${urlSearchParams(parameter)}` : ''
    return http.get(
      `/repos/${this.org}/${this.repo}/projects${params}`,
      this.token
    )
  }
}
