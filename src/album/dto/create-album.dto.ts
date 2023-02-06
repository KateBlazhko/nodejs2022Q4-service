import { ApiProperty } from '@nestjs/swagger/dist';
import { IsString, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

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
  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
