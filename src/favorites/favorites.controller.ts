import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Header,
  BadRequestException,
  NotFoundException,
  HttpCode,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InvalidID } from 'src/errors/InvalidID.error';
import { InvalidType } from 'src/errors/InvalidType.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { TypeEntity } from './entity/favorites.entity';
import { FavoritesService } from './favorites.service';
import { FavoritesDTO } from './interfaces/favs.interface';

@UseGuards(JwtAuthGuard)
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async findAll(): Promise<FavoritesDTO> {
    return await this.favoritesService.findAll();
  }

  @Post(':type/:id')
  @Header('Content-Type', 'application/json')
  async addTrack(
    @Param('type') type: TypeEntity,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    try {
      await this.favoritesService.add(id, type);
      return { message: `The ${type} was successfully added` };
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof InvalidType) throw new BadRequestException('Validation type Entity failed');
      if (e instanceof NoRequiredEntity)
        throw new UnprocessableEntityException(`There is not ${type} with such id`);
      throw e;
    }
  }

  @Delete(':type/:id')
  @HttpCode(204)
  async removeTrack(
    @Param('type') type: TypeEntity,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    try {
      await this.favoritesService.delete(id, type);
      return { message: `The ${type} was successfully deleded` };
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof InvalidType) throw new BadRequestException('Validation type Entity failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException(`There is not ${type} with such id`);
      throw e;
    }
  }
}
