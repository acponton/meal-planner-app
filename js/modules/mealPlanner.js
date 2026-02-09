export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Create an empty plan object
export function createEmptyMealPlan() {
    return days.reduce((plan, day) => {
        plan[day] = null;
        return plan;
    }, {});
}

// Load saved plan from localStorage
export function loadMealPlan() {
    const saved = localStorage.getItem("mealPlan");
    return saved ? JSON.parse(saved) : null;
}

// Save plan to localStorage
export function saveMealPlan(plan) {
    localStorage.setItem("mealPlan", JSON.stringify(plan));
}

// Initialize meal plan
let mealPlan = loadMealPlan() || createEmptyMealPlan();

// Return the current plan
export function getMealPlan() {
    return mealPlan;
}

// Assign a recipe to a day
export function setMealForDay(day, recipe) {
    mealPlan[day] = recipe;
    saveMealPlan(mealPlan);
}

// Temporary selected recipe (used when clicking “Add to Meal Plan”)
let selectedRecipe = null;

export function setSelectedRecipe(recipe) {
    selectedRecipe = recipe;
}

export function getSelectedRecipe() {
    return selectedRecipe;
}