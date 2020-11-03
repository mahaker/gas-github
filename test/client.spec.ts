import { Client } from '../src/client'

describe('Client#openIssue', () => {
  test('case1', () => {
    // arrange
    const client = new Client('mahaker')

    // action & assert
    expect(client.openIssue()).toEqual('openIssue mahaker')
    expect(client.openIssue()).not.toEqual('openIssue mahaker.')
  })
})
