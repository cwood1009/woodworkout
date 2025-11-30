// plan.js

// Single source of truth for the weekly day-by-day info
const weekPlan = [
  {
    name: "Monday",
    breakfast: { label: "B1 – Banana Protein Shake", anchor: "#b1" },
    lunch: { label: "L1 – Turkey Enchilada Skillet Bowl", anchor: "#l1" },
    dinner: { label: "Teriyaki Salmon + Veggie Stir Fry", anchor: "#d-salmon" },
    snacks: "Protein bar; hummus + veggies (as needed)",
    am: "Lower body + treadmill: 5 min easy walk, 15 min lower strength, 10 min brisk walk/jog.",
    pm: "Optional core finisher (10–15 min)."
  },
  {
    name: "Tuesday",
    breakfast: { label: "B2 – Warm Protein Oats", anchor: "#b2" },
    lunch: { label: "L2 – Mediterranean Lentil Bowl", anchor: "#l2" },
    dinner: { label: "Turkey Meatballs + Marinara + Roasted Veg", anchor: "#d-meatballs" },
    snacks: "Yogurt; apple + nut butter",
    am: "Upper body + treadmill: 5 min walk, 15 min upper strength, 10 min moderate treadmill.",
    pm: "Optional 10–15 min easy walk or mobility."
  },
  {
    name: "Wednesday",
    breakfast: { label: "B1 – Banana Protein Shake", anchor: "#b1" },
    lunch: { label: "L1 – Turkey Enchilada Skillet Bowl", anchor: "#l1" },
    dinner: { label: "Fast Taco Night (lean ground beef, lettuce/tortillas, salsa)", anchor: "#d-tacos" },
    snacks: "Protein bar; hummus + veggies",
    am: "Full body + short core (30 min total).",
    pm: "Rest (busy night)."
  },
  {
    name: "Thursday",
    breakfast: { label: "B2 – Warm Protein Oats", anchor: "#b2" },
    lunch: { label: "L2 – Mediterranean Lentil Bowl", anchor: "#l2" },
    dinner: { label: "Greek Turkey Bowls", anchor: "#d-greek-bowl" },
    snacks: "Yogurt; apple + nut butter",
    am: "Lower body + treadmill intervals.",
    pm: "Optional core (10–15 min)."
  },
  {
    name: "Friday",
    breakfast: { label: "B1 – Banana Protein Shake", anchor: "#b1" },
    lunch: { label: "L1 – Turkey Enchilada Skillet Bowl", anchor: "#l1" },
    dinner: { label: "Sheet Pan Shrimp Fajitas", anchor: "#d-fajitas" },
    snacks: "Protein bar; hummus + veggies",
    am: "Upper body + light treadmill.",
    pm: "Rest (busy night)."
  },
  {
    name: "Saturday",
    breakfast: { label: "B3 – Greek Yogurt Power Bowl", anchor: "#b3" },
    lunch: { label: "L2 – Mediterranean Lentil Bowl", anchor: "#l2" },
    dinner: { label: "Mini Personal Flatbreads", anchor: "#d-flatbreads" },
    snacks: "Flexible from snack list.",
    am: "Treadmill intervals + longer core (about 30 min).",
    pm: "Optional family walk."
  },
  {
    name: "Sunday",
    breakfast: { label: "B2 – Warm Protein Oats", anchor: "#b2" },
    lunch: { label: "L1 – Turkey Enchilada Skillet Bowl (or L2 if preferred)", anchor: "#l1" },
    dinner: { label: "Chili + Side Salad", anchor: "#d-chili" },
    snacks: "Light; keep room for chili.",
    am: "20–30 min easy walk + 10 min light core/mobility.",
    pm: "Rest + meal prep."
  }
];

let currentDayIndex = 0;

function getTodayIndex() {
  // JS Date: 0=Sunday, 1=Monday, ...
  const jsDay = new Date().getDay();
  // Map: Mon=0,...Sun=6
  const map = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
  return map[jsDay] ?? 0;
}

function renderMobileDay() {
  const day = weekPlan[currentDayIndex];
  const titleEl = document.getElementById("mobileDayTitle");
  const contentEl = document.getElementById("mobileDayContent");
  if (!day || !titleEl || !contentEl) return;

  const linkOrText = (item) => {
    if (!item) return "";
    if (typeof item === "string") return item;
    if (item.anchor) {
      return `${item.label} <br><a href="${item.anchor}">View details</a>`;
    }
    return item.label || "";
  };

  titleEl.textContent = day.name;

  contentEl.innerHTML = `
    <details open>
      <summary>Breakfast</summary>
      <p>${linkOrText(day.breakfast)}</p>
    </details>
    <details>
      <summary>Lunch</summary>
      <p>${linkOrText(day.lunch)}</p>
    </details>
    <details>
      <summary>Dinner</summary>
      <p>${linkOrText(day.dinner)}</p>
    </details>
    <details>
      <summary>Snacks</summary>
      <p>${day.snacks}</p>
    </details>
    <details>
      <summary>AM Workout</summary>
      <p>${day.am} <br><a href="#workouts">See workout plan</a></p>
    </details>
    <details>
      <summary>PM / Extra</summary>
      <p>${day.pm} <br><a href="#workouts">See workout plan</a></p>
    </details>
  `;
}

function highlightTodayColumn() {
  const table = document.getElementById("desktopCalendar");
  if (!table) return;

  const today = getTodayIndex();
  const colIndex = today + 1; // first column = "Item"

  const thead = table.tHead;
  if (thead && thead.rows[0] && thead.rows[0].cells[colIndex]) {
    thead.rows[0].cells[colIndex].classList.add("today-header");
  }

  const rows = table.tBodies[0]?.rows || [];
  for (let r = 0; r < rows.length; r++) {
    const cell = rows[r].cells[colIndex];
    if (cell) {
      cell.classList.add("today-col");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Initial day = today
  currentDayIndex = getTodayIndex();
  renderMobileDay();
  highlightTodayColumn();

  const prevBtn = document.getElementById("prevDayBtn");
  const nextBtn = document.getElementById("nextDayBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      currentDayIndex = (currentDayIndex - 1 + weekPlan.length) % weekPlan.length;
      renderMobileDay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      currentDayIndex = (currentDayIndex + 1) % weekPlan.length;
      renderMobileDay();
    });
  }
});
