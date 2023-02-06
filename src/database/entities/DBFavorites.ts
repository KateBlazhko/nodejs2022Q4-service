import { Favorites } from 'src/favorites/interfaces/favs.interface';

export default class DBFavorites {
  protected favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async findAll(): Promise<Favorites> {
    return this.favs;
  }

  async add(id: string, type: keyof Favorites): Promise<void> {
    this.favs[type].push(id);
  }

  async delete(id: string, type: keyof Favorites): Promise<void> {
    const idx = this.findIndexInDB(id, type);
    if (idx !== -1) this.favs[type].splice(idx, 1);
  }

  findIndexInDB(id: string, type: keyof Favorites): number {
    const idx = this.favs[type].findIndex((fav) => fav === id);
    return idx;
  }
}
