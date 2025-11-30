// plan.js

let appData = null;
let groceryTextData = "";
let currentDayIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  // Load data.json (weekPlan + groceryItems)
  fetch("data.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load data.json");
      return res.json();
    })
    .then((data) => {
      appData = data;
      renderDesktopCalendar();
      renderMobileDay(0); // Monday
      renderGroceryList();
      renderRecipes();
    })
    .catch((err) => {
      console.error(err);
      const calendar = document.getElementById("desktopCalendar");
      if (calendar) {
        calendar.insertAdjacentHTML(
          "afterend",
          `<p style="color:#fca5a5;">Error loading data.json. Check path or host via HTTP (not file://).</p>`
        );
      }
    });

  // Hook up mobile day navigation
  const prevBtn = document.getElementById("prevDayBtn");
  const nextBtn = document.getElementById("nextDayBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (!appData) return;
      const len = appData.weekPlan.length;
      currentDayIndex = (currentDayIndex - 1 + len) % len;
      renderMobileDay(currentDayIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (!appData) return;
      const len = appData.weekPlan.length;
      currentDayIndex = (currentDayIndex + 1) % len;
      renderMobileDay(currentDayIndex);
    });
  }

  // Expose copy/download for inline onclick handlers
  window.copyGroceryList = copyGroceryList;
  window.downloadGroceryList = downloadGroceryList;
});

// ---------- Desktop calendar ----------
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
    sListEl.innerHTML = Mustache.render(sTplEl.innerHTML, {
      snacks: r.snacks
    });
  }
}

function renderDesktopCalendar() {
  if (!appData) return;
  const weekPlan = appData.weekPlan;

  const headTpl = document.getElementById(
    "desktop-calendar-head-template"
  ).innerHTML;
  const bodyTpl = document.getElementById(
    "desktop-calendar-body-template"
  ).innerHTML;

  const headHtml = Mustache.render(headTpl, {
    days: weekPlan.map((d) => ({ name: d.name })),
  });

  const rows = [
    {
      label: "Breakfast",
      cells: weekPlan.map(
        (d) =>
          `<a href="${d.breakfast.anchor}">${d.breakfast.label}</a>`
      ),
    },
    {
      label: "Lunch",
      cells: weekPlan.map(
        (d) => `<a href="${d.lunch.anchor}">${d.lunch.label}</a>`
      ),
    },
    {
      label: "Dinner",
      cells: weekPlan.map(
        (d) => `<a href="${d.dinner.anchor}">${d.dinner.label}</a>`
      ),
    },
    {
      label: "Snacks",
      cells: weekPlan.map((d) => d.snacks || ""),
    },
    {
      label: "AM Workout",
      cells: weekPlan.map((d) => d.am || ""),
    },
    {
      label: "PM / Extra",
      cells: weekPlan.map((d) => d.pm || ""),
    },
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
  if (!appData) return;
  const day = appData.weekPlan[index];
  if (!day) return;

  const tpl = document.getElementById("mobile-day-template").innerHTML;

  const context = {
    breakfast: `<a href="${day.breakfast.anchor}">${day.breakfast.label}</a>`,
    lunch: `<a href="${day.lunch.anchor}">${day.lunch.label}</a>`,
    dinner: `<a href="${day.dinner.anchor}">${day.dinner.label}</a>`,
    snacks: day.snacks || "",
    am: day.am || "",
    pm: day.pm || "",
  };

  const html = Mustache.render(tpl, context);

  const titleEl = document.getElementById("mobileDayTitle");
  const contentEl = document.getElementById("mobileDayContent");

  if (titleEl) titleEl.textContent = day.name;
  if (contentEl) contentEl.innerHTML = html;
}

// ---------- Grocery list ----------

function renderGroceryList() {
  if (!appData) return;
  const grocery = appData.groceryItems || {};
  const lines = [];

  Object.keys(grocery).forEach((category) => {
    const items = grocery[category] || [];
    if (!items.length) return;
    lines.push(category + ":");
    items.forEach((item) => {
      lines.push("- " + item);
    });
    lines.push(""); // blank line between categories
  });

  groceryTextData = lines.join("\n").trim();

  const pre = document.getElementById("groceryText");
  if (pre) {
    pre.textContent = groceryTextData;
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
  a.download = "grocery-list.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
