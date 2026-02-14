// ---------------------------------------------------------------------------
// App Store Screenshot Generator – app.js
// All device specs from Apple's official App Store Connect documentation.
// ---------------------------------------------------------------------------

(function () {
  'use strict';

  // ---- App Store Connect Device Specifications ----------------------------
  // Each entry: { id, name, platform, portrait: [w,h], models, badge? }
  // "badge" can be "required" or "recommended"; required are pre-checked.

  const DEVICES = [
    // --- iPhone ---
    { id: 'iphone_6_9', name: 'iPhone 6.9″', platform: 'iphone', portrait: [1260, 2736],
      models: 'iPhone Air, 17 Pro Max, 16 Pro Max, 16 Plus, 15 Pro Max, 15 Plus, 14 Pro Max',
      badge: 'required' },
    { id: 'iphone_6_5', name: 'iPhone 6.5″', platform: 'iphone', portrait: [1284, 2778],
      models: 'iPhone 14 Plus, 13 Pro Max, 12 Pro Max, 11 Pro Max, XS Max, XR',
      badge: null },
    { id: 'iphone_6_5_alt', name: 'iPhone 6.5″ (alt)', platform: 'iphone', portrait: [1242, 2688],
      models: 'iPhone 11 Pro Max, XS Max (alternative size)',
      badge: null },
    { id: 'iphone_6_3', name: 'iPhone 6.3″', platform: 'iphone', portrait: [1206, 2622],
      models: 'iPhone 17 Pro, 17, 16 Pro, 16, 15 Pro, 15, 14 Pro',
      badge: null },
    { id: 'iphone_6_3_alt', name: 'iPhone 6.3″ (alt)', platform: 'iphone', portrait: [1179, 2556],
      models: 'iPhone 16 Pro, 15 Pro, 15, 14 Pro (alternative size)',
      badge: null },
    { id: 'iphone_6_1', name: 'iPhone 6.1″', platform: 'iphone', portrait: [1170, 2532],
      models: 'iPhone 14, 13 Pro, 13, 12 Pro, 12',
      badge: null },
    { id: 'iphone_5_5', name: 'iPhone 5.5″', platform: 'iphone', portrait: [1242, 2208],
      models: 'iPhone 8 Plus, 7 Plus, 6s Plus',
      badge: 'recommended' },
    { id: 'iphone_4_7', name: 'iPhone 4.7″', platform: 'iphone', portrait: [750, 1334],
      models: 'iPhone SE (3rd/2nd), 8, 7, 6s',
      badge: null },

    // --- iPad ---
    { id: 'ipad_13', name: 'iPad 13″', platform: 'ipad', portrait: [2064, 2752],
      models: 'iPad Pro (M5/M4/6th–1st gen), iPad Air (M3/M2)',
      badge: 'required' },
    { id: 'ipad_13_alt', name: 'iPad 13″ (alt)', platform: 'ipad', portrait: [2048, 2732],
      models: 'iPad Pro 12.9″ (all generations)',
      badge: null },
    { id: 'ipad_11', name: 'iPad 11″', platform: 'ipad', portrait: [1488, 2266],
      models: 'iPad Pro 11″ (M5/M4), iPad Air (M3/M2), iPad mini (A17)',
      badge: null },
    { id: 'ipad_11_alt1', name: 'iPad 11″ (2388)', platform: 'ipad', portrait: [1668, 2388],
      models: 'iPad Pro 11″ (1st–3rd gen)',
      badge: null },
    { id: 'ipad_11_alt2', name: 'iPad 11″ (2420)', platform: 'ipad', portrait: [1668, 2420],
      models: 'iPad Air (4th/5th gen)',
      badge: null },
    { id: 'ipad_10_5', name: 'iPad 10.5″', platform: 'ipad', portrait: [1668, 2224],
      models: 'iPad Pro 10.5″, iPad Air (3rd), iPad (9th–7th)',
      badge: null },
    { id: 'ipad_9_7', name: 'iPad 9.7″', platform: 'ipad', portrait: [1536, 2048],
      models: 'iPad Pro 9.7″, iPad Air 1/2, iPad mini 2–5',
      badge: null },

    // --- Mac ---
    { id: 'mac_2880', name: 'Mac Retina 15″', platform: 'mac', portrait: [2880, 1800],
      models: 'MacBook Pro 15″ Retina', badge: 'recommended' },
    { id: 'mac_2560', name: 'Mac Retina 13″', platform: 'mac', portrait: [2560, 1600],
      models: 'MacBook Pro/Air 13″ Retina', badge: 'required' },
    { id: 'mac_1440', name: 'Mac 1440×900', platform: 'mac', portrait: [1440, 900],
      models: 'MacBook Air / older displays', badge: null },
    { id: 'mac_1280', name: 'Mac 1280×800', platform: 'mac', portrait: [1280, 800],
      models: 'Minimum accepted size', badge: null },

    // --- Apple Watch ---
    { id: 'watch_ultra3', name: 'Watch Ultra 3', platform: 'watch', portrait: [422, 514],
      models: 'Apple Watch Ultra 3', badge: null },
    { id: 'watch_ultra2', name: 'Watch Ultra 2/Ultra', platform: 'watch', portrait: [410, 502],
      models: 'Apple Watch Ultra 2, Ultra', badge: null },
    { id: 'watch_s11_s10', name: 'Watch Series 11/10', platform: 'watch', portrait: [416, 496],
      models: 'Apple Watch Series 11, 10', badge: 'required' },
    { id: 'watch_s9_s7', name: 'Watch Series 9–7', platform: 'watch', portrait: [396, 484],
      models: 'Apple Watch Series 9, 8, 7', badge: null },
    { id: 'watch_s6_se', name: 'Watch Series 6–4/SE', platform: 'watch', portrait: [368, 448],
      models: 'Apple Watch Series 6–4, SE 3, SE', badge: null },
    { id: 'watch_s3', name: 'Watch Series 3', platform: 'watch', portrait: [312, 390],
      models: 'Apple Watch Series 3', badge: null },

    // --- Apple TV ---
    { id: 'tv_4k', name: 'Apple TV 4K', platform: 'tv', portrait: [3840, 2160],
      models: 'Apple TV 4K', badge: 'required' },
    { id: 'tv_1080', name: 'Apple TV 1080p', platform: 'tv', portrait: [1920, 1080],
      models: 'Apple TV HD', badge: null },

    // --- Apple Vision Pro ---
    { id: 'vision_pro', name: 'Apple Vision Pro', platform: 'vision', portrait: [3840, 2160],
      models: 'Apple Vision Pro', badge: 'required' },
  ];

  const PLATFORMS = [
    { id: 'iphone', label: 'iPhone' },
    { id: 'ipad',   label: 'iPad' },
    { id: 'mac',    label: 'Mac' },
    { id: 'watch',  label: 'Apple Watch' },
    { id: 'tv',     label: 'Apple TV' },
    { id: 'vision', label: 'Vision Pro' },
  ];

  // Platforms where orientation toggle doesn't apply (fixed aspect)
  const FIXED_ORIENTATION_PLATFORMS = new Set(['mac', 'watch', 'tv', 'vision']);

  // ---- State --------------------------------------------------------------
  const state = {
    files: [],          // { file, img, objectUrl }
    generated: [],      // { blob, name, width, height, deviceName, sourceFile }
    activePlatform: 'iphone',
  };

  // ---- DOM refs -----------------------------------------------------------
  const dropZone          = document.getElementById('drop-zone');
  const fileInput         = document.getElementById('file-input');
  const fileListEl        = document.getElementById('file-list');
  const devicesSection    = document.getElementById('devices-section');
  const deviceListsEl     = document.getElementById('device-lists');
  const captionSection    = document.getElementById('caption-section');
  const captionEnabled    = document.getElementById('caption-enabled');
  const captionFields     = document.getElementById('caption-fields');
  const captionHeadline   = document.getElementById('caption-headline');
  const captionSubtitle   = document.getElementById('caption-subtitle');
  const captionPosition   = document.getElementById('caption-position');
  const captionBgColor    = document.getElementById('caption-bg-color');
  const captionTextColor  = document.getElementById('caption-text-color');
  const captionBgHex      = document.getElementById('caption-bg-hex');
  const captionTextHex    = document.getElementById('caption-text-hex');
  const outputSection     = document.getElementById('output-section');
  const generateBtn       = document.getElementById('generate-btn');
  const downloadAllBtn    = document.getElementById('download-all-btn');
  const progressContainer = document.getElementById('progress-bar-container');
  const progressBar       = document.getElementById('progress-bar');
  const progressText      = document.getElementById('progress-text');
  const outputGrid        = document.getElementById('output-grid');
  const qualitySlider     = document.getElementById('quality-slider');
  const qualityValue      = document.getElementById('quality-value');
  const outputFormat      = document.getElementById('output-format');
  const resizeMethod      = document.getElementById('resize-method');
  const sizeWarning       = document.getElementById('size-warning');

  // ---- Helpers ------------------------------------------------------------

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function mimeToExt(mime) {
    return mime === 'image/jpeg' ? '.jpg' : '.png';
  }

  function getOrientation() {
    return document.querySelector('input[name="orientation"]:checked').value;
  }

  function getSelectedDevices() {
    const checked = [];
    document.querySelectorAll('.device-checkbox:checked').forEach(cb => {
      const dev = DEVICES.find(d => d.id === cb.value);
      if (dev) checked.push(dev);
    });
    return checked;
  }

  function getDimensions(device) {
    const [pw, ph] = device.portrait;
    const orientation = getOrientation();
    // Mac, Watch, TV, Vision: always use the spec dimensions as-is
    if (FIXED_ORIENTATION_PLATFORMS.has(device.platform)) {
      return { w: pw, h: ph };
    }
    if (orientation === 'landscape') {
      return { w: ph, h: pw };
    }
    return { w: pw, h: ph };
  }

  function loadImage(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => resolve({ file, img, objectUrl: url });
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load ' + file.name)); };
      img.src = url;
    });
  }

  // ---- Build device selection UI ------------------------------------------

  function buildDeviceLists() {
    deviceListsEl.innerHTML = '';

    PLATFORMS.forEach(platform => {
      const listDiv = document.createElement('div');
      listDiv.className = 'device-list' + (platform.id === 'iphone' ? ' active' : '');
      listDiv.dataset.platform = platform.id;

      const devices = DEVICES.filter(d => d.platform === platform.id);
      devices.forEach(device => {
        const row = document.createElement('label');
        row.className = 'device-option';

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'device-checkbox';
        cb.value = device.id;
        if (device.badge === 'required' || device.badge === 'recommended') {
          cb.checked = true;
        }

        const info = document.createElement('div');
        info.className = 'device-option-info';

        const { w, h } = getDimensions(device);
        info.innerHTML =
          `<div class="device-option-name">${device.name}</div>` +
          `<div class="device-option-meta">${w} &times; ${h} &mdash; ${device.models}</div>`;

        row.appendChild(cb);
        row.appendChild(info);

        if (device.badge) {
          const badge = document.createElement('span');
          badge.className = 'badge badge-' + device.badge;
          badge.textContent = device.badge;
          row.appendChild(badge);
        }

        listDiv.appendChild(row);
      });

      deviceListsEl.appendChild(listDiv);
    });
  }

  function updateDeviceDimensions() {
    document.querySelectorAll('.device-option').forEach(row => {
      const cb = row.querySelector('.device-checkbox');
      const device = DEVICES.find(d => d.id === cb.value);
      if (!device) return;
      const { w, h } = getDimensions(device);
      const metaEl = row.querySelector('.device-option-meta');
      metaEl.innerHTML = `${w} &times; ${h} &mdash; ${device.models}`;
    });
  }

  // ---- Platform tab switching ---------------------------------------------

  document.querySelector('.platform-tabs').addEventListener('click', (e) => {
    const tab = e.target.closest('.platform-tab');
    if (!tab) return;

    document.querySelectorAll('.platform-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const platform = tab.dataset.platform;
    state.activePlatform = platform;

    document.querySelectorAll('.device-list').forEach(dl => dl.classList.remove('active'));
    const target = document.querySelector(`.device-list[data-platform="${platform}"]`);
    if (target) target.classList.add('active');
  });

  // ---- Orientation change -------------------------------------------------

  document.querySelectorAll('input[name="orientation"]').forEach(radio => {
    radio.addEventListener('change', () => {
      updateDeviceDimensions();
      checkSizeWarnings();
    });
  });

  // ---- Render file list ---------------------------------------------------

  function renderFileList() {
    if (state.files.length === 0) {
      fileListEl.hidden = true;
      devicesSection.hidden = true;
      captionSection.hidden = true;
      outputSection.hidden = true;
      return;
    }

    fileListEl.hidden = false;
    devicesSection.hidden = false;
    captionSection.hidden = false;
    outputSection.hidden = false;

    fileListEl.innerHTML = '';

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
        `<div class="file-meta">${entry.img.naturalWidth} &times; ${entry.img.naturalHeight} &middot; ${formatBytes(entry.file.size)}</div>`;

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

    checkSizeWarnings();
    // Re-init Lucide icons for dynamically created elements
    if (window.lucide) lucide.createIcons();
  }

  // ---- Size warnings ------------------------------------------------------

  function checkSizeWarnings() {
    if (state.files.length === 0) {
      sizeWarning.hidden = true;
      return;
    }

    const selectedDevices = getSelectedDevices();
    if (selectedDevices.length === 0) {
      sizeWarning.hidden = true;
      return;
    }

    const warnings = [];
    for (const entry of state.files) {
      const srcW = entry.img.naturalWidth;
      const srcH = entry.img.naturalHeight;
      for (const device of selectedDevices) {
        const { w, h } = getDimensions(device);
        // Warn if upscaling significantly (source is much smaller than target)
        if (srcW < w * 0.5 || srcH < h * 0.5) {
          warnings.push(`"${entry.file.name}" (${srcW}×${srcH}) is much smaller than ${device.name} (${w}×${h}) — output may look blurry.`);
        }
      }
    }

    if (warnings.length > 0) {
      sizeWarning.hidden = false;
      sizeWarning.textContent = warnings.slice(0, 3).join(' ');
      if (warnings.length > 3) {
        sizeWarning.textContent += ` …and ${warnings.length - 3} more warning(s).`;
      }
    } else {
      sizeWarning.hidden = true;
    }
  }

  // ---- Canvas resize with multi-step down-scaling -------------------------

  function resizeToCanvas(img, targetW, targetH, method) {
    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const srcW = img.naturalWidth;
    const srcH = img.naturalHeight;

    if (method === 'stretch') {
      // Stretch source to fill target exactly
      stepDownDraw(ctx, img, srcW, srcH, targetW, targetH);
    } else if (method === 'fill') {
      // Crop center: fill entire target, clip overflow
      const scale = Math.max(targetW / srcW, targetH / srcH);
      const sw = targetW / scale;
      const sh = targetH / scale;
      const sx = (srcW - sw) / 2;
      const sy = (srcH - sh) / 2;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
    } else {
      // Fit: letterbox with white background (no transparency allowed)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetW, targetH);
      const scale = Math.min(targetW / srcW, targetH / srcH);
      const dw = Math.round(srcW * scale);
      const dh = Math.round(srcH * scale);
      const dx = Math.round((targetW - dw) / 2);
      const dy = Math.round((targetH - dh) / 2);
      stepDownDraw(ctx, img, srcW, srcH, dw, dh, dx, dy);
    }

    return canvas;
  }

  function stepDownDraw(ctx, source, srcW, srcH, destW, destH, dx, dy) {
    dx = dx || 0;
    dy = dy || 0;

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

      ctx.drawImage(curSource, 0, 0, curW, curH, dx, dy, destW, destH);
    } else {
      ctx.drawImage(source, 0, 0, srcW, srcH, dx, dy, destW, destH);
    }
  }

  // ---- Caption helpers ----------------------------------------------------

  function getCaptionConfig() {
    if (!captionEnabled.checked) return null;
    const headline = captionHeadline.value.trim();
    if (!headline) return null;
    return {
      headline,
      subtitle: captionSubtitle.value.trim(),
      position: captionPosition.value,  // 'top' or 'bottom'
      bgColor: captionBgColor.value,
      textColor: captionTextColor.value,
    };
  }

  /**
   * Calculate font sizes based on canvas width to meet Apple readability.
   * Apple recommends text be clearly legible on device — roughly equivalent
   * to 40pt+ at 1x on iPhone. We scale proportionally by canvas width.
   */
  function getCaptionFontSizes(canvasW, canvasH) {
    // Headline: ~5.7% of width, subtitle: ~3.3% of width
    // These ratios produce large, readable text across all device sizes.
    const headline = Math.max(Math.round(canvasW * 0.057), 32);
    const subtitle = Math.max(Math.round(canvasW * 0.033), 22);
    // Caption area height: 25% of total canvas
    const areaHeight = Math.round(canvasH * 0.25);
    return { headline, subtitle, areaHeight };
  }

  /**
   * Draw caption text on canvas at the specified position.
   * Wraps long lines to prevent text from overflowing.
   */
  function drawCaption(ctx, canvasW, canvasH, caption) {
    const sizes = getCaptionFontSizes(canvasW, canvasH);
    const position = caption.position;

    // Caption area Y position
    const areaY = position === 'top' ? 0 : canvasH - sizes.areaHeight;

    // Draw background
    ctx.fillStyle = caption.bgColor;
    ctx.fillRect(0, areaY, canvasW, sizes.areaHeight);

    // Text setup
    ctx.fillStyle = caption.textColor;
    ctx.textAlign = 'center';
    const centerX = canvasW / 2;
    const maxTextWidth = canvasW * 0.85;

    // Vertical layout within caption area
    const hasSubtitle = caption.subtitle.length > 0;
    const lineGap = Math.round(sizes.headline * 0.35);

    // Draw headline (bold)
    ctx.font = `800 ${sizes.headline}px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    const headlineLines = wrapText(ctx, caption.headline, maxTextWidth);

    // Draw subtitle (regular weight)
    ctx.font = `500 ${sizes.subtitle}px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    const subtitleLines = hasSubtitle ? wrapText(ctx, caption.subtitle, maxTextWidth) : [];

    // Calculate total text block height for vertical centering
    const headlineBlockH = headlineLines.length * (sizes.headline * 1.2);
    const subtitleBlockH = subtitleLines.length * (sizes.subtitle * 1.2);
    const totalTextH = headlineBlockH + (hasSubtitle ? lineGap + subtitleBlockH : 0);
    let textY = areaY + (sizes.areaHeight - totalTextH) / 2 + sizes.headline;

    // Draw headline lines
    ctx.font = `800 ${sizes.headline}px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.textBaseline = 'alphabetic';
    for (const line of headlineLines) {
      ctx.fillText(line, centerX, textY);
      textY += sizes.headline * 1.2;
    }

    // Draw subtitle lines
    if (hasSubtitle) {
      textY += lineGap - sizes.headline * 0.2;
      ctx.font = `500 ${sizes.subtitle}px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      for (const line of subtitleLines) {
        ctx.fillText(line, centerX, textY);
        textY += sizes.subtitle * 1.2;
      }
    }
  }

  /**
   * Word-wrap text into lines that fit within maxWidth.
   */
  function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let current = '';

    for (const word of words) {
      const test = current ? current + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  // ---- Generate screenshots for one source + one device -------------------

  function generateScreenshot(entry, device) {
    return new Promise((resolve) => {
      const { w, h } = getDimensions(device);
      const method = resizeMethod.value;
      const caption = getCaptionConfig();

      let canvas;
      if (caption) {
        // With caption: allocate 25% to text area, 75% to image
        const sizes = getCaptionFontSizes(w, h);
        const imgH = h - sizes.areaHeight;

        // Resize image to fit the image portion of the canvas
        const imgCanvas = resizeToCanvas(entry.img, w, imgH, method);

        // Create final canvas at full device dimensions
        canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        // Fill entire canvas with caption background (avoids gaps)
        ctx.fillStyle = caption.bgColor;
        ctx.fillRect(0, 0, w, h);

        // Draw image in the non-caption area
        const imgY = caption.position === 'top' ? sizes.areaHeight : 0;
        ctx.drawImage(imgCanvas, 0, imgY);

        // Draw caption text
        drawCaption(ctx, w, h, caption);
      } else {
        canvas = resizeToCanvas(entry.img, w, h, method);
      }

      let mime = outputFormat.value;
      const quality = parseInt(qualitySlider.value, 10) / 100;

      canvas.toBlob((blob) => {
        const ext = mimeToExt(mime);
        const baseName = entry.file.name.replace(/\.[^.]+$/, '');
        const safeName = device.id.replace(/[^a-z0-9_]/g, '_');
        resolve({
          blob,
          name: `${baseName}_${safeName}${ext}`,
          width: w,
          height: h,
          deviceName: device.name,
          deviceId: device.id,
          sourceFile: entry.file.name,
        });
      }, mime, quality);
    });
  }

  // ---- Batch generate handler ---------------------------------------------

  async function handleGenerate() {
    const selectedDevices = getSelectedDevices();
    if (state.files.length === 0 || selectedDevices.length === 0) return;

    generateBtn.disabled = true;
    generateBtn.innerHTML = '<i data-lucide="loader-2"></i> Generating…';
    if (window.lucide) lucide.createIcons();
    downloadAllBtn.hidden = true;
    progressContainer.hidden = false;
    state.generated = [];

    const totalJobs = state.files.length * selectedDevices.length;
    let completed = 0;

    for (const entry of state.files) {
      for (const device of selectedDevices) {
        const result = await generateScreenshot(entry, device);
        state.generated.push(result);
        completed++;
        const pct = Math.round((completed / totalJobs) * 100);
        progressBar.style.setProperty('--progress', pct + '%');
        progressText.textContent = pct + '%';
      }
    }

    generateBtn.disabled = false;
    generateBtn.innerHTML = '<i data-lucide="wand-2"></i> Generate All Screenshots';
    if (window.lucide) lucide.createIcons();
    downloadAllBtn.hidden = false;

    renderOutput();
  }

  // ---- Render output grouped by device ------------------------------------

  function renderOutput() {
    outputGrid.innerHTML = '';

    // Group by device
    const groups = new Map();
    for (const item of state.generated) {
      if (!groups.has(item.deviceId)) {
        groups.set(item.deviceId, { device: DEVICES.find(d => d.id === item.deviceId), items: [] });
      }
      groups.get(item.deviceId).items.push(item);
    }

    for (const [, group] of groups) {
      const section = document.createElement('div');
      section.className = 'output-device-group';

      const { w, h } = getDimensions(group.device);
      const headerEl = document.createElement('div');
      headerEl.className = 'output-device-header';
      headerEl.innerHTML =
        `<h3>${group.device.name} <span class="device-dims">${w} &times; ${h}</span></h3>` +
        `<span class="file-meta">${group.items.length} screenshot${group.items.length > 1 ? 's' : ''}</span>`;

      const grid = document.createElement('div');
      grid.className = 'output-thumbnails';

      for (const item of group.items) {
        const card = document.createElement('div');
        card.className = 'output-thumb';

        const img = document.createElement('img');
        img.src = URL.createObjectURL(item.blob);
        img.alt = item.name;

        const body = document.createElement('div');
        body.className = 'output-thumb-body';
        body.innerHTML =
          `<div class="file-name">${item.name}</div>` +
          `<div class="file-meta">${formatBytes(item.blob.size)}</div>`;

        const dlBtn = document.createElement('button');
        dlBtn.className = 'btn btn-secondary btn-sm';
        dlBtn.textContent = 'Download';
        dlBtn.addEventListener('click', () => downloadBlob(item.blob, item.name));
        body.appendChild(dlBtn);

        card.append(img, body);
        grid.appendChild(card);
      }

      section.append(headerEl, grid);
      outputGrid.appendChild(section);
    }
  }

  function downloadBlob(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // ---- Download all as ZIP ------------------------------------------------

  async function handleDownloadAll() {
    if (state.generated.length === 0) return;

    downloadAllBtn.disabled = true;
    downloadAllBtn.innerHTML = '<i data-lucide="loader-2"></i> Zipping…';
    if (window.lucide) lucide.createIcons();

    const zip = new JSZip();
    for (const item of state.generated) {
      // Organize into folders per device
      const folder = item.deviceName.replace(/[^a-zA-Z0-9 ._-]/g, '').replace(/\s+/g, '_');
      zip.file(`${folder}/${item.name}`, item.blob);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(blob, 'appstore_screenshots.zip');

    downloadAllBtn.disabled = false;
    downloadAllBtn.innerHTML = '<i data-lucide="archive"></i> Download All (ZIP)';
    if (window.lucide) lucide.createIcons();
  }

  // ---- Event listeners ----------------------------------------------------

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
    const files = [...e.dataTransfer.files].filter(f =>
      f.type === 'image/png' || f.type === 'image/jpeg'
    );
    await addFiles(files);
  });

  dropZone.addEventListener('click', (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'LABEL') fileInput.click();
  });

  fileInput.addEventListener('change', async () => {
    const files = [...fileInput.files];
    await addFiles(files);
    fileInput.value = '';
  });

  async function addFiles(files) {
    if (files.length === 0) return;
    const entries = await Promise.all(files.map(loadImage));
    state.files.push(...entries);
    renderFileList();
  }

  // Caption toggle & color sync
  captionEnabled.addEventListener('change', () => {
    captionFields.hidden = !captionEnabled.checked;
    if (window.lucide) lucide.createIcons();
  });

  captionBgColor.addEventListener('input', () => {
    captionBgHex.textContent = captionBgColor.value;
  });

  captionTextColor.addEventListener('input', () => {
    captionTextHex.textContent = captionTextColor.value;
  });

  // Quality slider
  qualitySlider.addEventListener('input', () => {
    qualityValue.textContent = qualitySlider.value;
  });

  // Action buttons
  generateBtn.addEventListener('click', handleGenerate);
  downloadAllBtn.addEventListener('click', handleDownloadAll);

  // ---- Init ---------------------------------------------------------------
  buildDeviceLists();
})();
