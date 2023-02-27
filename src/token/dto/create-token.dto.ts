import { IsString, IsUUID } from 'class-validator';

export class CreateTokentDTO {
  @IsString()
  refreshToken: string;

  @IsUUID()
  userId: string;
}
