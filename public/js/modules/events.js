import { showToast } from "../utils/helpers.js";
import { setActiveNav } from "./ui.js";
import { getMealPlans, getGroceryList } from "./storage.js";

setActiveNav("nav-admin");

const logContainer = document.getElementById("event-log");

// -----------------------------
// EVENT LOGGING
// -----------------------------
function log(message) {
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement("li");
    entry.textContent = `[${time}] ${message}`;
    logContainer?.appendChild(entry);
}

document.addEventListener("mealAdded", e => {
    log(`Meal added to ${e.detail.day}: ${e.detail.meal.title}`);
    updateAnalytics();
});

document.addEventListener("mealRemoved", e => {
    log(`Meal removed from ${e.detail.day}`);
    updateAnalytics();
});

document.addEventListener("groceryItemAdded", e => {
    log(`Grocery item added: ${e.detail.text}`);
    updateAnalytics();
});

document.addEventListener("groceryItemRemoved", e => {
    log(`Grocery item removed: ${e.detail.text}`);
    updateAnalytics();
});

// -----------------------------
// ANALYTICS
// -----------------------------
function updateAnalytics() {
    const mealPlans = getMealPlans();
    const grocery = getGroceryList();

    // Total meals planned
    const totalMeals = Object.values(mealPlans)
        .reduce((sum, dayMeals) => sum + dayMeals.length, 0);

    // Unique recipes
    const uniqueRecipes = new Set(
        Object.values(mealPlans)
            .flat()
            .map(meal => meal.title)
    ).size;

    // Grocery stats
    const totalGrocery = grocery.length;
    const groceryDone = grocery.filter(i => i.done).length;

    // Update UI
    document.getElementById("stat-total-meals").textContent = totalMeals;
    document.getElementById("stat-unique-recipes").textContent = uniqueRecipes;
    document.getElementById("stat-total-grocery").textContent = totalGrocery;
    document.getElementById("stat-grocery-done").textContent = groceryDone;
}

// Initialize analytics on page load
updateAnalytics();

showToast("Admin dashboard loaded", "info");