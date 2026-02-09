export function saveMealPlan(plan) {
    localStorage.setItem("mealPlan", JSON.stringify(plan));
}

export function loadMealPlan() {
    return JSON.parse(localStorage.getItem("mealPlan")) || null;
}

export function saveGroceryList(list) {
    localStorage.setItem("groceryList", JSON.stringify(list));
}

export function loadGroceryList() {
    return JSON.parse(localStorage.getItem("groceryList")) || [];
}