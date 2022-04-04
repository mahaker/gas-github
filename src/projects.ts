import * as http from './http'
import type * as types from './types'

const listRepositoryProjects = <E extends 'GET /repos/{owner}/{repo}/projects'>(setting: types.GITHUB_SETTING, parameter?: types.GetParameterType<E>): types.GetResponseType<E> => {
  const params = parameter ? `?${http.urlSearchParams(parameter)}` : ''
  return http.get(`/repos/${setting.owner}/${setting.repo}/projects${params}`, setting.pat)
}

const listProjectColumns = <E extends 'GET /projects/{project_id}/columns'>(setting: types.GITHUB_SETTING, projectId: number, parameter?: Omit<types.GetParameterType<E>, 'project_id'>): types.GetResponseType<E> => {
  const params = parameter ? `?${http.urlSearchParams(parameter)}` : ''
  return http.get(`/projects/${projectId}/columns${params}`, setting.pat)
}

const addProjectCardFromIssue = <E extends 'POST /projects/columns/{column_id}/cards'>(setting: types.GITHUB_SETTING, columnId: number, issueId: number): types.GetResponseType<E> => {
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
