import { IsString, IsNumber } from 'class-validator';

export class ChangeAlbumDTO {
  @IsString()
  name?: string;

  @IsNumber()
  year?: number;

  artistId?: string | null;
}
