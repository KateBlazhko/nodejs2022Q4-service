import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTrackDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
