export class Client {
  constructor(
    readonly token: string
  ) {}

  openIssue() {
    return `openIssue ${this.token}`
  }
}
