## GitHub API client for Google Apps Script

### Usage

```shell
$npm install gas-github
# or
$yarn add gas-github
```

```javascript
import * as issues from 'gas-github/lib/issues'
// or
// import { createIssue } from 'gas-github'

declare let global: any

function postIssue() {
  const setting = { owner: 'org', repo: 'repo', pat: 'token' }
  const issue = issues.createIssue(setting, {title: 'test', body: 'body', labels: ['bug', 'documentation']})

  Logger.log(`issue created: ${issue}`)
}

global.postIssue = postIssue
```

### API

#### /lib/issues

1. createIssue
   - ref: https://docs.github.com/en/rest/reference/issues#create-an-issue
1. listMilestones
   - ref: https://docs.github.com/en/rest/reference/issues#list-milestones

#### /lib/projects

1. listRepositoryProjects
   - ref: https://docs.github.com/en/rest/reference/projects#list-repository-projects
1. listProjectColumns
   - ref: https://docs.github.com/en/rest/reference/projects#list-project-columns
1. addProjectCardFromIssue
   - ref: https://docs.github.com/en/rest/reference/projects#create-a-project-card

### Contribution

Welcome contributions and feedbacks!
