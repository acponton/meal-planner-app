const MEAL_PLANS_KEY = "meal_plans";
const GROCERY_LIST_KEY = "grocery_list";
const SELECTED_RECIPE_KEY = "selected_recipe";

function safeParse(json, fallback) {
    try {
        return json ? JSON.parse(json) : fallback;
    } catch {
        return fallback;
    }
}

// Meal planner
export function getMealPlans() {
    return safeParse(localStorage.getItem(MEAL_PLANS_KEY), {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    });
}

export function saveMealPlans(plans) {
    localStorage.setItem(MEAL_PLANS_KEY, JSON.stringify(plans));
}

// Grocery list
export function getGroceryList() {
    return safeParse(localStorage.getItem(GROCERY_LIST_KEY), []);
}

export function saveGroceryList(items) {
    localStorage.setItem(GROCERY_LIST_KEY, JSON.stringify(items));
}

// Selected recipe (for passing from search → planner)
export function setSelectedRecipe(recipe) {
    localStorage.setItem(SELECTED_RECIPE_KEY, JSON.stringify(recipe));
}

export function getSelectedRecipe() {
    return safeParse(localStorage.getItem(SELECTED_RECIPE_KEY), null);
}

export function clearSelectedRecipe() {
    localStorage.removeItem(SELECTED_RECIPE_KEY);
}