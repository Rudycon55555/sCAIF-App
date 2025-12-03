// script.js
// Handles role selection, DSL execution, assignment import/export, and WASM runtime integration.

import createModule from "./scaif.js";

let Module;

// Initialize WASM runtime
createModule().then(m => {
  Module = m;
  console.log("sCAIF runtime loaded:", Module.cwrap("scaif_version", "string", [])());
});

// Role selection
const teacherBtn = document.getElementById("teacherBtn");
const learnerBtn = document.getElementById("learnerBtn");
const teacherMode = document.getElementById("teacher-mode");
const learnerMode = document.getElementById("learner-mode");
const roleSelect = document.getElementById("role-select");

teacherBtn.addEventListener("click", () => {
  roleSelect.classList.add("hidden");
  teacherMode.classList.remove("hidden");
  learnerMode.classList.add("hidden");
});

learnerBtn.addEventListener("click", () => {
  roleSelect.classList.add("hidden");
  learnerMode.classList.remove("hidden");
  teacherMode.classList.add("hidden");
});

// Run DSL (Teacher)
document.addEventListener("click", e => {
  if (e.target && e.target.id === "runTeacher") {
    runDSL("teacherDSL", "teacherOutput");
  }
  if (e.target && e.target.id === "runLearner") {
    runDSL("learnerDSL", "learnerOutput");
  }
  if (e.target && e.target.id === "downloadAssignment") {
    downloadAssignment();
  }
});

// Execute DSL via WASM runtime
function runDSL(textareaId, outputId) {
  if (!Module) {
    alert("Runtime not loaded yet.");
    return;
  }
  const code = document.getElementById(textareaId).value;
  const run = Module.cwrap("scaif_run", "string", ["string"]);
  const result = run(code);
  document.getElementById(outputId).textContent = result;
}

// Download JSON Assignment (Teacher)
function downloadAssignment() {
  const dsl = document.getElementById("teacherDSL").value;
  const assignment = {
    title: "Custom Assignment",
    instructions: "Complete this sCAIF task.",
    dsl: dsl
  };
  const blob = new Blob([JSON.stringify(assignment, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "assignment.json";
  a.click();
}

// Import JSON Assignment (Learner)
const assignmentFile = document.getElementById("assignmentFile");
assignmentFile.addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const assignment = JSON.parse(e.target.result);
      document.getElementById("learnerDSL").value = assignment.dsl || "";
      alert("Assignment loaded: " + (assignment.title || "Untitled"));
    } catch (err) {
      alert("Invalid JSON assignment file.");
    }
  };
  reader.readAsText(file);
});
