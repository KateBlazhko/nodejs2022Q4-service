import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { ArtistService } from './artist.service';
import { ChangeArtistDTO } from './dto/change-artist.dto';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { ArtistEntity } from './entity/artist.entity';
// import { Artist } from './interfaces/artist.interface';

@Controller('artist')
export class ArtistController {
  constructor(private artistsService: ArtistService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body(ValidationPipe) createArtistDTO: CreateArtistDTO): Promise<ArtistEntity> {
    return await this.artistsService.create(createArtistDTO);
  }

  @Get()
  async findAll(): Promise<ArtistEntity[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ArtistEntity> {
    try {
      return await this.artistsService.findById(id);
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not artist with such id');
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) changeArtistDTO: ChangeArtistDTO,
  ): Promise<ArtistEntity> {
    try {
      return await this.artistsService.change(id, changeArtistDTO);
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not artist with such id');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<ArtistEntity> {
    try {
      return await this.artistsService.delete(id);
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not artist with such id');
    }
  }
}
