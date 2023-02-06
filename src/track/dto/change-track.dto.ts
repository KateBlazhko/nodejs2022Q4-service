import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsString, IsNumber } from 'class-validator';

export class ChangeTrackDTO {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  artistId?: string | null;

  @ApiProperty()
  albumId?: string | null;

  @ApiProperty()
  @IsNumber()
  duration?: number;
}
