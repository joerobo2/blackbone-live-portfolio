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
      type: "pdf",
      category: "System Evidence Packet",
      path: "/assets/evidence/pdfs/FINANCIAL_CONTROL_EVIDENCE_PACKET_v1.pdf"
    },
    "chemical-packet": {
      title: "Chemical Compliance Evidence Packet",
      type: "pdf",
      category: "System Evidence Packet",
      path: "/assets/evidence/pdfs/CHEMICAL_COMPLIANCE_EVIDENCE_PACKET_v1.pdf"
    },
    "inventory-packet": {
      title: "Inventory Control Evidence Packet",
      type: "pdf",
      category: "System Evidence Packet",
      path: "/assets/evidence/pdfs/INVENTORY_CONTROL_EVIDENCE_PACKET_v1.pdf"
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
    titleEl.textContent = "Reader Error";
    metaEl.textContent = "Evidence reader";
    frameEl.innerHTML =
      "<div class=\"reader-error\"><h2>Unable to load evidence</h2><p>" +
      escapeHtml(message) +
      "</p></div>";
  }

  if (!doc) {
    setError("The requested evidence item is not registered in the public reader.");
    return;
  }

  titleEl.textContent = doc.title;
  metaEl.textContent = doc.category + " · " + doc.type.toUpperCase();
  downloadEl.href = doc.path;

  if (doc.type === "pdf") {
    frameEl.innerHTML =
      "<iframe title=\"" + escapeHtml(doc.title) + "\" src=\"" + doc.path + "\"></iframe>";
    return;
  }

  if (doc.type === "image") {
    frameEl.innerHTML =
      "<div class=\"reader-image-wrap\"><img alt=\"" +
      escapeHtml(doc.title) +
      "\" src=\"" +
      doc.path +
      "\"></div>";
    return;
  }

  setError("Unsupported evidence type.");
})();
