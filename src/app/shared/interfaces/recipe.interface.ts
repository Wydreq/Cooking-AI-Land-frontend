export interface IRecipe {
  id: string;
  name: string;
  description: string;
  prepTime: Number;
  cookTime: Number;
  servings: Number;
  difficultyLevel: Number;
  instructions: string[];
  ingridients: Ingridient[];
}

interface Ingridient {
  id: string;
  name: string;
  unit: Number;
  amount: Number;
}
