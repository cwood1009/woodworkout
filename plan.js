// // plan.js

// let appData = null;
// let groceryTextData = "";
// let currentDayIndex = 0;

// document.addEventListener("DOMContentLoaded", () => {
//   // Load data.json (weekPlan + groceryItems)
//   fetch("data.json")
//     .then((res) => {
//       if (!res.ok) throw new Error("Failed to load data.json");
//       return res.json();
//     })
//     .then((data) => {
//       appData = data;
//       renderDesktopCalendar();
//       renderMobileDay(0); // Monday
//       renderGroceryList();
//       renderRecipes();
//     })
//     .catch((err) => {
//       console.error(err);
//       const calendar = document.getElementById("desktopCalendar");
//       if (calendar) {
//         calendar.insertAdjacentHTML(
//           "afterend",
//           `<p style="color:#fca5a5;">Error loading data.json. Check path or host via HTTP (not file://).</p>`
//         );
//       }
//     });

//   // Hook up mobile day navigation
//   const prevBtn = document.getElementById("prevDayBtn");
//   const nextBtn = document.getElementById("nextDayBtn");

//   if (prevBtn) {
//     prevBtn.addEventListener("click", () => {
//       if (!appData) return;
//       const len = appData.weekPlan.length;
//       currentDayIndex = (currentDayIndex - 1 + len) % len;
//       renderMobileDay(currentDayIndex);
//     });
//   }

//   if (nextBtn) {
//     nextBtn.addEventListener("click", () => {
//       if (!appData) return;
//       const len = appData.weekPlan.length;
//       currentDayIndex = (currentDayIndex + 1) % len;
//       renderMobileDay(currentDayIndex);
//     });
//   }

//   // Expose copy/download for inline onclick handlers
//   window.copyGroceryList = copyGroceryList;
//   window.downloadGroceryList = downloadGroceryList;
// });

// // ---------- Desktop calendar ----------
// function renderRecipes() {
//   if (!appData || !appData.recipes) return;
//   const r = appData.recipes;

//   // Breakfasts
//   const bTplEl = document.getElementById("breakfast-template");
//   const bListEl = document.getElementById("breakfastList");
//   if (bTplEl && bListEl && r.breakfasts) {
//     bListEl.innerHTML = Mustache.render(bTplEl.innerHTML, {
//       breakfasts: r.breakfasts
//     });
//   }

//   // Lunches
//   const lTplEl = document.getElementById("lunch-template");
//   const lListEl = document.getElementById("lunchList");
//   if (lTplEl && lListEl && r.lunches) {
//     lListEl.innerHTML = Mustache.render(lTplEl.innerHTML, {
//       lunches: r.lunches
//     });
//   }

//   // Dinners
//   const dTplEl = document.getElementById("dinner-template");
//   const dListEl = document.getElementById("dinnerList");
//   if (dTplEl && dListEl && r.dinners) {
//     dListEl.innerHTML = Mustache.render(dTplEl.innerHTML, {
//       dinners: r.dinners
//     });
//   }

//     // Snacks
//     const sTplEl = document.getElementById("snacks-template");
//     const sListEl = document.getElementById("snacksList");
//     if (sTplEl && sListEl && r.snacks) {
//     sListEl.innerHTML = Mustache.render(sTplEl.innerHTML, r.snacks);
//     }

// }

// function renderDesktopCalendar() {
//   if (!appData) return;
//   const weekPlan = appData.weekPlan;

//   const headTpl = document.getElementById(
//     "desktop-calendar-head-template"
//   ).innerHTML;
//   const bodyTpl = document.getElementById(
//     "desktop-calendar-body-template"
//   ).innerHTML;

//   const headHtml = Mustache.render(headTpl, {
//     days: weekPlan.map((d) => ({ name: d.name })),
//   });

//   const rows = [
//     {
//       label: "Breakfast",
//       cells: weekPlan.map(
//         (d) =>
//           `<a href="${d.breakfast.anchor}">${d.breakfast.label}</a>`
//       ),
//     },
//     {
//       label: "Lunch",
//       cells: weekPlan.map(
//         (d) => `<a href="${d.lunch.anchor}">${d.lunch.label}</a>`
//       ),
//     },
//     {
//       label: "Dinner",
//       cells: weekPlan.map(
//         (d) => `<a href="${d.dinner.anchor}">${d.dinner.label}</a>`
//       ),
//     },
//     {
//       label: "Snacks",
//       cells: weekPlan.map((d) => d.snacks || ""),
//     },
//     {
//       label: "AM Workout",
//       cells: weekPlan.map((d) => d.am || ""),
//     },
//     {
//       label: "PM / Extra",
//       cells: weekPlan.map((d) => d.pm || ""),
//     },
//   ];

//   const bodyHtml = Mustache.render(bodyTpl, { rows });

//   const table = document.getElementById("desktopCalendar");
//   if (!table) return;

//   const thead = table.querySelector("thead");
//   const tbody = table.querySelector("tbody");
//   if (thead) thead.innerHTML = headHtml;
//   if (tbody) tbody.innerHTML = bodyHtml;
// }

// // ---------- Mobile single-day view ----------

// function renderMobileDay(index) {
//   if (!appData) return;
//   const day = appData.weekPlan[index];
//   if (!day) return;

//   const tpl = document.getElementById("mobile-day-template").innerHTML;

//   const context = {
//     breakfast: `<a href="${day.breakfast.anchor}">${day.breakfast.label}</a>`,
//     lunch: `<a href="${day.lunch.anchor}">${day.lunch.label}</a>`,
//     dinner: `<a href="${day.dinner.anchor}">${day.dinner.label}</a>`,
//     snacks: day.snacks || "",
//     am: day.am || "",
//     pm: day.pm || "",
//   };

//   const html = Mustache.render(tpl, context);

//   const titleEl = document.getElementById("mobileDayTitle");
//   const contentEl = document.getElementById("mobileDayContent");

//   if (titleEl) titleEl.textContent = day.name;
//   if (contentEl) contentEl.innerHTML = html;
// }

// // ---------- Grocery list ----------

// function renderGroceryList() {
//   if (!appData) return;
//   const grocery = appData.groceryItems || {};
//   const lines = [];

//   Object.keys(grocery).forEach((category) => {
//     const items = grocery[category] || [];
//     if (!items.length) return;
//     lines.push(category + ":");
//     items.forEach((item) => {
//       lines.push("- " + item);
//     });
//     lines.push(""); // blank line between categories
//   });

//   groceryTextData = lines.join("\n").trim();

//   const pre = document.getElementById("groceryText");
//   if (pre) {
//     pre.textContent = groceryTextData;
//   }
// }

// // ---------- Copy / Download handlers ----------

// function copyGroceryList() {
//   const box = document.getElementById("groceryText");
//   if (!box) return;

//   const text = box.textContent || box.innerText || "";

//   // Modern API path
//   if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
//     navigator.clipboard.writeText(text)
//       .then(() => alert("Copied! Open Reminders and paste to create your grocery list."))
//       .catch(() => fallbackCopyText(text));
//   } else {
//     // Fallback for older / locked-down browsers
//     fallbackCopyText(text);
//   }
// }

// function fallbackCopyText(text) {
//   const textarea = document.createElement("textarea");
//   textarea.value = text;
//   textarea.style.position = "fixed";
//   textarea.style.top = "-9999px";
//   textarea.style.left = "-9999px";
//   document.body.appendChild(textarea);
//   textarea.focus();
//   textarea.select();
//   try {
//     document.execCommand("copy");
//     alert("Copied! Open Reminders and paste to create your grocery list.");
//   } catch (e) {
//     alert("Copy failed — you may need to select and copy manually.");
//   }
//   document.body.removeChild(textarea);
// }


// function downloadGroceryList() {
//   if (!groceryTextData) {
//     alert("Grocery list not ready yet. Try again in a second.");
//     return;
//   }

//   const blob = new Blob([groceryTextData], { type: "text/plain" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "grocery-list.txt";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// }

// // ----------------------------
// // GROCERY LIST GENERATOR
// // ----------------------------

// // (Simple static base list created from this week’s recipes)
// // If recipes change, you edit here only.
// const groceryItems = {
//   Produce: [
//     "10–12 bananas",
//     "3–4 cups berries",
//     "3 cucumbers",
//     "2 pints cherry tomatoes",
//     "6–8 bell peppers",
//     "5–6 onions",
//     "1–2 bulbs garlic",
//     "1 bunch cilantro (optional)",
//     "2–3 limes",
//     "2–3 lemons",
//     "Bag of shredded lettuce"
//   ],
//   "Meat / Seafood": [
//     "3 lbs lean ground turkey (L1)",
//     "1 lb lean ground beef (tacos)",
//     "2 salmon fillets (Mon dinner)",
//     "1 lb shrimp (Fri dinner)",
//     "Turkey meatballs (Tue dinner)",
//     "Turkey sausage or turkey pepperoni (flatbreads)"
//   ],
//   Dairy: [
//     "Light Mexican cheese (L1)",
//     "Feta (L2 optional)",
//     "Light mozzarella (flatbreads)",
//     "Greek yogurt (breakfast + snacks)",
//     "Tzatziki (Greek bowls)"
//   ],
//   Pantry: [
//     "Protein powder",
//     "Rolled oats",
//     "Rice (2–3 cups uncooked)",
//     "Black beans (2 cans)",
//     "Lentils (2 cups dry)",
//     "Fire-roasted tomatoes (1 can)",
//     "Enchilada sauce (1 can)",
//     "Marinara (1 jar)",
//     "Corn (frozen or canned)",
//     "Naan or lavash (flatbreads)",
//     "Taco seasoning",
//     "Chili seasoning",
//     "Olive oil",
//     "Salt, pepper, oregano, cumin, paprika"
//   ]
// };

// // Render grocery list into HTML
// function renderGroceryList() {
//   const box = document.getElementById("groceryText");
//   if (!box) return;

//   let text = "";
//   for (const [section, items] of Object.entries(groceryItems)) {
//     text += section + ":\n";
//     for (const item of items) text += "• " + item + "\n";
//     text += "\n";
//   }
//   box.textContent = text.trim();
// }

// // Copy to clipboard (works perfectly when pasted into Apple Reminders as checklist)
// function copyGroceryList() {
//   const box = document.getElementById("groceryText");
//   if (!box) return;

//   navigator.clipboard.writeText(box.textContent)
//     .then(() => alert("Copied! Open Reminders and paste to create your grocery list."))
//     .catch(() => alert("Copy failed — your browser may need permission."));
// }

// document.addEventListener("DOMContentLoaded", renderGroceryList);


// plan.js

let appData = null;
let groceryTextData = "";
let currentDayIndex = 0;
let currentWeekKey = "week1"; // "week1" or "week2"

document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load data.json");
      return res.json();
    })
    .then((data) => {
      appData = data;

      // Init week selector
      const weekSelector = document.getElementById("weekSelector");
      if (weekSelector) {
        weekSelector.value = "week1";
        weekSelector.addEventListener("change", (e) => {
          currentWeekKey = e.target.value || "week1";
          currentDayIndex = 0;
          renderAll();
        });
      }

      renderAll();
    })
    .catch((err) => {
      console.error(err);
      const calendar = document.getElementById("desktopCalendar");
      if (calendar) {
        calendar.insertAdjacentHTML(
          "afterend",
          `<p style="color:#fca5a5;">Error loading data.json. Check path and host via HTTP (not file://).</p>`
        );
      }
    });

  // mobile day navigation
  const prevBtn = document.getElementById("prevDayBtn");
  const nextBtn = document.getElementById("nextDayBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const weekPlan = getCurrentWeekPlan();
      if (!weekPlan) return;
      const len = weekPlan.length;
      currentDayIndex = (currentDayIndex - 1 + len) % len;
      renderMobileDay(currentDayIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const weekPlan = getCurrentWeekPlan();
      if (!weekPlan) return;
      const len = weekPlan.length;
      currentDayIndex = (currentDayIndex + 1) % len;
      renderMobileDay(currentDayIndex);
    });
  }

  // expose copy/download
  window.copyGroceryList = copyGroceryList;
  window.downloadGroceryList = downloadGroceryList;
});

// ---------- helpers for current week ----------

function getCurrentWeekPlan() {
  if (!appData) return null;
  if (currentWeekKey === "week1") return appData.weekPlan;
  return appData.week2WeekPlan;
}

function getCurrentGroceryItems() {
  if (!appData) return null;
  if (currentWeekKey === "week1") return appData.groceryItems;
  return appData.week2GroceryItems;
}

// ---------- main render orchestration ----------

function renderAll() {
  if (!appData) return;
  renderDesktopCalendar();
  renderMobileDay(0);
  renderGroceryList();
  renderRecipes();
}

// ---------- Desktop calendar ----------

function renderDesktopCalendar() {
  const weekPlan = getCurrentWeekPlan();
  if (!weekPlan) return;

  const headTpl = document.getElementById("desktop-calendar-head-template").innerHTML;
  const bodyTpl = document.getElementById("desktop-calendar-body-template").innerHTML;

  const headHtml = Mustache.render(headTpl, {
    days: weekPlan.map((d) => ({ name: d.name }))
  });

  const rows = [
    {
      label: "Breakfast",
      cells: weekPlan.map(
        (d) => `<a href="${d.breakfast.anchor}">${d.breakfast.label}</a>`
      )
    },
    {
      label: "Lunch",
      cells: weekPlan.map(
        (d) => `<a href="${d.lunch.anchor}">${d.lunch.label}</a>`
      )
    },
    {
      label: "Dinner",
      cells: weekPlan.map(
        (d) => `<a href="${d.dinner.anchor}">${d.dinner.label}</a>`
      )
    },
    {
      label: "Snacks",
      cells: weekPlan.map((d) => d.snacks || "")
    },
    {
      label: "AM Workout",
      cells: weekPlan.map((d) => d.am || "")
    },
    {
      label: "PM / Extra",
      cells: weekPlan.map((d) => d.pm || "")
    }
  ];

  const bodyHtml = Mustache.render(bodyTpl, { rows });

  const table = document.getElementById("desktopCalendar");
  if (!table) return;

  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");
  if (thead) thead.innerHTML = headHtml;
  if (tbody) tbody.innerHTML = bodyHtml;
}

// ---------- Mobile single-day view ----------

function renderMobileDay(index) {
  const weekPlan = getCurrentWeekPlan();
  if (!weekPlan) return;
  const day = weekPlan[index];
  if (!day) return;

  const tpl = document.getElementById("mobile-day-template").innerHTML;

  const context = {
    breakfast: `<a href="${day.breakfast.anchor}">${day.breakfast.label}</a>`,
    lunch: `<a href="${day.lunch.anchor}">${day.lunch.label}</a>`,
    dinner: `<a href="${day.dinner.anchor}">${day.dinner.label}</a>`,
    snacks: day.snacks || "",
    am: day.am || "",
    pm: day.pm || ""
  };

  const html = Mustache.render(tpl, context);

  const titleEl = document.getElementById("mobileDayTitle");
  const contentEl = document.getElementById("mobileDayContent");

  if (titleEl) titleEl.textContent = day.name;
  if (contentEl) contentEl.innerHTML = html;
}

// ---------- Grocery list ----------

function renderGroceryList() {
  const grocery = getCurrentGroceryItems();
  if (!grocery) return;

  const lines = [];

  Object.keys(grocery).forEach((category) => {
    const items = grocery[category] || [];
    if (!items.length) return;
    lines.push(category + ":");
    items.forEach((item) => {
      lines.push("- " + item);
    });
    lines.push("");
  });

  groceryTextData = lines.join("\n").trim();

  const pre = document.getElementById("groceryText");
  if (pre) {
    pre.textContent = groceryTextData;
  }
}

// ---------- Recipes (using shared library) ----------

function renderRecipes() {
  if (!appData || !appData.recipes) return;
  const r = appData.recipes;

  // Breakfasts
  const bTplEl = document.getElementById("breakfast-template");
  const bListEl = document.getElementById("breakfastList");
  if (bTplEl && bListEl && r.breakfasts) {
    bListEl.innerHTML = Mustache.render(bTplEl.innerHTML, {
      breakfasts: r.breakfasts
    });
  }

  // Lunches
  const lTplEl = document.getElementById("lunch-template");
  const lListEl = document.getElementById("lunchList");
  if (lTplEl && lListEl && r.lunches) {
    lListEl.innerHTML = Mustache.render(lTplEl.innerHTML, {
      lunches: r.lunches
    });
  }

  // Dinners
  const dTplEl = document.getElementById("dinner-template");
  const dListEl = document.getElementById("dinnerList");
  if (dTplEl && dListEl && r.dinners) {
    dListEl.innerHTML = Mustache.render(dTplEl.innerHTML, {
      dinners: r.dinners
    });
  }

  // Snacks
  const sTplEl = document.getElementById("snacks-template");
  const sListEl = document.getElementById("snacksList");
  if (sTplEl && sListEl && r.snacks) {
    sListEl.innerHTML = Mustache.render(sTplEl.innerHTML, r.snacks);
  }
}

// ---------- Copy / Download handlers ----------

function copyGroceryList() {
  if (!groceryTextData) {
    alert("Grocery list not ready yet. Try again in a second.");
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(groceryTextData)
      .then(() => {
        alert("Grocery list copied. Paste into Reminders or Notes.");
      })
      .catch((err) => {
        console.error(err);
        fallbackCopy(groceryTextData);
      });
  } else {
    fallbackCopy(groceryTextData);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    alert("Grocery list copied. Paste into Reminders or Notes.");
  } catch (e) {
    alert("Could not copy automatically. Select and copy manually.");
  }
  document.body.removeChild(textarea);
}

function downloadGroceryList() {
  if (!groceryTextData) {
    alert("Grocery list not ready yet. Try again in a second.");
    return;
  }

  const blob = new Blob([groceryTextData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = currentWeekKey === "week1" ? "grocery-list-week1.txt" : "grocery-list-week2.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
