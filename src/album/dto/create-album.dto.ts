import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAlbumDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  artistId: string | null;
}
