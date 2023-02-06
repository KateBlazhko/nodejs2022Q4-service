import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators';
import { IsString, IsNumber, IsPositive, IsOptional, ValidateIf } from 'class-validator';

export class ChangeAlbumDTO {
  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsNumber()
  @IsPositive()
  year?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  artistId?: string | null;
}
