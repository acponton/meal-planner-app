import { renderMealPlanner } from "./js/modules/ui.js";
import { initEvents } from "./js/modules/events.js";

document.addEventListener("DOMContentLoaded", () => {
  initEvents();

  // Only render the planner on planner.html or index.html
  if (document.getElementById("app")) {
    renderMealPlanner();
  }
});