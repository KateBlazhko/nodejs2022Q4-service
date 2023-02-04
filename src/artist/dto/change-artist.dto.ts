import { IsString, IsBoolean } from 'class-validator';

export class ChangeArtistDTO {
  @IsString()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
