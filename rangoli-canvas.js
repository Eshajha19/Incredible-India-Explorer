
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("rangoli-canvas");
  const ctx = canvas.getContext("2d");
  const gridSize = 13;
  const padding = 90;
  const step = (canvas.width - padding * 2) / (gridSize - 1);
  const center = { x: canvas.width / 2, y: canvas.height / 2 };
  const galleryKey = "incredible-india-rangoli-gallery";

  const modeSelect = document.getElementById("mode-select");
  const axisSelect = document.getElementById("axis-select");
  const colorPicker = document.getElementById("color-picker");
  const brushSize = document.getElementById("brush-size");
  const brushLabel = document.getElementById("brush-size-label");
  const status = document.getElementById("canvas-status");

  let strokes = [];
  let activeDot = null;
  let strokeCount = 0;

  const dots = Array.from({ length: gridSize * gridSize }, (_, index) => {
    const col = index % gridSize;
    const row = Math.floor(index / gridSize);
    return { x: padding + col * step, y: padding + row * step, row, col };
  });

  function getAxes() {
    return Number(axisSelect.value);
  }

  function updateStats() {
    document.getElementById("stroke-count").textContent = strokeCount;
    document.getElementById("axis-count").textContent = axisSelect.value;
    document.getElementById("gallery-count").textContent = readGallery().length;
    brushLabel.textContent = `${brushSize.value}px`;
  }

  function readGallery() {
    try {
      const parsed = JSON.parse(localStorage.getItem(galleryKey) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveGallery(items) {
    localStorage.setItem(galleryKey, JSON.stringify(items.slice(-8)));
    updateStats();
    renderGallery();
  }

  function rotatePoint(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const dx = point.x - center.x;
    const dy = point.y - center.y;
    return {
      x: center.x + dx * cos - dy * sin,
      y: center.y + dx * sin + dy * cos,
    };
  }

  function drawGrid() {
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i < getAxes(); i += 1) {
      const angle = (Math.PI * 2 * i) / getAxes();
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(center.x + Math.cos(angle) * 420, center.y + Math.sin(angle) * 420);
      ctx.stroke();
    }
    ctx.restore();

    dots.forEach((dot) => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,.42)";
      ctx.fill();
    });

    ctx.beginPath();
    ctx.arc(center.x, center.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#ff9933";
    ctx.fill();
  }

  function drawLine(from, to, color, width) {
    for (let i = 0; i < getAxes(); i += 1) {
      const angle = (Math.PI * 2 * i) / getAxes();
      const a = rotatePoint(from, angle);
      const b = rotatePoint(to, angle);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }
  }

  function drawCircle(point, color, size) {
    for (let i = 0; i < getAxes(); i += 1) {
      const angle = (Math.PI * 2 * i) / getAxes();
      const p = rotatePoint(point, angle);
      ctx.beginPath();
      ctx.arc(p.x, p.y, size * 1.7, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.42)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function replay() {
    drawGrid();
    strokes.forEach((stroke) => {
      if (stroke.type === "line") {
        drawLine(stroke.from, stroke.to, stroke.color, stroke.width);
      } else if (stroke.type === "circle") {
        drawCircle(stroke.point, stroke.color, stroke.width);
      }
    });
  }

  function nearestDot(event) {
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
    let nearest = null;
    let distance = Infinity;

    dots.forEach((dot) => {
      const d = Math.hypot(dot.x - x, dot.y - y);
      if (d < distance) {
        nearest = dot;
        distance = d;
      }
    });

    return distance < 34 ? nearest : { x, y };
  }

  function addStroke(stroke) {
    strokes.push(stroke);
    strokeCount += 1;
    replay();
    updateStats();
  }

  function handleCanvas(event) {
    const point = nearestDot(event);
    const mode = modeSelect.value;
    const color = colorPicker.value;
    const width = Number(brushSize.value);

    if (mode === "fill") {
      activeDot = null;
      addStroke({ type: "circle", point, color, width });
      status.textContent = "Colour fill added";
      return;
    }

    if (mode === "erase") {
      activeDot = null;
      if (strokes.length) {
        strokes.pop();
        strokeCount = Math.max(0, strokeCount - 1);
        replay();
        updateStats();
      }
      status.textContent = "Last stroke erased";
      return;
    }

    if (!activeDot) {
      activeDot = point;
      status.textContent = "Start dot selected";
      return;
    }

    addStroke({ type: "line", from: activeDot, to: point, color, width });
    activeDot = point;
    status.textContent = "Dot connected";
  }

  function addFlowerTemplate() {
    const colors = ["#ff9933", "#138808", "#f6c453", "#ec4899"];
    for (let i = 0; i < 12; i += 1) {
      const angle = (Math.PI * 2 * i) / 12;
      const inner = { x: center.x + Math.cos(angle) * 90, y: center.y + Math.sin(angle) * 90 };
      const outer = { x: center.x + Math.cos(angle) * 260, y: center.y + Math.sin(angle) * 260 };
      strokes.push({ type: "line", from: inner, to: outer, color: colors[i % colors.length], width: 7 });
      strokes.push({ type: "circle", point: outer, color: colors[(i + 1) % colors.length], width: 9 });
    }
    strokeCount = strokes.length;
    replay();
    updateStats();
    status.textContent = "Flower template added";
  }

  function addDiyaTemplate() {
    const color = "#f59e0b";
    const flame = "#ef4444";
    const baseY = center.y + 90;
    const left = { x: center.x - 190, y: baseY };
    const right = { x: center.x + 190, y: baseY };
    const mid = { x: center.x, y: center.y + 160 };
    const top = { x: center.x, y: center.y - 170 };
    strokes.push({ type: "line", from: left, to: mid, color, width: 10 });
    strokes.push({ type: "line", from: mid, to: right, color, width: 10 });
    strokes.push({ type: "line", from: left, to: right, color: "#ff9933", width: 6 });
    strokes.push({ type: "line", from: center, to: top, color: flame, width: 12 });
    strokes.push({ type: "circle", point: top, color: flame, width: 11 });
    strokeCount = strokes.length;
    replay();
    updateStats();
    status.textContent = "Diya template added";
  }

  function downloadPng() {
    const link = document.createElement("a");
    link.download = `rangoli-design-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    status.textContent = "PNG download started";
  }

  function saveCurrentToGallery() {
    const gallery = readGallery();
    gallery.push({ image: canvas.toDataURL("image/png"), createdAt: new Date().toLocaleString() });
    saveGallery(gallery);
    status.textContent = "Saved to gallery";
  }

  function renderGallery() {
    const gallery = readGallery();
    const grid = document.getElementById("gallery-grid");
    if (!gallery.length) {
      grid.innerHTML = '<div class="gallery-empty">No saved Rangoli yet. Create a design and click “Save to gallery”.</div>';
      return;
    }
    grid.innerHTML = gallery.slice().reverse().map((item) => `
      <article class="gallery-item">
        <img src="${item.image}" alt="Saved Rangoli design">
        <span>${item.createdAt}</span>
      </article>
    `).join("");
  }

  canvas.addEventListener("pointerdown", handleCanvas);
  axisSelect.addEventListener("change", () => {
    replay();
    updateStats();
  });
  brushSize.addEventListener("input", updateStats);
  document.getElementById("undo-button").addEventListener("click", () => {
    activeDot = null;
    strokes.pop();
    strokeCount = Math.max(0, strokeCount - 1);
    replay();
    updateStats();
  });
  document.getElementById("clear-button").addEventListener("click", () => {
    activeDot = null;
    strokes = [];
    strokeCount = 0;
    replay();
    updateStats();
    status.textContent = "Canvas cleared";
  });
  document.getElementById("template-flower").addEventListener("click", addFlowerTemplate);
  document.getElementById("template-diya").addEventListener("click", addDiyaTemplate);
  document.getElementById("download-png").addEventListener("click", downloadPng);
  document.getElementById("save-gallery").addEventListener("click", saveCurrentToGallery);
  document.getElementById("clear-gallery").addEventListener("click", () => {
    localStorage.removeItem(galleryKey);
    renderGallery();
    updateStats();
  });

  replay();
  renderGallery();
  updateStats();

  window.RangoliCanvasSandbox = {
    clear: () => {
      strokes = [];
      strokeCount = 0;
      replay();
      updateStats();
    },
    download: downloadPng,
    save: saveCurrentToGallery,
  };
});
