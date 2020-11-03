import { Client } from '../src/client'


describe('Client#openIssue', () => {
  beforeEach(() => {
    UrlFetchApp.fetch = jest.fn(() => {
      return {
        getContentText: () => '{"number": 123}'
      } as GoogleAppsScript.URL_Fetch.HTTPResponse
    })
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
    const issueNo = client.openIssue({title, body, labels})

    // assert
    expect(issueNo).toEqual(123)
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
    const issueNo = client.openIssue({title, labels})

    // assert
    expect(issueNo).toEqual(123)
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/issues`, {
      method: 'post',
      headers: {
        'User-Agent': 'gas-github',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      },
      payload: JSON.stringify({title, body: '', labels})
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
    const issueNo = client.openIssue({title, body, labels})

    // assert
    expect(issueNo).toEqual(123)
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
    const issueNo = client.openIssue({title, body})

    // assert
    expect(issueNo).toEqual(123)
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/issues`, {
      method: 'post',
      headers: {
        'User-Agent': 'gas-github',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      },
      payload: JSON.stringify({title, body, labels: []})
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
    const issueNo = client.openIssue({title})

    // assert
    expect(issueNo).toEqual(123)
    expect(UrlFetchApp.fetch).toHaveBeenCalledTimes(1)
    expect(UrlFetchApp.fetch).toHaveBeenLastCalledWith(`https://api.github.com/repos/${org}/${repo}/issues`, {
      method: 'post',
      headers: {
        'User-Agent': 'gas-github',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${token}`
      },
      payload: JSON.stringify({title, body: '', labels: []})
    })
  })
})
