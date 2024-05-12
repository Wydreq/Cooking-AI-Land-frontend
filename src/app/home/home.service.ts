import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environment';
import { IPaginableResponse } from '../shared/interfaces/PaginableResponse.interface';
import { IRecipe } from '../shared/interfaces/recipe.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  $recipes = new BehaviorSubject<IPaginableResponse<IRecipe[]> | null>(null);

  fetchRecipesHandler() {
    this.http
      .get<IPaginableResponse<IRecipe[]>>(`${environment.backendUrl}/recipe`)
      .subscribe((res) => this.$recipes.next(res));
  }
}
