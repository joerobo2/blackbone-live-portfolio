(function () {
  const docs = {
    "portfolio-paper": {
      title: "IST 782 Portfolio Paper",
      type: "pdf",
      category: "Portfolio Paper",
      path: "/assets/papers/Joseph_Robinson_IST782_Portfolio_Paper_Milestone1.pdf"
    },
    "financial-visual": {
      title: "Financial Control System Visual",
      type: "image",
      category: "System Visual",
      path: "/assets/visuals/FINANCIAL_CONTROL_SYSTEM.png"
    },
    "chemical-visual": {
      title: "Chemical Compliance System Visual",
      type: "image",
      category: "System Visual",
      path: "/assets/visuals/CHEMICAL_COMPLIANCE_SYSTEM.png"
    },
    "inventory-visual": {
      title: "Inventory Control System Visual",
      type: "image",
      category: "System Visual",
      path: "/assets/visuals/INVENTORY_CONTROL_SYSTEM.png"
    },
    "financial-case-study": {
      title: "Financial Control Case Study",
      type: "markdown",
      category: "Public Case Study",
      path: "/assets/evidence/case-studies/FINANCIAL_CONTROL_CASE_STUDY_v1.md"
    },
    "chemical-case-study": {
      title: "Chemical Compliance Case Study",
      type: "markdown",
      category: "Public Case Study",
      path: "/assets/evidence/case-studies/CHEMICAL_COMPLIANCE_CASE_STUDY_v1.md"
    },
    "inventory-case-study": {
      title: "Inventory Control Case Study",
      type: "markdown",
      category: "Public Case Study",
      path: "/assets/evidence/case-studies/INVENTORY_CONTROL_CASE_STUDY_v1.md"
    },
    "technical-manifest": {
      title: "Sanitized Technical Evidence Manifest",
      type: "markdown",
      category: "Technical Evidence",
      path: "/assets/evidence/technical/SANITIZED_TECHNICAL_EVIDENCE_MANIFEST_v1.md"
    },
    "financial-architecture": { title: "Financial Control Architecture Notes", type: "markdown", category: "Technical Evidence", path: "/assets/evidence/technical/financial_control/architecture_notes.md" },
    "financial-schema": { title: "Financial Control Schema Dictionary", type: "markdown", category: "Technical Evidence", path: "/assets/evidence/technical/financial_control/schema_dictionary.md" },
    "financial-pseudocode": { title: "Financial Control Pseudocode", type: "markdown", category: "Technical Evidence", path: "/assets/evidence/technical/financial_control/production_pseudocode.md" },
    "financial-examples": { title: "Financial Control Synthetic Output Examples", type: "markdown", category: "Technical Evidence", path: "/assets/evidence/technical/financial_control/synthetic_output_examples.md" },
    "chemical-architecture": { title: "Chemical Compliance Architecture Notes", type: "markdown", category: "Technical Evidence", path: "/assets/evidence/technical/chemical_compliance/architecture_notes.md" },
    "chemical-schema": { title: "Chemical Compliance Schema Dictionary", type: "markdown", category: "Technical Evidence", path: "/assets/evidence/technical/chemical_compliance/schema_dictionary.md" },
    "chemical-pseudocode": { title: "Chemical Compliance Pseudocode", type: "markdown", category: "Technical Evidence", path: "/assets/evidence/technical/chemical_compliance/production_pseudocode.md" },
    "chemical-examples": { title: "Chemical Compliance Synthetic Output Examples", type: "markdown", category: "Technical Evidence", path: "/assets/evidence/technical/chemical_compliance/synthetic_output_examples.md" },
    "inventory-architecture": { title: "Inventory Control Architecture Notes", type: "markdown", category: "Technical Evidence", path: "/assets/evidence/technical/inventory_control/architecture_notes.md" },
    "inventory-schema": { title: "Inventory Control Schema Dictionary", type: "markdown", category: "Technical Evidence", path: "/assets/evidence/technical/inventory_control/schema_dictionary.md" },
    "inventory-pseudocode": { title: "Inventory Control Pseudocode", type: "markdown", category: "Technical Evidence", path: "/assets/evidence/technical/inventory_control/production_pseudocode.md" },
    "inventory-examples": { title: "Inventory Control Synthetic Output Examples", type: "markdown", category: "Technical Evidence", path: "/assets/evidence/technical/inventory_control/synthetic_output_examples.md" }
  };

  const params = new URLSearchParams(window.location.search);
  const docKey = params.get("doc") || "portfolio-paper";
  const doc = docs[docKey];

  const titleEl = document.querySelector("[data-reader-title]");
  const metaEl = document.querySelector("[data-reader-meta]");
  const frameEl = document.querySelector("[data-reader-frame]");
  const downloadEl = document.querySelector("[data-reader-download]");

  function escapeHtml(value) {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function renderMarkdown(raw) {
    const escaped = escapeHtml(raw);
    return escaped
      .replace(/^### (.*)$/gm, "<h3>$1</h3>")
      .replace(/^## (.*)$/gm, "<h2>$1</h2>")
      .replace(/^# (.*)$/gm, "<h1>$1</h1>")
      .split(/\n{2,}/)
      .map((block) => {
        const trimmed = block.trim();
        if (!trimmed) return "";
        if (trimmed.startsWith("<h1>") || trimmed.startsWith("<h2>") || trimmed.startsWith("<h3>")) return trimmed;
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s+/, "").trim()).filter(Boolean).map((line) => "<li>" + line + "</li>").join("");
          return "<ul class=\"list-clean\">" + items + "</ul>";
        }
        return "<p>" + trimmed.replace(/\n/g, "<br>") + "</p>";
      })
      .join("\n");
  }

  function setError(message) {
    titleEl.textContent = "Reader Error";
    metaEl.textContent = "Evidence reader";
    frameEl.innerHTML = "<div class=\"reader-error\"><h2>Unable to load evidence</h2><p>" + escapeHtml(message) + "</p></div>";
  }

  if (!doc) {
    setError("The requested evidence item is not registered in the public reader.");
    return;
  }

  titleEl.textContent = doc.title;
  metaEl.textContent = doc.category + " · " + doc.type.toUpperCase();
  downloadEl.href = doc.path;

  if (doc.type === "pdf") {
    frameEl.innerHTML = "<iframe title=\"" + escapeHtml(doc.title) + "\" src=\"" + doc.path + "\"></iframe>";
    return;
  }

  if (doc.type === "image") {
    frameEl.innerHTML = "<div class=\"reader-image-wrap\"><img alt=\"" + escapeHtml(doc.title) + "\" src=\"" + doc.path + "\"></div>";
    return;
  }

  fetch(doc.path)
    .then((response) => {
      if (!response.ok) throw new Error("HTTP " + response.status + " loading " + doc.path);
      return response.text();
    })
    .then((text) => {
      frameEl.innerHTML = "<article class=\"markdown-reader\">" + renderMarkdown(text) + "</article>";
    })
    .catch((error) => setError(error.message));
})();
