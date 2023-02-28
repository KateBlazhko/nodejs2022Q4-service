export class UserAlreadyExist extends Error {
  constructor(operation: string) {
    super(`Fail during ${operation}.`);
    this.name = 'User with such login already exist';
  }
}
