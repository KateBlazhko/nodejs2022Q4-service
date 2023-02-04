import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateArtistDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
