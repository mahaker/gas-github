import * as http from './http'
import type * as types from './types'

const createIssue = <E extends 'POST /repos/{owner}/{repo}/issues'>(setting: types.GITHUB_SETTING, parameter: types.GetParameterType<E>): types.GetResponseType<E> => {
  return http.post(`/repos/${setting.owner}/${setting.repo}/issues`, parameter, setting.pat)
}

const getIssue = (setting: types.GITHUB_SETTING, issueNumber: number): types.GetResponseType<'GET /repos/{owner}/{repo}/issues/{issue_number}'> => {
  return http.get(`/repos/${setting.owner}/${setting.repo}/issues/${issueNumber}`, setting.pat)
}

const listMilestones = <E extends 'GET /repos/{owner}/{repo}/milestones'>(setting: types.GITHUB_SETTING, parameter?: types.GetParameterType<E>): types.GetResponseType<E> => {
  const params = parameter ? `?${http.urlSearchParams(parameter)}` : ''
  return http.get(`/repos/${setting.owner}/${setting.repo}/milestones${params}`, setting.pat)
}

const listRepositoryIssues = <E extends 'GET /repos/{owner}/{repo}/issues'>(setting: types.GITHUB_SETTING, parameter?: types.GetParameterType<E>): types.GetResponseType<E> => {
  const params = parameter ? `?${http.urlSearchParams(parameter)}` : ''
  return http.get(`/repos/${setting.owner}/${setting.repo}/issues${params}`, setting.pat)
}

export { createIssue, getIssue, listMilestones, listRepositoryIssues }
