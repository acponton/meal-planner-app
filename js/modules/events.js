import { handleRecipeSearch } from "./recipeSearch.js";

export function initEvents() {
    document.addEventListener("submit", async e => {
        if (e.target.matches("#recipe-search-form")) {
            e.preventDefault();
            const term = e.target.querySelector("input").value;
            handleRecipeSearch(term);
        }
    });

    document.addEventListener("click", e => {
        if (e.target.classList.contains("meal-slot")) {
            console.log("Clicked day:", e.target.dataset.day);
        }
    });
}