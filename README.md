# sCAIF Webapp

![Logo](https://uploads.onecompiler.io/43vnmzr4w/446heg8kg/image_1764798293311.png)

A modern, browser-based playground for **sCAIF (students' Code AI Fast)** — a teaching and learning DSL for building and understanding AI models.  
This app runs entirely in **HTML/CSS/JS/WASM**, powered by a C++17 runtime compiled with Emscripten.

---

## ✨ Features

- **Role Selection**
  - Choose **Teacher** or **Learner** mode at startup.
- **Teacher Mode**
  - Full documentation on sCAIF directives and app usage.
  - Write and run sCAIF DSL code directly in the browser.
  - Export assignments as **JSON files** for students to import.
- **Learner Mode**
  - Write and run sCAIF DSL code.
  - Import JSON assignments created by teachers.
  - Complete guided tasks and export trained models in multiple formats (PY, JS, JAR, JSON, sCAIF).
- **WASM Runtime**
  - The sCAIF DSL runtime is compiled into WebAssembly (`scaif.wasm`) with glue code (`scaif.js`).
  - All DSL execution happens client-side in the browser.

-----
-----
-----
-----
-----
