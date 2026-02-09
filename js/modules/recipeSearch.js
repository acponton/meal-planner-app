import { searchRecipes, searchMealDB} from "./api.js";
import { renderSearchResults } from "./ui.js";

export async function handleRecipeSearch(term) {
  const data = await searchRecipes(term);
  renderSearchResults(data.results);
}

export async function testAPIs() {
  console.log("Testing Spoonacular API...");
  const data = await searchRecipes("pasta");
  console.log("Results:", data);

  console.log("Testing TheMealDB API...");
  const mealdb = await searchMealDB("chicken");
  console.log("TheMealDB results:", mealdb);
}
