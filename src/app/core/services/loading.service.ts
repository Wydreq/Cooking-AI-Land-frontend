import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isLoading$ = new BehaviorSubject<boolean>(false);
  constructor() {}
}
