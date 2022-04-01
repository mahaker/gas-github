## GitHub API client for Google Apps Script

### Usage

```shell
$npm install gas-github
# or
$yarn add gas-github
```

```javascript
import { Client } from 'gas-github'

declare let global: any

function createIssue() {
  const client = new Client('org', 'repo','token')
  const issueNo = client.createIssue({title: 'test', body: 'body', labels: ['bug', 'documentation']})

  Logger.log(`issue created: ${issueNo}`)
}

global.createIssue = createIssue
```

### API

#### createIssue

Create a issue.
The properties that can be specified are as follows.

ref: https://docs.github.com/en/rest/reference/issues#create-an-issue

#### listMilestones

Get milestones.

ref: https://docs.github.com/en/rest/reference/issues#list-milestones

### Contribution

Welcome contributions and feedbacks!
