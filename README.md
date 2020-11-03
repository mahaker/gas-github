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

function openIssue() {
  const client = new Client('org', 'repo','token')
  const issueNo = client.openIssue({title: 'test', body: 'body', labels: ['bug', 'documentation']})

  Logger.log(`issue created: ${issueNo}`)
}

global.openIssue = openIssue
```

### Contribution

Welcome contributions and feedbacks!
