import * as projects from '../src/projects'

const setting = {
  owner: 'myorg',
  repo: 'myrepo',
  pat: 'mytoken',
}

describe('listRepositoryProjects', () => {
  beforeEach(() => {
    UrlFetchApp.fetch = jest.fn(() => {
      return {
        getContentText: () => '[]'
      } as GoogleAppsScript.URL_Fetch.HTTPResponse
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('no parameter', () => {
    // arrange
    // action
    projects.listRepositoryProjects(setting)

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${setting.owner}/${setting.repo}/projects`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${setting.pat}`
      }
    })
  })

  test('one parameter', () => {
    // arrange
    // action
    projects.listRepositoryProjects(setting, {state: 'all'})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${setting.owner}/${setting.repo}/projects?state=all`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${setting.pat}`
      }
    })
  })

  test('two or more parameters', () => {
    // arrange
    // action
    projects.listRepositoryProjects(setting, {state: 'all', page: 2})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${setting.owner}/${setting.repo}/projects?state=all&page=2`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${setting.pat}`
      }
    })
  })
})

describe('listProjectColumns', () => {
  beforeEach(() => {
    UrlFetchApp.fetch = jest.fn(() => {
      return {
        getContentText: () => '[]'
      } as GoogleAppsScript.URL_Fetch.HTTPResponse
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('no parameter', () => {
    // arrange
    const projectId = 123

    // action
    projects.listProjectColumns(setting, projectId)

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/projects/${projectId}/columns`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${setting.pat}`
      }
    })
  })

  test('one parameter', () => {
    // arrange
    const projectId = 123

    // action
    projects.listProjectColumns(setting, projectId, {per_page: 1})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/projects/${projectId}/columns?per_page=1`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${setting.pat}`
      }
    })
  })

  test('two or more parameters', () => {
    // arrange
    const projectId = 123

    // action
    projects.listProjectColumns(setting, projectId, {per_page: 1, page: 2})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/projects/${projectId}/columns?per_page=1&page=2`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${setting.pat}`
      }
    })
  })
})

describe('addProjectCardFromIssue', () => {
  beforeEach(() => {
    UrlFetchApp.fetch = jest.fn(() => {
      return {
        getContentText: () => '{}'
      } as GoogleAppsScript.URL_Fetch.HTTPResponse
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('', () => {
    // arrange
    const columnId = 123
    const issueId = 345

    // action
    projects.addProjectCardFromIssue(setting, columnId, issueId)

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/projects/columns/${columnId}/cards`, {
      method: 'post',
      headers: {
        'User-Agent': 'gas-github',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${setting.pat}`
      },
      payload: JSON.stringify({
        note: null,
        content_id: issueId,
        content_type: 'Issue'
      })
    })
  })
})

