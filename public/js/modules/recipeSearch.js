import { searchRecipes, searchMealDB, getRecipeDetails, getMealDBDetails } from "./api.js";
import { setSelectedRecipe } from "./storage.js";
import { $, $all, on, showToast } from "../utils/helpers.js";
import { createRecipeCard, renderLoading, renderEmptyState, setActiveNav } from "./ui.js";

const form = $("#search-form");
const input = $("#search-input");
const resultsContainer = $("#results");

const modal = $("#recipe-modal");
const modalBody = $("#modal-body");
const modalClose = $(".modal-close");

setActiveNav("nav-recipes");

// -----------------------------------------------------------
// SEARCH HANDLER
// -----------------------------------------------------------
async function handleSearch(e) {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) {
        showToast("Please enter a search term", "error");
        return;
    }

    renderLoading(resultsContainer, true);
    resultsContainer.innerHTML = "";

    try {
        const [spoonacular, mealdb] = await Promise.all([
            searchRecipes(query),
            searchMealDB(query)
        ]);

        const combined = [];

        if (spoonacular?.results?.length) {
            spoonacular.results.forEach(r => {
                combined.push({
                    id: r.id,
                    title: r.title,
                    image: r.image,
                    source: "spoonacular"
                });
            });
        }

        if (mealdb?.meals?.length) {
            mealdb.meals.forEach(m => {
                combined.push({
                    id: m.idMeal,
                    title: m.strMeal,
                    image: m.strMealThumb,
                    source: "mealdb"
                });
            });
        }

        if (!combined.length) {
            renderEmptyState(resultsContainer, "No results found. Try another search.");
            return;
        }

        combined.forEach(recipe => {
            const card = createRecipeCard(recipe, { showAddButton: true });
            card.dataset.id = recipe.id;
            card.dataset.source = recipe.source;
            resultsContainer.appendChild(card);
        });
    } catch (err) {
        console.error(err);
        renderEmptyState(resultsContainer, "Something went wrong while searching.");
        showToast("Error fetching recipes", "error");
    } finally {
        renderLoading(resultsContainer, false);
    }
}

form?.addEventListener("submit", handleSearch);

// -----------------------------------------------------------
// MODAL OPEN / CLOSE
// -----------------------------------------------------------
function openModal() {
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

modalClose?.addEventListener("click", closeModal);

modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
});

// -----------------------------------------------------------
// FETCH FULL DETAILS + RENDER MODAL
// -----------------------------------------------------------
async function loadRecipeDetails(id, source) {
    let details;

    if (source === "spoonacular") {
        details = await getRecipeDetails(id);
        return {
            title: details.title,
            image: details.image,
            ingredients: details.extendedIngredients?.map(i => i.original) || [],
            instructions: details.instructions || "No instructions available."
        };
    }

    if (source === "mealdb") {
        const data = await getMealDBDetails(id);
        const meal = data?.meals?.[0];

        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ing = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ing && ing.trim()) {
                ingredients.push(`${measure} ${ing}`.trim());
            }
        }

        return {
            title: meal.strMeal,
            image: meal.strMealThumb,
            ingredients,
            instructions: meal.strInstructions || "No instructions available."
        };
    }
}

// -----------------------------------------------------------
// CLICK HANDLERS
// -----------------------------------------------------------

// Open modal when clicking recipe image/title
on("click", ".recipe-card img, .recipe-card h3", async e => {
    const card = e.target.closest(".recipe-card");
    const id = card.dataset.id;
    const source = card.dataset.source;

    const details = await loadRecipeDetails(id, source);

    modalBody.innerHTML = `
        <img src="${details.image}" alt="${details.title}">
        <h2>${details.title}</h2>

        <h3>Ingredients</h3>
        <ul>
            ${details.ingredients.map(i => `<li>${i}</li>`).join("")}
        </ul>

        <h3>Instructions</h3>
        <p>${details.instructions}</p>

        <button class="btn add-to-planner-modal">Add to Planner</button>
    `;

    openModal();
});

// Add to planner from modal
on("click", ".add-to-planner-modal", () => {
    const title = modalBody.querySelector("h2").textContent;
    const image = modalBody.querySelector("img").src;

    const recipe = {
        id: Date.now(), // unique fallback
        title,
        image,
        source: "details"
    };

    setSelectedRecipe(recipe);
    showToast("Recipe saved. Go to Planner to assign a day.", "success");
    closeModal();
});

// Add to planner from card button
on("click", ".add-to-planner", e => {
    const card = e.target.closest(".recipe-card");
    const id = card.dataset.id;
    const source = card.dataset.source;
    const title = card.querySelector("h3")?.textContent || "";
    const image = card.querySelector("img")?.src || "";

    const recipe = { id, title, image, source };

    setSelectedRecipe(recipe);
    showToast("Recipe saved. Go to Planner to assign a day.", "success");
});