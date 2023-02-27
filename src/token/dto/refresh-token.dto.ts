import { ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsString, IsUUID } from 'class-validator';

export class RefreshTokentDTO {
  @IsString()
  refreshToken: string;

  @IsUUID()
  userId: string;
}
