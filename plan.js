let weekPlan = [];
let groceryItems = {};
let currentDayIndex = 0;

function getTodayIndex() {
  const jsDay = new Date().getDay();
  const map = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
  return map[jsDay] ?? 0;
}

function linkOrText(item) {
  if (!item) return "";
  if (typeof item === "string") return item;
  if (item.anchor) return `<a href="${item.anchor}">${item.label}</a>`;
  return item.label || "";
}

function renderDesktopCalendar() {
  const table = document.getElementById("desktopCalendar");
  if (!table || !weekPlan.length) return;

  const headTemplate = document.getElementById("desktop-calendar-head-template")?.innerHTML || "";
  const bodyTemplate = document.getElementById("desktop-calendar-body-template")?.innerHTML || "";

  const headerHtml = Mustache.render(headTemplate, { days: weekPlan });

  const categories = [
    { label: "Breakfast", key: "breakfast" },
    { label: "Lunch", key: "lunch" },
    { label: "Dinner", key: "dinner" },
    { label: "Snacks", key: "snacks" },
    { label: "AM Workout", key: "am" },
    { label: "PM / Extra", key: "pm" }
  ];

  const rows = categories.map((cat) => ({
    label: cat.label,
    cells: weekPlan.map((day) => linkOrText(day[cat.key]))
  }));

  const bodyHtml = Mustache.render(bodyTemplate, { rows });

  table.querySelector("thead").innerHTML = headerHtml;
  table.querySelector("tbody").innerHTML = bodyHtml;
  highlightTodayColumn();
}

function renderMobileDay() {
  const day = weekPlan[currentDayIndex];
  const titleEl = document.getElementById("mobileDayTitle");
  const contentEl = document.getElementById("mobileDayContent");
  const template = document.getElementById("mobile-day-template")?.innerHTML || "";

  if (!day || !titleEl || !contentEl) return;

  titleEl.textContent = day.name;

  const html = Mustache.render(template, {
    breakfast: linkOrText(day.breakfast),
    lunch: linkOrText(day.lunch),
    dinner: linkOrText(day.dinner),
    snacks: day.snacks,
    am: day.am,
    pm: day.pm
  });

  contentEl.innerHTML = html;
}

function highlightTodayColumn() {
  const table = document.getElementById("desktopCalendar");
  if (!table) return;

  const today = getTodayIndex();
  const colIndex = today + 1;

  const headerRow = table.tHead?.rows[0];
  if (headerRow && headerRow.cells[colIndex]) {
    headerRow.cells[colIndex].classList.add("today-header");
  }

  const rows = table.tBodies[0]?.rows || [];
  for (let r = 0; r < rows.length; r++) {
    const cell = rows[r].cells[colIndex];
    if (cell) {
      cell.classList.add("today-col");
    }
  }
}

function renderGroceryList() {
  const box = document.getElementById("groceryText");
  if (!box || !Object.keys(groceryItems).length) return;

  box.textContent = buildGroceryText();
}

function buildGroceryText() {
  let text = "";
  for (const [section, items] of Object.entries(groceryItems)) {
    text += section + ":\n";
    for (const item of items) text += "• " + item + "\n";
    text += "\n";
  }
  return text.trim();
}

function copyGroceryList() {
  const text = buildGroceryText();
  const crlfText = text.replace(/\n/g, "\r\n");

  if (navigator.clipboard && window.ClipboardItem) {
    const blob = new Blob([crlfText], { type: "text/plain" });
    const item = new ClipboardItem({ "text/plain": blob });

    navigator.clipboard
      .write([item])
      .then(() => alert("Copied! Paste into Apple Reminders to create one item per line."))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("Copied! Paste into Apple Reminders to create one item per line.");
}

function downloadGroceryList() {
  const text = buildGroceryText().replace(/\n/g, "\r\n");
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "grocery-list.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function attachNavListeners() {
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
}

function bootstrapPlan(data) {
  weekPlan = data.weekPlan || [];
  groceryItems = data.groceryItems || {};
  currentDayIndex = getTodayIndex();

  renderDesktopCalendar();
  renderMobileDay();
  renderGroceryList();
  attachNavListeners();
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => bootstrapPlan(data))
    .catch((error) => {
      console.error("Failed to load plan data", error);
    });
});
