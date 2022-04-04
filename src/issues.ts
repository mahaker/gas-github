import * as http from './http'
import type * as types from './types'

const createIssue = (setting: types.GITHUB_SETTING, parameter: types.GetParameterType<"POST /repos/{owner}/{repo}/issues">): types.GetResponseType<"POST /repos/{owner}/{repo}/issues"> => {
  return http.post(`/repos/${setting.owner}/${setting.repo}/issues`, parameter, setting.pat)
}

const listMilestones = (setting: types.GITHUB_SETTING, parameter?: types.GetParameterType<"GET /repos/{owner}/{repo}/milestones">): types.GetResponseType<"GET /repos/{owner}/{repo}/milestones"> => {
  const params = parameter ? `?${http.urlSearchParams(parameter)}` : ''
  return http.get(`/repos/${setting.owner}/${setting.repo}/milestones${params}`, setting.pat)
}

export { createIssue, listMilestones }
