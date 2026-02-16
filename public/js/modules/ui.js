import { $ } from "../utils/helpers.js";

export function setActiveNav(linkId) {
    const links = document.querySelectorAll("nav a");
    links.forEach(link => link.classList.remove("active"));

    const active = document.getElementById(linkId);
    if (active) active.classList.add("active");
}

export function renderLoading(container, isLoading) {
    if (!container) return;
    container.classList.toggle("is-loading", isLoading);
}

export function renderEmptyState(container, message) {
    if (!container) return;
    container.innerHTML = `<p class="empty-state">${message}</p>`;
}

export function createRecipeCard(recipe, { showAddButton = false } = {}) {
    const div = document.createElement("div");
    div.className = "recipe-card";
    div.dataset.id = recipe.id || recipe.idMeal || "";

    const title = recipe.title || recipe.strMeal || "Untitled";
    const image = recipe.image || recipe.strMealThumb || "";

    div.innerHTML = `
        <img src="${image}" alt="${title}">
        <h3>${title}</h3>
        ${showAddButton ? `<button class="btn add-to-planner">Add to Planner</button>` : ""}
    `;

    return div;
}

export function getDayOptions() {
    return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
}