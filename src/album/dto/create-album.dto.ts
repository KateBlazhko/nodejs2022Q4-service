import { ApiProperty } from '@nestjs/swagger/dist';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAlbumDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  artistId: string | null;
}
