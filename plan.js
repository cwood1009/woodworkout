// plan.js

// Weekly plan with separate tracks for Jill and Chris
const weekPlan = [
  {
    name: "Monday",
    jill: {
      breakfast: { label: "B1 – Banana Protein Shake", anchor: "#b1" },
      lunch: { label: "L1 – Turkey Enchilada Skillet Bowl", anchor: "#l1" },
      dinner: { label: "Teriyaki Salmon + Veggie Stir Fry", anchor: "#d-salmon" },
      snacks: "Protein bar; hummus + veggies (as needed)",
      am: "Lower body + treadmill: 5 min easy walk, 15 min lower strength, 10 min brisk walk/jog.",
      pm: "Optional core finisher (10–15 min)."
    },
    chris: {
      breakfast: { label: "B1 – Banana Protein Shake", anchor: "#b1" },
      lunch: { label: "L1 – Turkey Enchilada Skillet Bowl", anchor: "#l1" },
      dinner: { label: "Teriyaki Salmon + Veggie Stir Fry", anchor: "#d-salmon" },
      snacks: "Protein bar; hummus + veggies (as needed)",
      am: "Lower body + treadmill: 5 min easy walk, 15 min lower strength, 10 min brisk walk/jog.",
      pm: "Optional core finisher (10–15 min)."
    }
  },
  {
    name: "Tuesday",
    jill: {
      breakfast: { label: "B2 – Warm Protein Oats", anchor: "#b2" },
      lunch: { label: "L2 – Mediterranean Lentil Bowl", anchor: "#l2" },
      dinner: { label: "Turkey Meatballs + Marinara + Roasted Veg", anchor: "#d-meatballs" },
      snacks: "Yogurt; apple + nut butter",
      am: "Upper body + treadmill: 5 min walk, 15 min upper strength, 10 min moderate treadmill.",
      pm: "Optional 10–15 min easy walk or mobility."
    },
    chris: {
      breakfast: { label: "B2 – Warm Protein Oats", anchor: "#b2" },
      lunch: { label: "L2 – Mediterranean Lentil Bowl", anchor: "#l2" },
      dinner: { label: "Turkey Meatballs + Marinara + Roasted Veg", anchor: "#d-meatballs" },
      snacks: "Yogurt; apple + nut butter",
      am: "Upper body + treadmill: 5 min walk, 15 min upper strength, 10 min moderate treadmill.",
      pm: "Optional 10–15 min easy walk or mobility."
    }
  },
  {
    name: "Wednesday",
    jill: {
      breakfast: { label: "B1 – Banana Protein Shake", anchor: "#b1" },
      lunch: { label: "L1 – Turkey Enchilada Skillet Bowl", anchor: "#l1" },
      dinner: { label: "Fast Taco Night (lean ground beef, lettuce/tortillas, salsa)", anchor: "#d-tacos" },
      snacks: "Protein bar; hummus + veggies",
      am: "Full body + short core (30 min total).",
      pm: "Rest (busy night)."
    },
    chris: {
      breakfast: { label: "B1 – Banana Protein Shake", anchor: "#b1" },
      lunch: { label: "L1 – Turkey Enchilada Skillet Bowl", anchor: "#l1" },
      dinner: { label: "Fast Taco Night (lean ground beef, lettuce/tortillas, salsa)", anchor: "#d-tacos" },
      snacks: "Protein bar; hummus + veggies",
      am: "Full body + short core (30 min total).",
      pm: "Rest (busy night)."
    }
  },
  {
    name: "Thursday",
    jill: {
      breakfast: { label: "B2 – Warm Protein Oats", anchor: "#b2" },
      lunch: { label: "L2 – Mediterranean Lentil Bowl", anchor: "#l2" },
      dinner: { label: "Greek Turkey Bowls", anchor: "#d-greek-bowl" },
      snacks: "Yogurt; apple + nut butter",
      am: "Lower body + treadmill intervals.",
      pm: "Optional core (10–15 min)."
    },
    chris: {
      breakfast: { label: "B2 – Warm Protein Oats", anchor: "#b2" },
      lunch: { label: "L2 – Mediterranean Lentil Bowl", anchor: "#l2" },
      dinner: { label: "Greek Turkey Bowls", anchor: "#d-greek-bowl" },
      snacks: "Yogurt; apple + nut butter",
      am: "Lower body + treadmill intervals.",
      pm: "Optional core (10–15 min)."
    }
  },
  {
    name: "Friday",
    jill: {
      breakfast: { label: "B1 – Banana Protein Shake", anchor: "#b1" },
      lunch: { label: "L1 – Turkey Enchilada Skillet Bowl", anchor: "#l1" },
      dinner: { label: "Sheet Pan Shrimp Fajitas", anchor: "#d-fajitas" },
      snacks: "Protein bar; hummus + veggies",
      am: "Upper body + light treadmill.",
      pm: "Rest (busy night)."
    },
    chris: {
      breakfast: { label: "B1 – Banana Protein Shake", anchor: "#b1" },
      lunch: { label: "L1 – Turkey Enchilada Skillet Bowl", anchor: "#l1" },
      dinner: { label: "Sheet Pan Shrimp Fajitas", anchor: "#d-fajitas" },
      snacks: "Protein bar; hummus + veggies",
      am: "Upper body + light treadmill.",
      pm: "Rest (busy night)."
    }
  },
  {
    name: "Saturday",
    jill: {
      breakfast: { label: "B3 – Greek Yogurt Power Bowl", anchor: "#b3" },
      lunch: { label: "L2 – Mediterranean Lentil Bowl", anchor: "#l2" },
      dinner: { label: "Mini Personal Flatbreads", anchor: "#d-flatbreads" },
      snacks: "Flexible from snack list.",
      am: "Treadmill intervals + longer core (about 30 min).",
      pm: "Optional family walk."
    },
    chris: {
      breakfast: { label: "B3 – Greek Yogurt Power Bowl", anchor: "#b3" },
      lunch: { label: "L2 – Mediterranean Lentil Bowl", anchor: "#l2" },
      dinner: { label: "Mini Personal Flatbreads", anchor: "#d-flatbreads" },
      snacks: "Flexible from snack list.",
      am: "Treadmill intervals + longer core (about 30 min).",
      pm: "Optional family walk."
    }
  },
  {
    name: "Sunday",
    jill: {
      breakfast: { label: "B2 – Warm Protein Oats", anchor: "#b2" },
      lunch: { label: "L1 – Turkey Enchilada Skillet Bowl (or L2 if preferred)", anchor: "#l1" },
      dinner: { label: "Chili + Side Salad", anchor: "#d-chili" },
      snacks: "Light; keep room for chili.",
      am: "20–30 min easy walk + 10 min light core/mobility.",
      pm: "Rest + meal prep."
    },
    chris: {
      breakfast: { label: "B2 – Warm Protein Oats", anchor: "#b2" },
      lunch: { label: "L1 – Turkey Enchilada Skillet Bowl (or L2 if preferred)", anchor: "#l1" },
      dinner: { label: "Chili + Side Salad", anchor: "#d-chili" },
      snacks: "Light; keep room for chili.",
      am: "20–30 min easy walk + 10 min light core/mobility.",
      pm: "Rest + meal prep."
    }
  }
];

let currentDayIndex = 0;
let currentPerson = "jill"; // "jill" or "chris"

function getTodayIndex() {
  // JS Date: 0=Sunday, 1=Monday, ...
  const jsDay = new Date().getDay();
  // Map: Mon=0,...Sun=6
  const map = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
  return map[jsDay] ?? 0;
}

function renderMobileDay() {
  const day = weekPlan[currentDayIndex];
  const personData = day[currentPerson];
  const titleEl = document.getElementById("mobileDayTitle");
  const contentEl = document.getElementById("mobileDayContent");
  if (!day || !personData || !titleEl || !contentEl) return;

  const linkOrText = (item) => {
    if (!item) return "";
    if (typeof item === "string") return item;
    if (item.anchor) {
      return `${item.label} <br><a href="${item.anchor}">View details</a>`;
    }
    return item.label || "";
  };

  titleEl.textContent = `${day.name} – ${currentPerson === "jill" ? "Jill" : "Chris"}`;

  contentEl.innerHTML = `
    <details open>
      <summary>Breakfast</summary>
      <p>${linkOrText(personData.breakfast)}</p>
    </details>
    <details>
      <summary>Lunch</summary>
      <p>${linkOrText(personData.lunch)}</p>
    </details>
    <details>
      <summary>Dinner</summary>
      <p>${linkOrText(personData.dinner)}</p>
    </details>
    <details>
      <summary>Snacks</summary>
      <p>${personData.snacks}</p>
    </details>
    <details>
      <summary>AM Workout</summary>
      <p>${personData.am} <br><a href="#workouts">See workout plan</a></p>
    </details>
    <details>
      <summary>PM / Extra</summary>
      <p>${personData.pm} <br><a href="#workouts">See workout plan</a></p>
    </details>
  `;
}

function renderDesktopCalendar() {
  const tbody = document.getElementById("desktopCalendarBody");
  if (!tbody) return;

  const rowsConfig = [
    { label: "Breakfast – Jill", person: "jill", field: "breakfast", link: true },
    { label: "Breakfast – Chris", person: "chris", field: "breakfast", link: true },
    { label: "Lunch – Jill", person: "jill", field: "lunch", link: true },
    { label: "Lunch – Chris", person: "chris", field: "lunch", link: true },
    { label: "Dinner – Jill", person: "jill", field: "dinner", link: true },
    { label: "Dinner – Chris", person: "chris", field: "dinner", link: true },
    { label: "Snacks – Jill", person: "jill", field: "snacks", link: false },
    { label: "Snacks – Chris", person: "chris", field: "snacks", link: false },
    { label: "AM Workout – Jill", person: "jill", field: "am", link: false },
    { label: "AM Workout – Chris", person: "chris", field: "am", link: false },
    { label: "PM / Extra – Jill", person: "jill", field: "pm", link: false },
    { label: "PM / Extra – Chris", person: "chris", field: "pm", link: false }
  ];

  const linkOrText = (item, link) => {
    if (!item) return "";
    if (!link) return typeof item === "string" ? item : (item.label || "");
    if (typeof item === "string") return item;
    if (item.anchor) {
      return `<a href="${item.anchor}">${item.label}</a>`;
    }
    return item.label || "";
  };

  tbody.innerHTML = "";

  rowsConfig.forEach(rowCfg => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.className = "sticky-col";
    th.textContent = rowCfg.label;
    tr.appendChild(th);

    weekPlan.forEach(day => {
      const td = document.createElement("td");
      const personData = day[rowCfg.person];
      const value = personData ? personData[rowCfg.field] : "";
      td.innerHTML = linkOrText(value, rowCfg.link);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Initial day = today
  currentDayIndex = getTodayIndex();
  renderDesktopCalendar();
  renderMobileDay();

  const prevBtn = document.getElementById("prevDayBtn");
  const nextBtn = document.getElementById("nextDayBtn");
  const personJillBtn = document.getElementById("personJill");
  const personChrisBtn = document.getElementById("personChris");

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

  if (personJillBtn && personChrisBtn) {
    personJillBtn.addEventListener("click", function () {
      currentPerson = "jill";
      personJillBtn.classList.add("active");
      personChrisBtn.classList.remove("active");
      renderMobileDay();
    });
    personChrisBtn.addEventListener("click", function () {
      currentPerson = "chris";
      personChrisBtn.classList.add("active");
      personJillBtn.classList.remove("active");
      renderMobileDay();
    });
  }
});
