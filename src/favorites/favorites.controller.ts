import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  BadRequestException,
  NotFoundException,
  HttpCode,
  ValidationPipe,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { FavoritesService } from './favorites.service';
import { FavoritesDTO } from './interfaces/favs.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async findAll(): Promise<FavoritesDTO> {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  @Header('Content-Type', 'application/json')
  async addTrack(@Param('id') id: string): Promise<void> {
    try {
      return await this.favoritesService.add(id, 'tracks');
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new UnprocessableEntityException('There is not track with such id');
    }
  }

  @Post('album/:id')
  @Header('Content-Type', 'application/json')
  async addAlbum(@Param('id') id: string): Promise<void> {
    try {
      return await this.favoritesService.add(id, 'albums');
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new UnprocessableEntityException('There is not album with such id');
    }
  }

  @Post('artist/:id')
  @Header('Content-Type', 'application/json')
  async addArtist(@Param('id') id: string): Promise<void> {
    try {
      return await this.favoritesService.add(id, 'artists');
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new UnprocessableEntityException('There is not artist with such id');
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id') id: string): Promise<void> {
    try {
      return await this.favoritesService.delete(id, 'tracks');
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not track with such id');
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id') id: string): Promise<void> {
    try {
      return await this.favoritesService.delete(id, 'albums');
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not album with such id');
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id') id: string): Promise<void> {
    try {
      return await this.favoritesService.delete(id, 'artists');
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not artist with such id');
    }
  }
}
