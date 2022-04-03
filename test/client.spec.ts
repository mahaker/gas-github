import { Client } from '../src/client'

describe('Client#createIssue', () => {
  beforeEach(() => {
    UrlFetchApp.fetch = jest.fn(() => {
      return {
        getContentText: () => '{"number": 123}'
      } as GoogleAppsScript.URL_Fetch.HTTPResponse
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('title is empty', () => {
    // arrange
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'
    const body = 'my body'
    const labels = ['label1', 'label2']

    // action
    const client = new Client(org, repo, token)

    // assert
    expect(() => {
      client.createIssue({title: '', body, labels})
    }).toThrowError('gas-github: createIssue required "title" property.')
  })

  test('body and labels exists', () => {
    // arrange
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'
    const title = 'my title'
    const body = 'my body'
    const labels = ['label1', 'label2']

    // action
    const client = new Client(org, repo, token)
    const r = client.createIssue({title, body, labels})

    // assert
    expect(r.number).toEqual(123)
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/issues`, {
      method: 'post',
      headers: {
        'User-Agent': 'gas-github',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      },
      payload: JSON.stringify({title, body, labels})
    })
  })

  test('body does not exist', () => {
    // arrange
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'
    const title = 'my title'
    const labels = ['label1', 'label2']

    // action
    const client = new Client(org, repo, token)
    const r = client.createIssue({title, labels})

    // assert
    expect(r.number).toEqual(123)
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/issues`, {
      method: 'post',
      headers: {
        'User-Agent': 'gas-github',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      },
      payload: JSON.stringify({title, labels})
    })
  })

  test('labels is empty', () => {
    // arrange
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'
    const title = 'my title'
    const body = 'my body'
    const labels: string[] = []

    // action
    const client = new Client(org, repo, token)
    const r = client.createIssue({title, body, labels})

    // assert
    expect(r.number).toEqual(123)
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/issues`, {
      method: 'post',
      headers: {
        'User-Agent': 'gas-github',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      },
      payload: JSON.stringify({title, body, labels})
    })
  })

  test('labels does not exist', () => {
    // arrange
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'
    const title = 'my title'
    const body = 'my body'

    // action
    const client = new Client(org, repo, token)
    const r = client.createIssue({title, body})

    // assert
    expect(r.number).toEqual(123)
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/issues`, {
      method: 'post',
      headers: {
        'User-Agent': 'gas-github',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      },
      payload: JSON.stringify({title, body})
    })
  })

  test('body and labels does not exist', () => {
    // arrange
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'
    const title = 'my title'

    // action
    const client = new Client(org, repo, token)
    const r = client.createIssue({title})

    // assert
    expect(r.number).toEqual(123)
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/issues`, {
      method: 'post',
      headers: {
        'User-Agent': 'gas-github',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      },
      payload: JSON.stringify({title})
    })
  })
})

describe('Client#listMilestones', () => {
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
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'

    // action
    const client = new Client(org, repo, token)
    client.listMilestones()

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/milestones`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${token}`
      }
    })
  })

  test('one parameter', () => {
    // arrange
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'

    // action
    const client = new Client(org, repo, token)
    client.listMilestones({state: 'all'})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/milestones?state=all`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${token}`
      }
    })
  })

  test('two or more parameters', () => {
    // arrange
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'

    // action
    const client = new Client(org, repo, token)
    client.listMilestones({state: 'all', page: 2})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/milestones?state=all&page=2`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${token}`
      }
    })
  })
})

describe('Client#listRepositoryProjects', () => {
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
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'

    // action
    const client = new Client(org, repo, token)
    client.listRepositoryProjects()

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/projects`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${token}`
      }
    })
  })

  test('one parameter', () => {
    // arrange
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'

    // action
    const client = new Client(org, repo, token)
    client.listRepositoryProjects({state: 'all'})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/projects?state=all`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${token}`
      }
    })
  })

  test('two or more parameters', () => {
    // arrange
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'

    // action
    const client = new Client(org, repo, token)
    client.listRepositoryProjects({state: 'all', page: 2})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/projects?state=all&page=2`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${token}`
      }
    })
  })
})

describe('Client#listProjectColumns', () => {
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
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'
    const projectId = 123

    // action
    const client = new Client(org, repo, token)
    client.listProjectColumns(projectId)

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/projects/${projectId}/columns`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${token}`
      }
    })
  })

  test('one parameter', () => {
    // arrange
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'
    const projectId = 123

    // action
    const client = new Client(org, repo, token)
    client.listProjectColumns(projectId, {per_page: 1})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/projects/${projectId}/columns?per_page=1`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${token}`
      }
    })
  })

  test('two or more parameters', () => {
    // arrange
    const org = 'myorg'
    const repo = 'myrepo'
    const token = 'mytoken'
    const projectId = 123

    // action
    const client = new Client(org, repo, token)
    client.listProjectColumns(projectId, {per_page: 1, page: 2})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/projects/${projectId}/columns?per_page=1&page=2`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${token}`
      }
    })
  })
})
