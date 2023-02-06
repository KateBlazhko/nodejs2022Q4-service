import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateTrackDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  artistId: string | null;

  @ApiProperty()
  albumId: string | null;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
