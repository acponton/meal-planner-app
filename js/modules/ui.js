import { days, getMealPlan } from "./mealPlanner.js";

// ------------------
// MEAL PLANNER GRID
// ------------------
export function renderMealPlanner() {
    const app = document.getElementById("app");
    const plan = getMealPlan();

    app.innerHTML = `
        <h2>Weekly Meal Planner</h2>
        <div class="planner-grid">
            ${days.map(day => `
                <div class="day">
                    <h3>${day}</h3>
                    <div class="meal-slot" data-day="${day}">
                        ${plan[day] ? plan[day].title : "Add meal"}
                    </div>
                </div>
            `).join("")}
        </div>
    `;

}

// ------------------
// SEARCH PAGE RESULTS
// ------------------
export function renderSearchResults(recipes) {
    const container = document.getElementById("results");

    container.innerHTML = recipes.map(r => `
        <div class="recipe-card" data-id="${r.id}">
            <img src="${r.image}" alt="${r.title}">
            <p>${r.title}</p>
            <button class="add-to-plan" data-id="${r.id}">Add to Meal Plan</button>
        </div>
    `).join("");
}
