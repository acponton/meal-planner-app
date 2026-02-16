const SPOONACULAR_KEY = "1c2b8a47696f4e22bd543f1b00c52766";

export async function searchRecipes(query) {
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${SPOONACULAR_KEY}`;
    const response = await fetch(url);
    return response.json();
}

export async function getRecipeDetails(id) {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_KEY}`;
    const response = await fetch(url);
    return response.json();
}

// Search recipes from TheMealDB
export async function searchMealDB(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("TheMealDB request failed");
        return await response.json();
    }   catch (err) {
        console.error("Error fetching TheMealDB recipes:", err);
        return { meals: [] };
    }
}

// Get full recipe details from TheMealDB
export async function getMealDBDetails(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("TheMealDB details request failed");
        return await response.json();
    }   catch (err) {
        console.error("Error fetching TheMealDB details:", err);
        return null;
    }
}