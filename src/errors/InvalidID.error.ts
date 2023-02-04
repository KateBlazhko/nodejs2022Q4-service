export class InvalidID extends Error {
  constructor(operation: string) {
    super(`Fail during ${operation}.`);
    this.name = 'Invalid Id';
  }
}
