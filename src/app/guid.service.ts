import { Injectable } from '@angular/core';
import { v1 } from 'uuid';
import { PersistanceService } from './persistance.service';

@Injectable()
export class GuidService {
  constructor(private storage: PersistanceService) {}
  saveState(state: any): string | never {
    let key = v1();
    try {
      this.storage.set(key, state);
      console.log(key);

      return key;
    } catch (error) {
      throw error;
    }
  }
  loadStateByGuid(guidKey: string): string | never {
    return this.storage.get(guidKey);
  }
}
