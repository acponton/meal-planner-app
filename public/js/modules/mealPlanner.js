import { getMealPlans, saveMealPlans, getSelectedRecipe, clearSelectedRecipe } from "./storage.js";
import { $, $all, on, showToast } from "../utils/helpers.js";
import { getDayOptions, setActiveNav } from "./ui.js";

const plannerContainer = $("#planner");
const selectedRecipeContainer = $("#selected-recipe");

setActiveNav("nav-planner");

let mealPlans = getMealPlans();

function renderPlanner() {
    plannerContainer.innerHTML = "";
    const days = getDayOptions();

    days.forEach(day => {
        const dayMeals = mealPlans[day] || [];
        const section = document.createElement("section");
        section.className = "day-card";
        section.dataset.day = day;

        section.innerHTML = `
            <header>
                <h2>${day}</h2>
                <button class="btn btn-small clear-day">Clear</button>
            </header>
            <ul class="meal-list">
                ${dayMeals.map((meal, index) => `
                    <li data-index="${index}">
                        <span>${meal.title}</span>
                        <button class="btn btn-small remove-meal">×</button>
                    </li>
                `).join("")}
            </ul>
            <button class="btn add-from-selected">Add Selected Recipe</button>
        `;

        plannerContainer.appendChild(section);
    });
}

function renderSelectedRecipe() {
    const recipe = getSelectedRecipe();
    if (!recipe) {
        selectedRecipeContainer.innerHTML = `<p>No recipe selected. Go to Recipes and click "Add to Planner".</p>`;
        return;
    }

    selectedRecipeContainer.innerHTML = `
        <div class="selected-card">
            <img src="${recipe.image}" alt="${recipe.title}">
            <div>
                <h3>${recipe.title}</h3>
                <p>Source: ${recipe.source}</p>
                <button class="btn clear-selected">Clear Selected</button>
            </div>
        </div>
    `;
}

function addSelectedToDay(day) {
    const recipe = getSelectedRecipe();
    if (!recipe) {
        showToast("No selected recipe to add.", "error");
        return;
    }

    if (!mealPlans[day]) mealPlans[day] = [];
    mealPlans[day].push(recipe);
    saveMealPlans(mealPlans);
    renderPlanner();
    showToast(`Added to ${day}`, "success");
}

function removeMeal(day, index) {
    if (!mealPlans[day]) return;
    mealPlans[day].splice(index, 1);
    saveMealPlans(mealPlans);
    renderPlanner();
    showToast("Meal removed", "info");
}

function clearDay(day) {
    mealPlans[day] = [];
    saveMealPlans(mealPlans);
    renderPlanner();
    showToast(`${day} cleared`, "info");
}

renderPlanner();
renderSelectedRecipe();

on("click", ".add-from-selected", e => {
    const day = e.target.closest(".day-card")?.dataset.day;
    if (!day) return;
    addSelectedToDay(day);
});

on("click", ".remove-meal", e => {
    const li = e.target.closest("li");
    const day = e.target.closest(".day-card")?.dataset.day;
    if (!li || !day) return;
    const index = Number(li.dataset.index);
    removeMeal(day, index);
});

on("click", ".clear-day", e => {
    const day = e.target.closest(".day-card")?.dataset.day;
    if (!day) return;
    clearDay(day);
});

on("click", ".clear-selected", () => {
    clearSelectedRecipe();
    renderSelectedRecipe();
    showToast("Selected recipe cleared", "info");
});