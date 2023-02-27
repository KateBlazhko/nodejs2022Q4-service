export class InvalidRefreshToken extends Error {
  constructor(operation: string) {
    super(`Fail during ${operation}.`);
    this.name = 'Invalid login or password';
  }
}
