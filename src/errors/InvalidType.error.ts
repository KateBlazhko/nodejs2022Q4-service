export class InvalidType extends Error {
  constructor(operation: string) {
    super(`Fail during ${operation}.`);
    this.name = 'Invalid Type of Entity';
  }
}
