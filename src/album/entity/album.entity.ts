import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumEntity {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
