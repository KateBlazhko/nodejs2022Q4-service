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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { InvalidID } from 'src/errors/InvalidID.error';
import { NoRequiredEntity } from 'src/errors/NoRequireEntity.error';
import { ChangeTrackDTO } from './dto/change-track.dto';
import { CreateTrackDTO } from './dto/create-track.dto';
import { Track } from './entity/track.entity';
import { TrackService } from './track.service';

@UseGuards(JwtAuthGuard)
@Controller('track')
export class TrackController {
  constructor(private tracksService: TrackService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body(ValidationPipe) createDTO: CreateTrackDTO): Promise<Track> {
    return await this.tracksService.create(createDTO);
  }

  @Get()
  async findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Track> {
    try {
      return await this.tracksService.findById(id);
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not track with such id');
      throw e;
    }
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) changeDTO: ChangeTrackDTO,
  ): Promise<Track> {
    try {
      return await this.tracksService.change(id, changeDTO);
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not track with such id');
      throw e;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<Track> {
    try {
      return await this.tracksService.delete(id);
    } catch (e: unknown) {
      if (e instanceof InvalidID) throw new BadRequestException('Validation id failed');
      if (e instanceof NoRequiredEntity)
        throw new NotFoundException('There is not track with such id');
      throw e;
    }
  }
}
