import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class UpdatePasswordDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}
