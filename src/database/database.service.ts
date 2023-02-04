import { Injectable } from '@nestjs/common';
import { cloneDeep } from 'lodash';
import DBAlbums from './entities/DBAlbums';
import DBArtists from './entities/DBArtists';
import DBTracks from './entities/DBTracks';
import DBUsers from './entities/DBUsers';

@Injectable()
export class DatabaseService {
  users = new DBUsers();
  artists = new DBArtists();
  //   albums = new DBAlbums();
  //   tracks = new DBTracks();

  constructor() {
    const deepCopyResultTrap: ProxyHandler<any> = {
      get: (target, prop) => {
        if (typeof target[prop] === 'function') {
          return (...args: any[]) => {
            const result = target[prop](...args);
            if (result instanceof Promise) {
              return result.then((v) => cloneDeep(v));
            }
            return cloneDeep(result);
          };
        } else {
          return target[prop];
        }
      },
    };
    for (const [k, v] of Object.entries(this)) {
      this[k as keyof typeof this] = new Proxy(v, deepCopyResultTrap);
    }
  }
}
