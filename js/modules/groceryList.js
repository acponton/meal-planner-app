export function buildGroceryList(mealPlan) {
    const list = [];

    Object.values(mealPlan).forEach(recipe => {
        if (recipe?.extendedIngredients) {
            recipe.extendedIngredients.forEach(i => list.push(i.original));
        }
    });

    return list;
}