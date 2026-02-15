// ---------------------------------------------------------------------------
// App Store Screenshot Generator – app.js
// All device specs from Apple's official App Store Connect documentation.
// ---------------------------------------------------------------------------

(function () {
  'use strict';

  // ---- App Store Connect Device Specifications ----------------------------
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

  const FIXED_ORIENTATION_PLATFORMS = new Set(['mac', 'watch', 'tv', 'vision']);

  // ---- Theme Presets ------------------------------------------------------
  const THEMES = [
    { name: 'Midnight',  bg1: '#0f0c29', bg2: '#302b63', text: '#ffffff' },
    { name: 'Ocean',     bg1: '#2193b0', bg2: '#6dd5ed', text: '#ffffff' },
    { name: 'Sunset',    bg1: '#ee0979', bg2: '#ff6a00', text: '#ffffff' },
    { name: 'Forest',    bg1: '#134e5e', bg2: '#71b280', text: '#ffffff' },
    { name: 'Lavender',  bg1: '#7b2ff7', bg2: '#c850c0', text: '#ffffff' },
    { name: 'Minimal',   bg1: '#f5f5f7', bg2: '#f5f5f7', text: '#1d1d1f' },
    { name: 'Dark',      bg1: '#1a1a1e', bg2: '#2d2d35', text: '#ffffff' },
    { name: 'Rose',      bg1: '#ff9a9e', bg2: '#fecfef', text: '#2d1b33' },
  ];

  // ---- State --------------------------------------------------------------
  const state = {
    files: [],
    generated: [],
    activePlatform: 'iphone',
  };

  // ---- DOM refs -----------------------------------------------------------
  const dropZone          = document.getElementById('drop-zone');
  const fileInput         = document.getElementById('file-input');
  const fileListEl        = document.getElementById('file-list');
  const devicesSection    = document.getElementById('devices-section');
  const deviceListsEl     = document.getElementById('device-lists');
  const designSection     = document.getElementById('design-section');
  const designEnabled     = document.getElementById('design-enabled');
  const designFields      = document.getElementById('design-fields');
  const captionHeadline   = document.getElementById('caption-headline');
  const captionSubtitle   = document.getElementById('caption-subtitle');
  const captionPosition   = document.getElementById('caption-position');
  const bgTypeSelect      = document.getElementById('bg-type');
  const bgColor1          = document.getElementById('bg-color-1');
  const bgColor2          = document.getElementById('bg-color-2');
  const bgHex1            = document.getElementById('bg-hex-1');
  const bgHex2            = document.getElementById('bg-hex-2');
  const bgColor2Group     = document.getElementById('bg-color-2-group');
  const textColorInput    = document.getElementById('text-color');
  const textHex           = document.getElementById('text-hex');
  const deviceFrameEnabled = document.getElementById('device-frame-enabled');
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

  // ---- Theme presets UI ---------------------------------------------------

  function buildThemePresets() {
    const container = document.getElementById('theme-presets');
    THEMES.forEach((theme, i) => {
      const btn = document.createElement('button');
      btn.className = 'theme-swatch' + (i === 0 ? ' active' : '');
      btn.title = theme.name;
      btn.dataset.index = i;
      btn.style.background = theme.bg1 === theme.bg2
        ? theme.bg1
        : `linear-gradient(135deg, ${theme.bg1}, ${theme.bg2})`;

      const label = document.createElement('span');
      label.className = 'theme-swatch-label';
      label.textContent = theme.name;
      btn.appendChild(label);

      btn.addEventListener('click', () => applyTheme(i));
      container.appendChild(btn);
    });
  }

  function applyTheme(index) {
    const theme = THEMES[index];
    bgColor1.value = theme.bg1;
    bgColor2.value = theme.bg2;
    textColorInput.value = theme.text;
    bgHex1.textContent = theme.bg1;
    bgHex2.textContent = theme.bg2;
    textHex.textContent = theme.text;
    bgTypeSelect.value = theme.bg1 === theme.bg2 ? 'solid' : 'gradient';
    updateBgTypeUI();

    document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.theme-swatch')[index]?.classList.add('active');
  }

  function updateBgTypeUI() {
    bgColor2Group.style.display = bgTypeSelect.value === 'solid' ? 'none' : '';
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
      designSection.hidden = true;
      outputSection.hidden = true;
      return;
    }

    fileListEl.hidden = false;
    devicesSection.hidden = false;
    designSection.hidden = false;
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
      stepDownDraw(ctx, img, srcW, srcH, targetW, targetH);
    } else if (method === 'fill') {
      const scale = Math.max(targetW / srcW, targetH / srcH);
      const sw = targetW / scale;
      const sh = targetH / scale;
      const sx = (srcW - sw) / 2;
      const sy = (srcH - sh) / 2;
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
    } else {
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

  // ---- Drawing helpers ----------------------------------------------------

  function drawRoundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

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

  // ---- Design config ------------------------------------------------------

  function getDesignConfig() {
    if (!designEnabled.checked) return null;
    return {
      headline: captionHeadline.value.trim(),
      subtitle: captionSubtitle.value.trim(),
      position: captionPosition.value,
      bgType: bgTypeSelect.value,
      bgColor1: bgColor1.value,
      bgColor2: bgColor2.value,
      textColor: textColorInput.value,
      deviceFrame: deviceFrameEnabled.checked,
    };
  }

  // ---- Draw background gradient/solid -------------------------------------

  function drawBackground(ctx, w, h, design) {
    if (design.bgType === 'gradient') {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, design.bgColor1);
      grad.addColorStop(1, design.bgColor2);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = design.bgColor1;
    }
    ctx.fillRect(0, 0, w, h);
  }

  // ---- Draw device frame with screenshot inside ---------------------------

  function drawDeviceWithScreenshot(ctx, img, areaY, areaW, areaH, platform) {
    const padding = areaW * 0.06;
    const maxFrameW = areaW - padding * 2;
    const maxFrameH = areaH - padding * 2;

    // Aspect ratios for device frames (width/height)
    let frameAspect;
    if (platform === 'ipad') {
      frameAspect = 0.72;
    } else if (platform === 'mac') {
      frameAspect = 1.6; // landscape
    } else {
      frameAspect = 0.49; // iPhone-like for phone/watch
    }

    let frameW, frameH;

    if (platform === 'mac') {
      // Mac: landscape frame
      frameW = Math.min(maxFrameW * 0.85, maxFrameH * frameAspect);
      frameH = frameW / frameAspect;
      if (frameH > maxFrameH * 0.85) {
        frameH = maxFrameH * 0.85;
        frameW = frameH * frameAspect;
      }
    } else {
      // Portrait devices
      frameH = maxFrameH;
      frameW = frameH * frameAspect;

      if (frameW > maxFrameW) {
        frameW = maxFrameW;
        frameH = frameW / frameAspect;
      }

      // Limit width for phones to look proportional
      if ((platform === 'iphone' || platform === 'watch') && frameW > areaW * 0.52) {
        frameW = areaW * 0.52;
        frameH = frameW / frameAspect;
      }
    }

    // Center frame in area
    const frameX = (areaW - frameW) / 2;
    const frameY = areaY + (areaH - frameH) / 2;

    // Device body proportions
    const cornerR = platform === 'mac' ? frameW * 0.02 : frameW * 0.07;
    const bezelSide = frameW * 0.022;
    const bezelTop = platform === 'mac' ? frameH * 0.03 : frameH * 0.015;
    const bezelBottom = platform === 'mac' ? frameH * 0.03 : frameH * 0.015;

    // Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = frameW * 0.06;
    ctx.shadowOffsetY = frameW * 0.02;

    // Device body
    ctx.fillStyle = '#1a1a1a';
    drawRoundedRect(ctx, frameX, frameY, frameW, frameH, cornerR);
    ctx.fill();
    ctx.restore();

    // Subtle border highlight
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, frameX, frameY, frameW, frameH, cornerR);
    ctx.stroke();

    // Side button details for iPhone
    if (platform === 'iphone') {
      ctx.fillStyle = '#2a2a2a';
      // Power button (right side)
      const btnW = 3;
      const btnH = frameH * 0.06;
      const btnX = frameX + frameW;
      const btnY = frameY + frameH * 0.22;
      drawRoundedRect(ctx, btnX, btnY, btnW, btnH, 1.5);
      ctx.fill();
      // Volume buttons (left side)
      const volBtnH = frameH * 0.04;
      ctx.fillStyle = '#2a2a2a';
      drawRoundedRect(ctx, frameX - btnW, frameY + frameH * 0.18, btnW, volBtnH, 1.5);
      ctx.fill();
      drawRoundedRect(ctx, frameX - btnW, frameY + frameH * 0.24, btnW, volBtnH, 1.5);
      ctx.fill();
    }

    // Screen area
    const screenX = frameX + bezelSide;
    const screenY = frameY + bezelTop;
    const screenW = frameW - bezelSide * 2;
    const screenH = frameH - bezelTop - bezelBottom;
    const screenCornerR = cornerR * 0.85;

    // Draw screenshot into screen area (fill/crop to fit)
    ctx.save();
    drawRoundedRect(ctx, screenX, screenY, screenW, screenH, screenCornerR);
    ctx.clip();

    const srcW = img.naturalWidth;
    const srcH = img.naturalHeight;
    const scale = Math.max(screenW / srcW, screenH / srcH);
    const drawW = srcW * scale;
    const drawH = srcH * scale;
    const drawX = screenX + (screenW - drawW) / 2;
    const drawY = screenY + (screenH - drawH) / 2;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();

    // Dynamic Island (iPhone)
    if (platform === 'iphone') {
      const pillW = frameW * 0.22;
      const pillH = frameW * 0.03;
      const pillX = frameX + (frameW - pillW) / 2;
      const pillY = screenY + screenH * 0.012;
      ctx.fillStyle = '#000000';
      drawRoundedRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
      ctx.fill();
    }

    // Home indicator bar (iPhone/iPad)
    if (platform === 'iphone' || platform === 'ipad') {
      const barW = frameW * 0.30;
      const barH = frameW * 0.012;
      const barX = frameX + (frameW - barW) / 2;
      const barY = screenY + screenH - screenH * 0.025;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      drawRoundedRect(ctx, barX, barY, barW, barH, barH / 2);
      ctx.fill();
    }

    // Mac: draw keyboard/base area
    if (platform === 'mac') {
      const baseH = frameH * 0.04;
      const baseY = frameY + frameH;
      const baseW = frameW * 1.05;
      const baseX = frameX - (baseW - frameW) / 2;
      ctx.fillStyle = '#2a2a2a';
      drawRoundedRect(ctx, baseX, baseY, baseW, baseH, baseH * 0.4);
      ctx.fill();
      // Hinge line
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(frameX, baseY);
      ctx.lineTo(frameX + frameW, baseY);
      ctx.stroke();
    }
  }

  // ---- Draw caption text --------------------------------------------------

  function drawCaptionText(ctx, canvasW, captionY, captionH, design) {
    const headlineSize = Math.max(Math.round(canvasW * 0.057), 32);
    const subtitleSize = Math.max(Math.round(canvasW * 0.033), 22);
    const fontStack = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    ctx.fillStyle = design.textColor;
    ctx.textAlign = 'center';
    const centerX = canvasW / 2;
    const maxTextWidth = canvasW * 0.85;

    const hasSubtitle = design.subtitle.length > 0;
    const lineGap = Math.round(headlineSize * 0.35);

    // Measure headline
    ctx.font = `800 ${headlineSize}px ${fontStack}`;
    const headlineLines = wrapText(ctx, design.headline, maxTextWidth);

    // Measure subtitle
    ctx.font = `500 ${subtitleSize}px ${fontStack}`;
    const subtitleLines = hasSubtitle ? wrapText(ctx, design.subtitle, maxTextWidth) : [];

    // Calculate total block height for vertical centering
    const headlineBlockH = headlineLines.length * (headlineSize * 1.2);
    const subtitleBlockH = subtitleLines.length * (subtitleSize * 1.2);
    const totalTextH = headlineBlockH + (hasSubtitle ? lineGap + subtitleBlockH : 0);
    let textY = captionY + (captionH - totalTextH) / 2 + headlineSize;

    // Draw headline
    ctx.font = `800 ${headlineSize}px ${fontStack}`;
    ctx.textBaseline = 'alphabetic';
    for (const line of headlineLines) {
      ctx.fillText(line, centerX, textY);
      textY += headlineSize * 1.2;
    }

    // Draw subtitle
    if (hasSubtitle) {
      textY += lineGap - headlineSize * 0.2;
      ctx.font = `500 ${subtitleSize}px ${fontStack}`;
      for (const line of subtitleLines) {
        ctx.fillText(line, centerX, textY);
        textY += subtitleSize * 1.2;
      }
    }
  }

  // ---- Generate screenshots for one source + one device -------------------

  function generateScreenshot(entry, device) {
    return new Promise((resolve) => {
      const { w, h } = getDimensions(device);
      const method = resizeMethod.value;
      const design = getDesignConfig();

      let canvas;

      if (design) {
        canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // 1. Draw gradient/solid background
        drawBackground(ctx, w, h, design);

        // 2. Calculate layout
        const hasCaption = design.headline.length > 0;
        const captionRatio = hasCaption ? 0.22 : 0;
        const captionH = Math.round(h * captionRatio);
        const contentH = h - captionH;
        const contentY = design.position === 'top' ? captionH : 0;

        // 3. Draw screenshot (with or without device frame)
        if (design.deviceFrame) {
          drawDeviceWithScreenshot(ctx, entry.img, contentY, w, contentH, device.platform);
        } else {
          // No frame: draw image into content area
          const imgCanvas = resizeToCanvas(entry.img, w, contentH, method);
          ctx.drawImage(imgCanvas, 0, contentY);
        }

        // 4. Draw caption text
        if (hasCaption) {
          const captionY = design.position === 'top' ? 0 : contentH;
          drawCaptionText(ctx, w, captionY, captionH, design);
        }
      } else {
        // No design: plain resize
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

  // Design toggle & controls
  designEnabled.addEventListener('change', () => {
    designFields.hidden = !designEnabled.checked;
    if (window.lucide) lucide.createIcons();
  });

  bgTypeSelect.addEventListener('change', () => {
    updateBgTypeUI();
    document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
  });

  bgColor1.addEventListener('input', () => {
    bgHex1.textContent = bgColor1.value;
    document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
  });

  bgColor2.addEventListener('input', () => {
    bgHex2.textContent = bgColor2.value;
    document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
  });

  textColorInput.addEventListener('input', () => {
    textHex.textContent = textColorInput.value;
    document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
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
  buildThemePresets();
  updateBgTypeUI();
})();
