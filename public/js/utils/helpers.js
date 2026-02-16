import { showToast } from "./toast.js";

export function $(selector, scope = document) {
    return scope.querySelector(selector);
}

export function $all(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
}

export function on(event, selector, handler) {
    document.addEventListener(event, e => {
        if (e.target.matches(selector) || e.target.closest(selector)) {
            handler(e);
        }
    });
}

export function formatCalories(calories) {
    if (!calories) return "";
    return `${Math.round(calories)} kcal`;
}

export { showToast };