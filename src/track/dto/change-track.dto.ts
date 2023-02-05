import { IsString, IsNumber } from 'class-validator';

export class ChangeTrackDTO {
  @IsString()
  name?: string;

  artistId?: string | null;
  albumId?: string | null;

  @IsNumber()
  duration?: number;
}
