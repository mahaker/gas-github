import { Endpoints } from '@octokit/types'

export type GITHUB_SETTING = {
  owner: string
  repo: string
  pat: string
}

type Endpoint = keyof Endpoints
export type GetResponseType<K extends Endpoint> = Endpoints[K]["response"]["data"]
export type GetParameterType<K extends Endpoint> = Omit<Endpoints[K]["parameters"], "accept" | "owner" | "repo">

