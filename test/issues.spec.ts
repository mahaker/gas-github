import * as issues from '../src/issues'

const setting = {
  owner: 'myorg',
  repo: 'myrepo',
  pat: 'mytoken',
}

describe('createIssue', () => {
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

  test('body and labels exists', () => {
    // arrange
    const title = 'my title'
    const body = 'my body'
    const labels = ['label1', 'label2']

    // action
    const r = issues.createIssue(setting, {title, body, labels})

    // assert
    expect(r.number).toEqual(123)
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${setting.owner}/${setting.repo}/issues`, {
      method: 'post',
      headers: {
        'User-Agent': 'gas-github',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${setting.pat}`
      },
      payload: JSON.stringify({title, body, labels})
    })
  })
})

describe('listMilestones', () => {
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
    issues.listMilestones(setting)

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${setting.owner}/${setting.repo}/milestones`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${setting.pat}`
      }
    })
  })

  test('one parameter', () => {
    // arrange
    // action
    issues.listMilestones(setting, {state: 'all'})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${setting.owner}/${setting.repo}/milestones?state=all`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${setting.pat}`
      }
    })
  })

  test('two or more parameters', () => {
    // action
    issues.listMilestones(setting, {state: 'all', page: 2})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${setting.owner}/${setting.repo}/milestones?state=all&page=2`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${setting.pat}`
      }
    })
  })
})

describe('listRepositoryIssues', () => {
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
    issues.listRepositoryIssues(setting)

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${setting.owner}/${setting.repo}/issues`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${setting.pat}`
      }
    })
  })

  test('one parameter', () => {
    // arrange
    // action
    issues.listRepositoryIssues(setting, {state: 'all'})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${setting.owner}/${setting.repo}/issues?state=all`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${setting.pat}`
      }
    })
  })

  test('two or more parameters', () => {
    // action
    issues.listRepositoryIssues(setting, {state: 'all', page: 2})

    // assert
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${setting.owner}/${setting.repo}/issues?state=all&page=2`, {
      headers: {
        'User-Agent': 'gas-github',
        'Authorization': `token ${setting.pat}`
      }
    })
  })
})
