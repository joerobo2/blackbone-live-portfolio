(function () {
  const docs = {
    "portfolio-paper": {
      title: "IST 782 Portfolio Paper",
      type: "pdf",
      category: "Portfolio Paper",
      path: "/assets/evidence/pdfs/Joseph_Robinson_IST782_Portfolio_Paper_Milestone1.pdf"
    },
    "resume": {
      title: "Joseph Robinson Resume",
      type: "pdf",
      category: "Resume",
      path: "/assets/evidence/pdfs/Joseph_Robinson_Resume.pdf"
    },
    "financial-packet": {
      title: "Financial Control Evidence Packet",
      type: "html",
      category: "System Evidence Packet",
      path: "/assets/evidence/html/FINANCIAL_CONTROL_EVIDENCE_PACKET_v1.html"
    },
    "chemical-packet": {
      title: "Chemical Compliance Evidence Packet",
      type: "html",
      category: "System Evidence Packet",
      path: "/assets/evidence/html/CHEMICAL_COMPLIANCE_EVIDENCE_PACKET_v1.html"
    },
    "inventory-packet": {
      title: "Inventory Control Evidence Packet",
      type: "html",
      category: "System Evidence Packet",
      path: "/assets/evidence/html/INVENTORY_CONTROL_EVIDENCE_PACKET_v1.html"
    }
  };

  const params = new URLSearchParams(window.location.search);
  const docKey = params.get("doc") || "portfolio-paper";
  const doc = docs[docKey];

  const titleEl = document.querySelector("[data-reader-title]");
  const metaEl = document.querySelector("[data-reader-meta]");
  const frameEl = document.querySelector("[data-reader-frame]");
  const downloadEl = document.querySelector("[data-reader-download]");

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function setError(message) {
    if (titleEl) titleEl.textContent = "Reader Error";
    if (metaEl) metaEl.textContent = "Evidence reader";
    if (frameEl) {
      frameEl.innerHTML =
        "<div class=\"reader-error\"><h2>Unable to load evidence</h2><p>" +
        escapeHtml(message) +
        "</p></div>";
    }
  }

  if (!doc) {
    setError("The requested evidence item is not registered in the public reader.");
    return;
  }

  if (titleEl) titleEl.textContent = doc.title;
  if (metaEl) {
    const typeLabel = doc.type === "html" ? "HTML Document" : "PDF";
    metaEl.textContent = doc.category + " · " + typeLabel;
  }
  if (downloadEl) {
    downloadEl.href = doc.path;
    downloadEl.textContent = "Open Source File";
  }

  if (!frameEl) return;

  if (doc.type === "pdf" || doc.type === "html") {
    frameEl.innerHTML =
      "<iframe title=\"" + escapeHtml(doc.title) + "\" src=\"" + doc.path + "\"></iframe>";
    return;
  }

  setError("Unsupported evidence type.");
})();
