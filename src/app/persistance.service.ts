import { Injectable } from '@angular/core';

@Injectable()
export class  PersistanceService {
  constructor() {}

  set(key: string, data: any): void | never {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      let errorMessage = `Error saving to localStorage: ${e}`;
      console.error(errorMessage);
      throw errorMessage;
    }
  }

  get(key: string): string | never {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      let errorMessage = `Error getting data from localStorage: ${e}`;
      console.error(errorMessage);
      throw errorMessage;
    }
  }
}
