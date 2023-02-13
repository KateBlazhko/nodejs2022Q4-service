import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
