import { IsString, IsNotEmpty, IsNumber, ValidateIf, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateTrackDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @ApiProperty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  duration: number;
}
