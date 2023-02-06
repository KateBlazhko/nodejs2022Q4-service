import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString, IsNumber } from 'class-validator';

export class ChangeAlbumDTO {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  year?: number;

  @ApiProperty()
  artistId?: string | null;
}
