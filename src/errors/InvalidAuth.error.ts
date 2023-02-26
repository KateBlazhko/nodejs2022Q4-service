export class InvalidAuth extends Error {
  constructor(operation: string) {
    super(`Fail during ${operation}.`);
    this.name = 'Invalid login or password';
  }
}
