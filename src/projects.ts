import * as http from './http'
import type * as types from './types'

const listRepositoryProjects = (setting: types.GITHUB_SETTING, parameter?: types.GetParameterType<"GET /repos/{owner}/{repo}/projects">): types.GetResponseType<"GET /repos/{owner}/{repo}/projects"> => {
  const params = parameter ? `?${http.urlSearchParams(parameter)}` : ''
  return http.get(`/repos/${setting.owner}/${setting.repo}/projects${params}`, setting.pat)
}

const listProjectColumns = (setting: types.GITHUB_SETTING, projectId: number, parameter?: Omit<types.GetParameterType<"GET /projects/{project_id}/columns">, 'project_id'>): types.GetResponseType<"GET /projects/{project_id}/columns"> => {
  const params = parameter ? `?${http.urlSearchParams(parameter)}` : ''
  return http.get(`/projects/${projectId}/columns${params}`, setting.pat)
}

const addProjectCardFromIssue = (setting: types.GITHUB_SETTING, columnId: number, issueId: number): types.GetResponseType<"POST /projects/columns/{column_id}/cards"> => {
  return http.post(`/projects/columns/${columnId}/cards`,
    {
      note: null,
      content_id: issueId,
      content_type: 'Issue'
    },
    setting.pat
  )
}

export { listRepositoryProjects, listProjectColumns, addProjectCardFromIssue }
