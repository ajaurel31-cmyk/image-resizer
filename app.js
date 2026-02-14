// ---------------------------------------------------------------------------
// Batch Image Resizer – app.js
// ---------------------------------------------------------------------------

(function () {
  'use strict';

  // ---- State ---------------------------------------------------------------
  const state = {
    files: [],       // { file, img, objectUrl }
    resized: [],     // { blob, name, width, height, originalName }
  };

  // ---- DOM refs ------------------------------------------------------------
  const dropZone          = document.getElementById('drop-zone');
  const fileInput         = document.getElementById('file-input');
  const fileListEl        = document.getElementById('file-list');
  const settingsSection   = document.getElementById('settings-section');
  const previewSection    = document.getElementById('preview-section');
  const resizeBtn         = document.getElementById('resize-btn');
  const downloadAllBtn    = document.getElementById('download-all-btn');
  const progressContainer = document.getElementById('progress-bar-container');
  const progressBar       = document.getElementById('progress-bar');
  const progressText      = document.getElementById('progress-text');
  const previewGrid       = document.getElementById('preview-grid');
  const qualitySlider     = document.getElementById('quality-slider');
  const qualityValue      = document.getElementById('quality-value');
  const targetWidth       = document.getElementById('target-width');
  const targetHeight      = document.getElementById('target-height');
  const maintainAspect    = document.getElementById('maintain-aspect');
  const scalePercent      = document.getElementById('scale-percent');
  const outputFormat      = document.getElementById('output-format');
  const originalTextSize  = document.getElementById('original-text-size');
  const originalDpi       = document.getElementById('original-dpi');
  const textSizeWarning   = document.getElementById('text-size-warning');
  const textSizeOk        = document.getElementById('text-size-ok');
  const dimensionsInputs  = document.getElementById('dimensions-inputs');
  const percentageInputs  = document.getElementById('percentage-inputs');

  // ---- Helpers -------------------------------------------------------------

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function mimeToExt(mime) {
    const map = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/bmp': '.bmp', 'image/gif': '.gif' };
    return map[mime] || '.png';
  }

  function getResizeMode() {
    return document.querySelector('input[name="resize-mode"]:checked').value;
  }

  /** Load a File into an HTMLImageElement, return a promise. */
  function loadImage(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => resolve({ file, img, objectUrl: url });
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load ' + file.name)); };
      img.src = url;
    });
  }

  // ---- Compute target size for one image -----------------------------------

  function computeTarget(img) {
    const mode = getResizeMode();
    let w, h;

    if (mode === 'percentage') {
      const pct = parseFloat(scalePercent.value) || 100;
      w = Math.round(img.naturalWidth * pct / 100);
      h = Math.round(img.naturalHeight * pct / 100);
    } else {
      const tw = parseInt(targetWidth.value, 10);
      const th = parseInt(targetHeight.value, 10);

      if (tw && th && !maintainAspect.checked) {
        w = tw;
        h = th;
      } else if (tw && !th) {
        w = tw;
        h = Math.round(img.naturalHeight * (tw / img.naturalWidth));
      } else if (!tw && th) {
        h = th;
        w = Math.round(img.naturalWidth * (th / img.naturalHeight));
      } else if (tw && th && maintainAspect.checked) {
        const ratio = Math.min(tw / img.naturalWidth, th / img.naturalHeight);
        w = Math.round(img.naturalWidth * ratio);
        h = Math.round(img.naturalHeight * ratio);
      } else {
        w = img.naturalWidth;
        h = img.naturalHeight;
      }
    }

    return { w: Math.max(1, w), h: Math.max(1, h) };
  }

  // ---- Scale factor for the first image (used for text‑size guard) ---------

  function getScaleFactor() {
    if (state.files.length === 0) return 1;
    const { img } = state.files[0];
    const { w } = computeTarget(img);
    return w / img.naturalWidth;
  }

  // ---- Text readability check ----------------------------------------------

  const MIN_PT = 50;
  const MAX_PT = 80;

  function checkTextSize() {
    const origPt = parseFloat(originalTextSize.value);
    if (!origPt || origPt <= 0) {
      textSizeWarning.hidden = true;
      textSizeOk.hidden = true;
      return true; // nothing to validate
    }

    const scale = getScaleFactor();
    const resultPt = origPt * scale;

    if (resultPt < MIN_PT) {
      textSizeWarning.hidden = false;
      textSizeOk.hidden = true;
      const minScale = (MIN_PT / origPt * 100).toFixed(0);
      const maxScale = (MAX_PT / origPt * 100).toFixed(0);
      textSizeWarning.textContent =
        `Warning: After resizing, text would be ~${resultPt.toFixed(1)}pt — below the ${MIN_PT}pt minimum. ` +
        `Scale between ${minScale}%–${maxScale}% to keep text between ${MIN_PT}–${MAX_PT}pt.`;
      return false;
    }

    if (resultPt > MAX_PT) {
      textSizeWarning.hidden = false;
      textSizeOk.hidden = true;
      const minScale = (MIN_PT / origPt * 100).toFixed(0);
      const maxScale = (MAX_PT / origPt * 100).toFixed(0);
      textSizeWarning.textContent =
        `Warning: After resizing, text would be ~${resultPt.toFixed(1)}pt — above the ${MAX_PT}pt maximum. ` +
        `Scale between ${minScale}%–${maxScale}% to keep text between ${MIN_PT}–${MAX_PT}pt.`;
      return false;
    }

    textSizeWarning.hidden = true;
    textSizeOk.hidden = false;
    textSizeOk.textContent =
      `Text will be ~${resultPt.toFixed(1)}pt after resize — within the readable ${MIN_PT}–${MAX_PT}pt range.`;
    return true;
  }

  // ---- Resize a single image via OffscreenCanvas / Canvas ------------------

  function resizeImage({ file, img }, targetW, targetH) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');

      // Use high‑quality interpolation
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // For large down‑scales, do a multi‑step resize (halving) to preserve
      // sharpness — especially important for text readability.
      stepDownDraw(ctx, img, img.naturalWidth, img.naturalHeight, targetW, targetH);

      let mime = outputFormat.value;
      if (mime === 'original') {
        mime = file.type || 'image/png';
      }
      const quality = parseInt(qualitySlider.value, 10) / 100;

      canvas.toBlob((blob) => {
        const ext = mimeToExt(mime);
        const baseName = file.name.replace(/\.[^.]+$/, '');
        resolve({
          blob,
          name: `${baseName}_resized${ext}`,
          width: targetW,
          height: targetH,
          originalName: file.name,
        });
      }, mime, quality);
    });
  }

  /**
   * Multi‑step (halving) draw to maintain sharpness on large down‑scales.
   * Repeatedly halves the source until the next halving would undershoot the
   * target, then does a final draw to exact target dimensions.
   */
  function stepDownDraw(ctx, source, srcW, srcH, destW, destH) {
    // If scale‑down ratio > 2x in either dimension, use step‑down
    if (srcW / destW > 2 || srcH / destH > 2) {
      const tempCanvas = document.createElement('canvas');
      let curW = srcW;
      let curH = srcH;
      let curSource = source;

      while (curW / destW > 2 || curH / destH > 2) {
        const nextW = Math.max(Math.round(curW / 2), destW);
        const nextH = Math.max(Math.round(curH / 2), destH);
        tempCanvas.width = nextW;
        tempCanvas.height = nextH;
        const tCtx = tempCanvas.getContext('2d');
        tCtx.imageSmoothingEnabled = true;
        tCtx.imageSmoothingQuality = 'high';
        tCtx.drawImage(curSource, 0, 0, curW, curH, 0, 0, nextW, nextH);
        curSource = tempCanvas;
        curW = nextW;
        curH = nextH;
      }

      ctx.drawImage(curSource, 0, 0, curW, curH, 0, 0, destW, destH);
    } else {
      ctx.drawImage(source, 0, 0, srcW, srcH, 0, 0, destW, destH);
    }
  }

  // ---- Render file list ----------------------------------------------------

  function renderFileList() {
    if (state.files.length === 0) {
      fileListEl.hidden = true;
      settingsSection.hidden = true;
      previewSection.hidden = true;
      return;
    }

    fileListEl.hidden = false;
    settingsSection.hidden = false;
    previewSection.hidden = false;

    fileListEl.innerHTML = '';

    // Header
    const header = document.createElement('div');
    header.className = 'file-list-header';
    header.innerHTML = `<span>${state.files.length} image${state.files.length > 1 ? 's' : ''} selected</span>`;
    const clearBtn = document.createElement('button');
    clearBtn.className = 'btn btn-sm btn-danger';
    clearBtn.textContent = 'Clear All';
    clearBtn.addEventListener('click', () => {
      state.files.forEach(f => URL.revokeObjectURL(f.objectUrl));
      state.files = [];
      renderFileList();
    });
    header.appendChild(clearBtn);
    fileListEl.appendChild(header);

    state.files.forEach((entry, i) => {
      const div = document.createElement('div');
      div.className = 'file-item';

      const thumb = document.createElement('img');
      thumb.className = 'file-thumb';
      thumb.src = entry.objectUrl;
      thumb.alt = entry.file.name;

      const info = document.createElement('div');
      info.className = 'file-info';
      info.innerHTML =
        `<div class="file-name">${entry.file.name}</div>` +
        `<div class="file-meta">${entry.img.naturalWidth} x ${entry.img.naturalHeight} &middot; ${formatBytes(entry.file.size)}</div>`;

      const removeBtn = document.createElement('button');
      removeBtn.className = 'file-remove';
      removeBtn.innerHTML = '&times;';
      removeBtn.title = 'Remove';
      removeBtn.addEventListener('click', () => {
        URL.revokeObjectURL(entry.objectUrl);
        state.files.splice(i, 1);
        renderFileList();
      });

      div.append(thumb, info, removeBtn);
      fileListEl.appendChild(div);
    });

    checkTextSize();
  }

  // ---- Render preview grid after resize ------------------------------------

  function renderPreviews() {
    previewGrid.innerHTML = '';
    state.resized.forEach((entry) => {
      const card = document.createElement('div');
      card.className = 'preview-card';

      const img = document.createElement('img');
      img.src = URL.createObjectURL(entry.blob);
      img.alt = entry.name;

      const body = document.createElement('div');
      body.className = 'preview-card-body';
      body.innerHTML =
        `<div class="file-name">${entry.name}</div>` +
        `<div class="file-meta">${entry.width} x ${entry.height} &middot; ${formatBytes(entry.blob.size)}</div>`;

      const dlBtn = document.createElement('button');
      dlBtn.className = 'btn btn-secondary btn-sm';
      dlBtn.textContent = 'Download';
      dlBtn.addEventListener('click', () => downloadBlob(entry.blob, entry.name));
      body.appendChild(dlBtn);

      card.append(img, body);
      previewGrid.appendChild(card);
    });
  }

  function downloadBlob(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // ---- Batch resize handler ------------------------------------------------

  async function handleResize() {
    if (state.files.length === 0) return;

    // Warn about text readability (non‑blocking — user can still proceed)
    checkTextSize();

    resizeBtn.disabled = true;
    resizeBtn.textContent = 'Resizing…';
    downloadAllBtn.hidden = true;
    progressContainer.hidden = false;
    state.resized = [];

    const total = state.files.length;

    for (let i = 0; i < total; i++) {
      const entry = state.files[i];
      const { w, h } = computeTarget(entry.img);
      const result = await resizeImage(entry, w, h);
      state.resized.push(result);

      const pct = Math.round(((i + 1) / total) * 100);
      progressBar.style.setProperty('--progress', pct + '%');
      progressText.textContent = pct + '%';
    }

    resizeBtn.disabled = false;
    resizeBtn.textContent = 'Resize All Images';
    downloadAllBtn.hidden = false;

    renderPreviews();
  }

  // ---- Download all as ZIP -------------------------------------------------

  async function handleDownloadAll() {
    if (state.resized.length === 0) return;

    downloadAllBtn.disabled = true;
    downloadAllBtn.textContent = 'Zipping…';

    const zip = new JSZip();
    for (const entry of state.resized) {
      zip.file(entry.name, entry.blob);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(blob, 'resized_images.zip');

    downloadAllBtn.disabled = false;
    downloadAllBtn.textContent = 'Download All (ZIP)';
  }

  // ---- Event listeners -----------------------------------------------------

  // Drag & drop
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', async (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const files = [...e.dataTransfer.files].filter(f => f.type.startsWith('image/'));
    await addFiles(files);
  });

  dropZone.addEventListener('click', (e) => {
    if (e.target.tagName !== 'INPUT') fileInput.click();
  });

  fileInput.addEventListener('change', async () => {
    const files = [...fileInput.files];
    await addFiles(files);
    fileInput.value = '';
  });

  async function addFiles(files) {
    const entries = await Promise.all(files.map(loadImage));
    state.files.push(...entries);
    renderFileList();
  }

  // Resize mode toggle
  document.querySelectorAll('input[name="resize-mode"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const mode = getResizeMode();
      dimensionsInputs.hidden = mode !== 'dimensions';
      percentageInputs.hidden = mode !== 'percentage';
      checkTextSize();
    });
  });

  // Quality slider
  qualitySlider.addEventListener('input', () => {
    qualityValue.textContent = qualitySlider.value;
  });

  // Dimension inputs — auto‑compute companion when aspect ratio is locked
  targetWidth.addEventListener('input', () => {
    if (maintainAspect.checked && state.files.length > 0) {
      const { img } = state.files[0];
      const w = parseInt(targetWidth.value, 10);
      if (w > 0) {
        targetHeight.value = Math.round(img.naturalHeight * (w / img.naturalWidth));
      }
    }
    checkTextSize();
  });

  targetHeight.addEventListener('input', () => {
    if (maintainAspect.checked && state.files.length > 0) {
      const { img } = state.files[0];
      const h = parseInt(targetHeight.value, 10);
      if (h > 0) {
        targetWidth.value = Math.round(img.naturalWidth * (h / img.naturalHeight));
      }
    }
    checkTextSize();
  });

  scalePercent.addEventListener('input', checkTextSize);
  originalTextSize.addEventListener('input', checkTextSize);
  originalDpi.addEventListener('input', checkTextSize);

  // Action buttons
  resizeBtn.addEventListener('click', handleResize);
  downloadAllBtn.addEventListener('click', handleDownloadAll);
})();
