// ---------------------------------------------------------------------------
// ScreenForge — Professional Screenshot Designer
// Supports App Store Connect + Google Play Store
// ---------------------------------------------------------------------------

(function () {
  'use strict';

  // ---- Device Specifications ------------------------------------------------
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

    // --- Android Phone (Google Play) ---
    { id: 'android_phone_1080', name: 'Phone 1080p', platform: 'android_phone', portrait: [1080, 1920],
      models: 'Most Android phones (xxhdpi)', badge: 'required' },
    { id: 'android_phone_1440', name: 'Phone 1440p', platform: 'android_phone', portrait: [1440, 2560],
      models: 'Samsung Galaxy S series, Pixel Pro', badge: 'recommended' },
    { id: 'android_phone_1080_2400', name: 'Phone 20:9', platform: 'android_phone', portrait: [1080, 2400],
      models: 'Modern tall-screen phones (Pixel 7, Samsung A series)', badge: 'recommended' },
    { id: 'android_phone_1080_2340', name: 'Phone 19.5:9', platform: 'android_phone', portrait: [1080, 2340],
      models: 'Pixel 6, OnePlus, Xiaomi', badge: null },
    { id: 'android_phone_1284_2778', name: 'Phone Pixel 9 Pro', platform: 'android_phone', portrait: [1284, 2778],
      models: 'Google Pixel 9 Pro, Pixel 8 Pro', badge: null },

    // --- Android Tablet (Google Play) ---
    { id: 'android_tablet_1200', name: 'Tablet 1200×1920', platform: 'android_tablet', portrait: [1200, 1920],
      models: 'Standard 10″ Android tablets', badge: 'required' },
    { id: 'android_tablet_1600', name: 'Tablet 1600×2560', platform: 'android_tablet', portrait: [1600, 2560],
      models: 'Samsung Galaxy Tab S series', badge: 'recommended' },
    { id: 'android_tablet_800', name: 'Tablet 800×1280', platform: 'android_tablet', portrait: [800, 1280],
      models: '7″ tablets, Nexus 7', badge: null },
    { id: 'android_tablet_2000_1200', name: 'Tablet 10.5″ Wide', platform: 'android_tablet', portrait: [1200, 2000],
      models: 'Pixel Tablet, Samsung Tab S9 FE', badge: null },
  ];

  const PLATFORMS = [
    { id: 'iphone',         label: 'iPhone' },
    { id: 'ipad',           label: 'iPad' },
    { id: 'mac',            label: 'Mac' },
    { id: 'watch',          label: 'Apple Watch' },
    { id: 'tv',             label: 'Apple TV' },
    { id: 'vision',         label: 'Vision Pro' },
    { id: 'android_phone',  label: 'Android Phone' },
    { id: 'android_tablet', label: 'Android Tablet' },
  ];

  const FIXED_ORIENTATION_PLATFORMS = new Set(['mac', 'watch', 'tv', 'vision']);

  // ---- Layout Templates ----------------------------------------------------
  const LAYOUTS = [
    { id: 'centered',   name: 'Centered',    icon: '▣', desc: 'Device centered with caption above/below' },
    { id: 'fullbleed',  name: 'Full Bleed',  icon: '▪', desc: 'Screenshot fills entire canvas, caption overlay' },
    { id: 'offset',     name: 'Offset',      icon: '◧', desc: 'Device shifted to one side, text on the other' },
    { id: 'panoramic',  name: 'Panoramic',   icon: '▬', desc: 'Wide cinematic layout with device and text side-by-side' },
    { id: 'minimal',    name: 'Minimal',     icon: '○', desc: 'Clean, lots of whitespace, small device' },
    { id: 'stacked',    name: 'Stacked',     icon: '≡', desc: 'Large text block above, screenshot below' },
  ];

  // ---- Theme Presets -------------------------------------------------------
  const THEMES = [
    { name: 'Midnight',  bg1: '#0f0c29', bg2: '#302b63', text: '#ffffff' },
    { name: 'Ocean',     bg1: '#2193b0', bg2: '#6dd5ed', text: '#ffffff' },
    { name: 'Sunset',    bg1: '#ee0979', bg2: '#ff6a00', text: '#ffffff' },
    { name: 'Forest',    bg1: '#134e5e', bg2: '#71b280', text: '#ffffff' },
    { name: 'Lavender',  bg1: '#7b2ff7', bg2: '#c850c0', text: '#ffffff' },
    { name: 'Minimal',   bg1: '#f5f5f7', bg2: '#f5f5f7', text: '#1d1d1f' },
    { name: 'Dark',      bg1: '#1a1a1e', bg2: '#2d2d35', text: '#ffffff' },
    { name: 'Rose',      bg1: '#ff9a9e', bg2: '#fecfef', text: '#2d1b33' },
    { name: 'Emerald',   bg1: '#0d9488', bg2: '#2dd4bf', text: '#ffffff' },
    { name: 'Slate',     bg1: '#334155', bg2: '#64748b', text: '#f1f5f9' },
    { name: 'Coral',     bg1: '#f43f5e', bg2: '#fb7185', text: '#ffffff' },
    { name: 'Indigo',    bg1: '#312e81', bg2: '#6366f1', text: '#ffffff' },
  ];

  // ---- Frame Colors --------------------------------------------------------
  const FRAME_COLORS = {
    black:  { body: '#1a1a1a', border: 'rgba(255,255,255,0.1)', buttons: '#2a2a2a' },
    silver: { body: '#c0c0c8', border: 'rgba(255,255,255,0.3)', buttons: '#a0a0a8' },
    gold:   { body: '#d4a853', border: 'rgba(255,255,255,0.2)', buttons: '#b8943a' },
    blue:   { body: '#2a4d7f', border: 'rgba(100,150,255,0.2)', buttons: '#1e3a5f' },
  };

  // ---- State ---------------------------------------------------------------
  const state = {
    files: [],
    generated: [],
    activePlatform: 'iphone',
    activeLayout: 'centered',
    perImageCaptions: {},
    previewDebounce: null,
  };

  // ---- DOM refs ------------------------------------------------------------
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
  const bgPattern         = document.getElementById('bg-pattern');
  const deviceFrameEnabled = document.getElementById('device-frame-enabled');
  const frameShadow       = document.getElementById('frame-shadow');
  const frameScale        = document.getElementById('frame-scale');
  const frameColor        = document.getElementById('frame-color');
  const frameOptions      = document.getElementById('frame-options');
  const outputSection     = document.getElementById('output-section');
  const previewSection    = document.getElementById('preview-section');
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
  const previewCanvas     = document.getElementById('preview-canvas');
  const previewImageSelect = document.getElementById('preview-image-select');
  const previewDeviceSelect = document.getElementById('preview-device-select');
  const refreshPreviewBtn = document.getElementById('refresh-preview-btn');
  const perImageCaptionsEl = document.getElementById('per-image-captions');
  const globalCaptionsEl  = document.getElementById('global-captions');

  // ---- Helpers -------------------------------------------------------------

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

  function getCaptionMode() {
    return document.querySelector('input[name="caption-mode"]:checked').value;
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

  // ---- Build device selection UI -------------------------------------------

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

  // ---- Layout template UI --------------------------------------------------

  function buildLayoutTemplates() {
    const container = document.getElementById('layout-templates');
    LAYOUTS.forEach((layout, i) => {
      const btn = document.createElement('button');
      btn.className = 'layout-btn' + (i === 0 ? ' active' : '');
      btn.dataset.layout = layout.id;
      btn.title = layout.desc;
      btn.innerHTML =
        `<span class="layout-icon">${layout.icon}</span>` +
        `<span class="layout-name">${layout.name}</span>`;
      btn.addEventListener('click', () => {
        state.activeLayout = layout.id;
        document.querySelectorAll('.layout-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        schedulePreview();
      });
      container.appendChild(btn);
    });
  }

  // ---- Theme presets UI ----------------------------------------------------

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
    schedulePreview();
  }

  function updateBgTypeUI() {
    bgColor2Group.style.display = bgTypeSelect.value === 'solid' ? 'none' : '';
  }

  // ---- Per-image captions --------------------------------------------------

  function buildPerImageCaptions() {
    perImageCaptionsEl.innerHTML = '';
    if (state.files.length === 0) return;

    state.files.forEach((entry, i) => {
      const id = entry.file.name;
      if (!state.perImageCaptions[id]) {
        state.perImageCaptions[id] = { headline: '', subtitle: '' };
      }
      const row = document.createElement('div');
      row.className = 'per-image-caption-row';
      row.innerHTML =
        `<div class="per-image-label">` +
          `<img src="${entry.objectUrl}" alt="${entry.file.name}" class="per-image-thumb">` +
          `<span class="per-image-name">${entry.file.name}</span>` +
        `</div>` +
        `<div class="per-image-inputs">` +
          `<input type="text" placeholder="Headline for this screenshot" maxlength="60" data-file="${id}" data-field="headline" value="${state.perImageCaptions[id].headline}">` +
          `<input type="text" placeholder="Subtitle (optional)" maxlength="80" data-file="${id}" data-field="subtitle" value="${state.perImageCaptions[id].subtitle}">` +
        `</div>`;
      perImageCaptionsEl.appendChild(row);
    });

    perImageCaptionsEl.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', () => {
        const fileId = inp.dataset.file;
        const field = inp.dataset.field;
        if (!state.perImageCaptions[fileId]) state.perImageCaptions[fileId] = {};
        state.perImageCaptions[fileId][field] = inp.value;
      });
    });
  }

  // ---- Platform tab switching ----------------------------------------------

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

  // ---- Orientation change --------------------------------------------------

  document.querySelectorAll('input[name="orientation"]').forEach(radio => {
    radio.addEventListener('change', () => {
      updateDeviceDimensions();
      checkSizeWarnings();
      updatePreviewSelects();
      schedulePreview();
    });
  });

  // ---- Caption mode toggle -------------------------------------------------

  document.querySelectorAll('input[name="caption-mode"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const mode = getCaptionMode();
      globalCaptionsEl.hidden = mode !== 'global';
      perImageCaptionsEl.hidden = mode !== 'per-image';
      if (mode === 'per-image') buildPerImageCaptions();
    });
  });

  // ---- Render file list ----------------------------------------------------

  function renderFileList() {
    if (state.files.length === 0) {
      fileListEl.hidden = true;
      devicesSection.hidden = true;
      designSection.hidden = true;
      previewSection.hidden = true;
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
      state.perImageCaptions = {};
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
        delete state.perImageCaptions[entry.file.name];
        state.files.splice(i, 1);
        renderFileList();
      });

      div.append(thumb, info, removeBtn);
      fileListEl.appendChild(div);
    });

    checkSizeWarnings();
    updatePreviewSelects();
    if (getCaptionMode() === 'per-image') buildPerImageCaptions();
    if (window.lucide) lucide.createIcons();
  }

  // ---- Size warnings -------------------------------------------------------

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

  // ---- Canvas resize with multi-step down-scaling --------------------------

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

  // ---- Drawing helpers -----------------------------------------------------

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

  // ---- Design config -------------------------------------------------------

  function getDesignConfig(entry) {
    if (!designEnabled.checked) return null;

    let headline, subtitle;
    if (getCaptionMode() === 'per-image' && entry) {
      const captions = state.perImageCaptions[entry.file.name] || {};
      headline = (captions.headline || '').trim();
      subtitle = (captions.subtitle || '').trim();
    } else {
      headline = captionHeadline.value.trim();
      subtitle = captionSubtitle.value.trim();
    }

    return {
      headline,
      subtitle,
      position: captionPosition.value,
      bgType: bgTypeSelect.value,
      bgColor1: bgColor1.value,
      bgColor2: bgColor2.value,
      textColor: textColorInput.value,
      pattern: bgPattern.value,
      deviceFrame: deviceFrameEnabled.checked,
      layout: state.activeLayout,
      frameShadow: parseInt(frameShadow.value, 10) / 100,
      frameScale: parseInt(frameScale.value, 10) / 100,
      frameColor: frameColor.value,
    };
  }

  // ---- Draw background gradient/solid + pattern ----------------------------

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

    // Draw pattern overlay
    if (design.pattern && design.pattern !== 'none') {
      drawPattern(ctx, w, h, design.pattern);
    }
  }

  function drawPattern(ctx, w, h, pattern) {
    ctx.save();
    ctx.globalAlpha = 0.06;

    if (pattern === 'dots') {
      const spacing = Math.max(w * 0.025, 20);
      ctx.fillStyle = '#ffffff';
      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, spacing * 0.12, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (pattern === 'grid') {
      const spacing = Math.max(w * 0.04, 30);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      for (let x = spacing; x < w; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = spacing; y < h; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    } else if (pattern === 'diagonal') {
      const spacing = Math.max(w * 0.035, 25);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      for (let i = -h; i < w + h; i += spacing) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + h, h);
        ctx.stroke();
      }
    } else if (pattern === 'waves') {
      const spacing = Math.max(h * 0.08, 40);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      for (let y = spacing; y < h; y += spacing) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const wave = Math.sin((x / w) * Math.PI * 4) * (spacing * 0.3);
          if (x === 0) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }
        ctx.stroke();
      }
    } else if (pattern === 'circles') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.sqrt(w * w + h * h) / 2;
      const spacing = Math.max(w * 0.06, 40);
      for (let r = spacing; r < maxR; r += spacing) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // ---- Draw device frame ---------------------------------------------------

  function drawDeviceWithScreenshot(ctx, img, areaX, areaY, areaW, areaH, platform, design) {
    const scaleFactor = design ? design.frameScale : 0.85;
    const shadowIntensity = design ? design.frameShadow : 0.6;
    const colorScheme = FRAME_COLORS[(design && design.frameColor) || 'black'];

    const padding = areaW * 0.06;
    const maxFrameW = areaW - padding * 2;
    const maxFrameH = areaH - padding * 2;

    let frameAspect;
    if (platform === 'ipad') {
      frameAspect = 0.72;
    } else if (platform === 'mac') {
      frameAspect = 1.6;
    } else if (platform === 'android_phone') {
      frameAspect = 0.47;
    } else if (platform === 'android_tablet') {
      frameAspect = 0.68;
    } else {
      frameAspect = 0.49;
    }

    let frameW, frameH;

    if (platform === 'mac') {
      frameW = Math.min(maxFrameW * scaleFactor, maxFrameH * frameAspect);
      frameH = frameW / frameAspect;
      if (frameH > maxFrameH * scaleFactor) {
        frameH = maxFrameH * scaleFactor;
        frameW = frameH * frameAspect;
      }
    } else {
      frameH = maxFrameH * scaleFactor;
      frameW = frameH * frameAspect;

      if (frameW > maxFrameW) {
        frameW = maxFrameW;
        frameH = frameW / frameAspect;
      }

      if ((platform === 'iphone' || platform === 'watch' || platform === 'android_phone') && frameW > areaW * 0.52) {
        frameW = areaW * 0.52;
        frameH = frameW / frameAspect;
      }
    }

    const frameX = areaX + (areaW - frameW) / 2;
    const frameY = areaY + (areaH - frameH) / 2;

    const cornerR = platform === 'mac' ? frameW * 0.02 : frameW * 0.07;
    const bezelSide = frameW * 0.022;
    const bezelTop = platform === 'mac' ? frameH * 0.03 : frameH * 0.015;
    const bezelBottom = platform === 'mac' ? frameH * 0.03 : frameH * 0.015;

    // Shadow
    ctx.save();
    ctx.shadowColor = `rgba(0, 0, 0, ${0.4 * shadowIntensity})`;
    ctx.shadowBlur = frameW * 0.06 * shadowIntensity;
    ctx.shadowOffsetY = frameW * 0.02 * shadowIntensity;

    ctx.fillStyle = colorScheme.body;
    drawRoundedRect(ctx, frameX, frameY, frameW, frameH, cornerR);
    ctx.fill();
    ctx.restore();

    // Border highlight
    ctx.strokeStyle = colorScheme.border;
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, frameX, frameY, frameW, frameH, cornerR);
    ctx.stroke();

    // Side buttons for phones
    if (platform === 'iphone' || platform === 'android_phone') {
      ctx.fillStyle = colorScheme.buttons;
      const btnW = 3;
      const btnH = frameH * 0.06;
      const btnX = frameX + frameW;
      const btnY = frameY + frameH * 0.22;
      drawRoundedRect(ctx, btnX, btnY, btnW, btnH, 1.5);
      ctx.fill();
      const volBtnH = frameH * 0.04;
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

    // Punch-hole camera (Android)
    if (platform === 'android_phone') {
      const holeR = frameW * 0.02;
      const holeX = frameX + frameW / 2;
      const holeY = screenY + screenH * 0.018;
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(holeX, holeY, holeR, 0, Math.PI * 2);
      ctx.fill();
    }

    // Home indicator (iPhone/iPad)
    if (platform === 'iphone' || platform === 'ipad') {
      const barW = frameW * 0.30;
      const barH = frameW * 0.012;
      const barX = frameX + (frameW - barW) / 2;
      const barY = screenY + screenH - screenH * 0.025;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      drawRoundedRect(ctx, barX, barY, barW, barH, barH / 2);
      ctx.fill();
    }

    // Android nav bar
    if (platform === 'android_phone' || platform === 'android_tablet') {
      const barW = frameW * 0.25;
      const barH = frameW * 0.01;
      const barX = frameX + (frameW - barW) / 2;
      const barY = screenY + screenH - screenH * 0.02;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      drawRoundedRect(ctx, barX, barY, barW, barH, barH / 2);
      ctx.fill();
    }

    // Mac keyboard/base
    if (platform === 'mac') {
      const baseH = frameH * 0.04;
      const baseY = frameY + frameH;
      const baseW = frameW * 1.05;
      const baseX = frameX - (baseW - frameW) / 2;
      ctx.fillStyle = colorScheme.buttons;
      drawRoundedRect(ctx, baseX, baseY, baseW, baseH, baseH * 0.4);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(frameX, baseY);
      ctx.lineTo(frameX + frameW, baseY);
      ctx.stroke();
    }
  }

  // ---- Draw caption text ---------------------------------------------------

  function drawCaptionText(ctx, areaX, areaY, areaW, areaH, design) {
    const headlineSize = Math.max(Math.round(areaW * 0.057), 32);
    const subtitleSize = Math.max(Math.round(areaW * 0.033), 22);
    const fontStack = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    ctx.fillStyle = design.textColor;
    ctx.textAlign = 'center';
    const centerX = areaX + areaW / 2;
    const maxTextWidth = areaW * 0.85;

    const hasSubtitle = design.subtitle.length > 0;
    const lineGap = Math.round(headlineSize * 0.35);

    ctx.font = `800 ${headlineSize}px ${fontStack}`;
    const headlineLines = wrapText(ctx, design.headline, maxTextWidth);

    ctx.font = `500 ${subtitleSize}px ${fontStack}`;
    const subtitleLines = hasSubtitle ? wrapText(ctx, design.subtitle, maxTextWidth) : [];

    const headlineBlockH = headlineLines.length * (headlineSize * 1.2);
    const subtitleBlockH = subtitleLines.length * (subtitleSize * 1.2);
    const totalTextH = headlineBlockH + (hasSubtitle ? lineGap + subtitleBlockH : 0);
    let textY = areaY + (areaH - totalTextH) / 2 + headlineSize;

    ctx.font = `800 ${headlineSize}px ${fontStack}`;
    ctx.textBaseline = 'alphabetic';
    for (const line of headlineLines) {
      ctx.fillText(line, centerX, textY);
      textY += headlineSize * 1.2;
    }

    if (hasSubtitle) {
      textY += lineGap - headlineSize * 0.2;
      ctx.font = `500 ${subtitleSize}px ${fontStack}`;
      for (const line of subtitleLines) {
        ctx.fillText(line, centerX, textY);
        textY += subtitleSize * 1.2;
      }
    }
  }

  // ---- Layout rendering engines --------------------------------------------

  function renderLayout(canvas, ctx, w, h, entry, device, design) {
    const layout = design.layout || 'centered';
    const hasCaption = design.headline.length > 0;
    const method = resizeMethod.value;

    // 1. Background
    drawBackground(ctx, w, h, design);

    switch (layout) {
      case 'centered':
        renderCenteredLayout(ctx, w, h, entry, device, design, hasCaption, method);
        break;
      case 'fullbleed':
        renderFullBleedLayout(ctx, w, h, entry, device, design, hasCaption, method);
        break;
      case 'offset':
        renderOffsetLayout(ctx, w, h, entry, device, design, hasCaption, method);
        break;
      case 'panoramic':
        renderPanoramicLayout(ctx, w, h, entry, device, design, hasCaption, method);
        break;
      case 'minimal':
        renderMinimalLayout(ctx, w, h, entry, device, design, hasCaption, method);
        break;
      case 'stacked':
        renderStackedLayout(ctx, w, h, entry, device, design, hasCaption, method);
        break;
      default:
        renderCenteredLayout(ctx, w, h, entry, device, design, hasCaption, method);
    }
  }

  function renderCenteredLayout(ctx, w, h, entry, device, design, hasCaption, method) {
    const captionRatio = hasCaption ? 0.22 : 0;
    const captionH = Math.round(h * captionRatio);
    const contentH = h - captionH;
    const contentY = design.position === 'top' ? captionH : 0;

    if (design.deviceFrame) {
      drawDeviceWithScreenshot(ctx, entry.img, 0, contentY, w, contentH, device.platform, design);
    } else {
      const imgCanvas = resizeToCanvas(entry.img, w, contentH, method);
      ctx.drawImage(imgCanvas, 0, contentY);
    }

    if (hasCaption) {
      const captionY = design.position === 'top' ? 0 : contentH;
      drawCaptionText(ctx, 0, captionY, w, captionH, design);
    }
  }

  function renderFullBleedLayout(ctx, w, h, entry, device, design, hasCaption, method) {
    // Screenshot fills entire background
    const imgCanvas = resizeToCanvas(entry.img, w, h, 'fill');
    ctx.drawImage(imgCanvas, 0, 0);

    // Dark overlay for text readability
    if (hasCaption) {
      const overlayH = h * 0.35;
      const grad = ctx.createLinearGradient(0,
        design.position === 'top' ? 0 : h - overlayH,
        0,
        design.position === 'top' ? overlayH : h);
      grad.addColorStop(0, design.position === 'top' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0)');
      grad.addColorStop(1, design.position === 'top' ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.7)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, design.position === 'top' ? 0 : h - overlayH, w, overlayH);

      const captionY = design.position === 'top' ? h * 0.03 : h * 0.72;
      drawCaptionText(ctx, 0, captionY, w, h * 0.25, design);
    }
  }

  function renderOffsetLayout(ctx, w, h, entry, device, design, hasCaption, method) {
    // Device on the right, text on the left
    const deviceAreaW = w * 0.55;
    const textAreaW = w * 0.45;
    const deviceAreaX = textAreaW;

    if (design.deviceFrame) {
      drawDeviceWithScreenshot(ctx, entry.img, deviceAreaX, 0, deviceAreaW, h, device.platform, design);
    } else {
      const imgCanvas = resizeToCanvas(entry.img, Math.round(deviceAreaW * 0.85), Math.round(h * 0.85), method);
      const dx = deviceAreaX + (deviceAreaW - imgCanvas.width) / 2;
      const dy = (h - imgCanvas.height) / 2;
      ctx.drawImage(imgCanvas, dx, dy);
    }

    if (hasCaption) {
      drawCaptionText(ctx, 0, 0, textAreaW, h, design);
    }
  }

  function renderPanoramicLayout(ctx, w, h, entry, device, design, hasCaption, method) {
    // Side by side: text left, large device right
    const textW = w * 0.38;
    const deviceW = w * 0.62;

    if (design.deviceFrame) {
      drawDeviceWithScreenshot(ctx, entry.img, textW, h * 0.05, deviceW, h * 0.9, device.platform, design);
    } else {
      const imgCanvas = resizeToCanvas(entry.img, Math.round(deviceW * 0.9), Math.round(h * 0.9), method);
      const dx = textW + (deviceW - imgCanvas.width) / 2;
      const dy = (h - imgCanvas.height) / 2;
      ctx.drawImage(imgCanvas, dx, dy);
    }

    if (hasCaption) {
      drawCaptionText(ctx, 0, h * 0.15, textW, h * 0.7, design);
    }
  }

  function renderMinimalLayout(ctx, w, h, entry, device, design, hasCaption, method) {
    // Small device centered with lots of breathing room
    const deviceH = h * 0.55;
    const captionH = hasCaption ? h * 0.2 : 0;
    const deviceY = design.position === 'top' ? captionH + (h - captionH - deviceH) / 2 : (h - captionH - deviceH) / 2;

    if (design.deviceFrame) {
      const smallDesign = Object.assign({}, design, { frameScale: design.frameScale * 0.75 });
      drawDeviceWithScreenshot(ctx, entry.img, 0, deviceY, w, deviceH, device.platform, smallDesign);
    } else {
      const imgCanvas = resizeToCanvas(entry.img, Math.round(w * 0.5), Math.round(deviceH * 0.8), method);
      const dx = (w - imgCanvas.width) / 2;
      const dy = deviceY + (deviceH - imgCanvas.height) / 2;
      ctx.drawImage(imgCanvas, dx, dy);
    }

    if (hasCaption) {
      const captionY = design.position === 'top' ? h * 0.05 : h - captionH - h * 0.02;
      drawCaptionText(ctx, 0, captionY, w, captionH, design);
    }
  }

  function renderStackedLayout(ctx, w, h, entry, device, design, hasCaption, method) {
    // Large text block on top, screenshot below
    const textH = hasCaption ? h * 0.32 : 0;
    const contentH = h - textH;
    const contentY = textH;

    if (design.deviceFrame) {
      drawDeviceWithScreenshot(ctx, entry.img, 0, contentY, w, contentH, device.platform, design);
    } else {
      const imgCanvas = resizeToCanvas(entry.img, w, contentH, method);
      ctx.drawImage(imgCanvas, 0, contentY);
    }

    if (hasCaption) {
      drawCaptionText(ctx, 0, 0, w, textH, design);
    }
  }

  // ---- Generate screenshot -------------------------------------------------

  function generateScreenshot(entry, device) {
    return new Promise((resolve) => {
      const { w, h } = getDimensions(device);
      const method = resizeMethod.value;
      const design = getDesignConfig(entry);

      let canvas;

      if (design) {
        canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        renderLayout(canvas, ctx, w, h, entry, device, design);
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

  // ---- Batch generate ------------------------------------------------------

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

  // ---- Render output -------------------------------------------------------

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

      const storeBadge = group.device.platform.startsWith('android')
        ? '<span class="store-badge store-badge-google">Google Play</span>'
        : '<span class="store-badge store-badge-apple">App Store</span>';

      headerEl.innerHTML =
        `<h3>${storeBadge} ${group.device.name} <span class="device-dims">${w} &times; ${h}</span></h3>` +
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

  // ---- Download all as ZIP -------------------------------------------------

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
    downloadBlob(blob, 'screenforge_screenshots.zip');

    downloadAllBtn.disabled = false;
    downloadAllBtn.innerHTML = '<i data-lucide="archive"></i> Download All (ZIP)';
    if (window.lucide) lucide.createIcons();
  }

  // ---- Live Preview --------------------------------------------------------

  function updatePreviewSelects() {
    // Image selector
    previewImageSelect.innerHTML = '';
    state.files.forEach((entry, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = entry.file.name;
      previewImageSelect.appendChild(opt);
    });

    // Device selector
    previewDeviceSelect.innerHTML = '';
    const selectedDevices = getSelectedDevices();
    if (selectedDevices.length === 0) {
      // Show first device of active platform
      const fallback = DEVICES.filter(d => d.platform === state.activePlatform);
      fallback.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = d.name;
        previewDeviceSelect.appendChild(opt);
      });
    } else {
      selectedDevices.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = d.name;
        previewDeviceSelect.appendChild(opt);
      });
    }
  }

  function schedulePreview() {
    if (!designEnabled.checked || state.files.length === 0) return;
    clearTimeout(state.previewDebounce);
    state.previewDebounce = setTimeout(renderPreview, 300);
  }

  function renderPreview() {
    if (state.files.length === 0) return;

    previewSection.hidden = false;
    const imgIndex = parseInt(previewImageSelect.value, 10) || 0;
    const entry = state.files[imgIndex];
    if (!entry) return;

    const deviceId = previewDeviceSelect.value;
    const device = DEVICES.find(d => d.id === deviceId);
    if (!device) return;

    const { w, h } = getDimensions(device);
    const design = getDesignConfig(entry);

    // Scale down for preview (max 400px wide)
    const maxPreviewW = 400;
    const scale = Math.min(maxPreviewW / w, 1);
    const pW = Math.round(w * scale);
    const pH = Math.round(h * scale);

    previewCanvas.width = pW;
    previewCanvas.height = pH;
    const ctx = previewCanvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (design) {
      // Render at scaled size for preview speed
      renderLayout(previewCanvas, ctx, pW, pH, entry, device, design);
    } else {
      const imgCanvas = resizeToCanvas(entry.img, pW, pH, resizeMethod.value);
      ctx.drawImage(imgCanvas, 0, 0);
    }

    if (window.lucide) lucide.createIcons();
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
    if (designEnabled.checked && state.files.length > 0) {
      previewSection.hidden = false;
      updatePreviewSelects();
      schedulePreview();
    } else {
      previewSection.hidden = true;
    }
    if (window.lucide) lucide.createIcons();
  });

  deviceFrameEnabled.addEventListener('change', () => {
    frameOptions.style.display = deviceFrameEnabled.checked ? '' : 'none';
    schedulePreview();
  });

  bgTypeSelect.addEventListener('change', () => {
    updateBgTypeUI();
    document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
    schedulePreview();
  });

  bgColor1.addEventListener('input', () => {
    bgHex1.textContent = bgColor1.value;
    document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
    schedulePreview();
  });

  bgColor2.addEventListener('input', () => {
    bgHex2.textContent = bgColor2.value;
    document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
    schedulePreview();
  });

  textColorInput.addEventListener('input', () => {
    textHex.textContent = textColorInput.value;
    document.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('active'));
    schedulePreview();
  });

  bgPattern.addEventListener('change', schedulePreview);
  frameShadow.addEventListener('input', schedulePreview);
  frameScale.addEventListener('input', schedulePreview);
  frameColor.addEventListener('change', schedulePreview);
  captionHeadline.addEventListener('input', schedulePreview);
  captionSubtitle.addEventListener('input', schedulePreview);
  captionPosition.addEventListener('change', schedulePreview);
  previewImageSelect.addEventListener('change', schedulePreview);
  previewDeviceSelect.addEventListener('change', schedulePreview);
  refreshPreviewBtn.addEventListener('click', renderPreview);

  // Quality slider
  qualitySlider.addEventListener('input', () => {
    qualityValue.textContent = qualitySlider.value;
  });

  // Action buttons
  generateBtn.addEventListener('click', handleGenerate);
  downloadAllBtn.addEventListener('click', handleDownloadAll);

  // ---- Init ----------------------------------------------------------------
  buildDeviceLists();
  buildLayoutTemplates();
  buildThemePresets();
  updateBgTypeUI();
})();
