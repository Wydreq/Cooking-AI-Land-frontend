import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { IRecipe } from '../../shared/interfaces/recipe.interface';
import { IPaginableResponse } from '../../shared/interfaces/PaginableResponse.interface';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, ButtonModule, TranslateModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  protected recipes: IPaginableResponse<IRecipe[]> | null = null;

  ngOnInit(): void {
    this.homeService.$recipes.subscribe((res) => (this.recipes = res));
    if (this.recipes === null) this.homeService.fetchRecipesHandler();
  }
}
