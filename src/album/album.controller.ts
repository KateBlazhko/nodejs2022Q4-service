import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Header,
  BadRequestException,
  NotFoundException,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { AlbumService } from './album.service';
import { ChangeAlbumDTO } from './dto/change-album.dto';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { AlbumEntity } from './entity/album.entity';
// import { Album } from './interfaces/album.interface';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body(ValidationPipe) createAlbumDTO: CreateAlbumDTO): Promise<AlbumEntity> {
    return await this.albumService.create(createAlbumDTO);
  }

  @Get()
  async findAll(): Promise<AlbumEntity[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<AlbumEntity> {
    try {
      return await this.albumService.findById(id);
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not album with such id');
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) changeAlbumDTO: ChangeAlbumDTO,
  ): Promise<AlbumEntity> {
    try {
      return await this.albumService.change(id, changeAlbumDTO);
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not album with such id');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<AlbumEntity> {
    try {
      return await this.albumService.delete(id);
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not album with such id');
    }
  }
}
