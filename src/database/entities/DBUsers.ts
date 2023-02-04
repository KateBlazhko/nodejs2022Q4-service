import { User } from 'src/user/interfaces/user.interface';
import DBEntity from './DBEntity';

export type CreateUserDTO = Omit<User, 'id'>;
export type ChangeUserDTO = Partial<Omit<User, 'id'>>;

export default class DBUsers extends DBEntity<User, ChangeUserDTO, CreateUserDTO> {}
