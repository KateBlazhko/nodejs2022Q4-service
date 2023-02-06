import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsString, IsNumber, IsPositive, IsOptional, ValidateIf } from 'class-validator';

export class ChangeTrackDTO {
  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  artistId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  albumId?: string | null;

  @ApiPropertyOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsNumber()
  @IsPositive()
  duration?: number;
}
