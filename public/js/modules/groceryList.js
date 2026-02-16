import { getGroceryList, saveGroceryList } from "./storage.js";
import { $, on, showToast } from "../utils/helpers.js";
import { setActiveNav } from "./ui.js";

const listContainer = $("#grocery-list");
const form = $("#grocery-form");
const input = $("#grocery-input");

setActiveNav("nav-grocery");

let items = getGroceryList();

function renderList() {
    if (!items.length) {
        listContainer.innerHTML = `<p class="empty-state">No items yet. Add ingredients or items you need.</p>`;
        return;
    }

    listContainer.innerHTML = items.map((item, index) => `
        <li data-index="${index}">
            <label>
                <input type="checkbox" ${item.done ? "checked" : ""}>
                <span class="${item.done ? "done" : ""}">${item.text}</span>
            </label>
            <button class="btn btn-small remove-item">×</button>
        </li>
    `).join("");
}

function addItem(text) {
    items.push({ text, done: false });
    saveGroceryList(items);
    renderList();
    showToast("Item added", "success");
}

function toggleItem(index) {
    items[index].done = !items[index].done;
    saveGroceryList(items);
    renderList();
}

function removeItem(index) {
    items.splice(index, 1);
    saveGroceryList(items);
    renderList();
    showToast("Item removed", "info");
}

form?.addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) {
        showToast("Enter an item first", "error");
        return;
    }
    addItem(text);
    input.value = "";
});

on("change", "#grocery-list input[type='checkbox']", e => {
    const li = e.target.closest("li");
    if (!li) return;
    const index = Number(li.dataset.index);
    toggleItem(index);
});

on("click", ".remove-item", e => {
    const li = e.target.closest("li");
    if (!li) return;
    const index = Number(li.dataset.index);
    removeItem(index);
});

renderList();