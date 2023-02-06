export class WrongPassword extends Error {
  constructor(operation: string) {
    super(`Fail during ${operation}.`);
    this.name = 'Wrong entered old password';
  }
}
