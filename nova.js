class Nova {

  /* =========================
     ⛔ ANTI-SPAM
  ========================== */
  static lastNotifyTime = 0;
  static notifyCooldown = 400;

  /* =========================
     🪟 ALERT / MODAL
  ========================== */

  static show({
    title = "Title",
    message = "Message",
    buttonText = "OK",

    icon = "success",
    customIcon = null,

    background = "rgba(25,25,28,0.95)",
    textColor = "#fff",
    buttonColor = "#6366f1",

    input = null,
    placeholder = "",
    options = []
  } = {}) {

    return new Promise((resolve) => {

      const overlay = document.createElement("div");
      overlay.className = "nova-overlay";

      let inputHTML = "";

      if (input === "text") {
        inputHTML = `<input class="nova-input" placeholder="${placeholder}">`;
      }

      if (input === "textarea") {
        inputHTML = `<textarea class="nova-input" placeholder="${placeholder}"></textarea>`;
      }

      if (input === "select") {
        inputHTML = `
          <select class="nova-input">
            ${options.map(o => `<option value="${o.value}">${o.label}</option>`).join("")}
          </select>
        `;
      }

      overlay.innerHTML = `
        <div class="nova-modal" style="background:${background};color:${textColor}">
          
          <div class="nova-icon">
            ${customIcon || Nova.icons[icon] || Nova.icons.success}
          </div>

          <h2 class="nova-title">${title}</h2>
          <p class="nova-message">${message}</p>

          ${inputHTML}

          <button class="nova-btn" style="background:${buttonColor}">
            ${buttonText}
          </button>

        </div>
      `;

      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";

      const btn = overlay.querySelector(".nova-btn");
      const inputEl = overlay.querySelector(".nova-input");

      btn.onclick = () => {
        const value = inputEl ? inputEl.value : true;
        Nova.close(overlay);
        resolve(value);
      };
    });
  }

  /* =========================
     ❌ CONFIRM (YES / NO)
  ========================== */

  static confirm({
    title = "Confirmation",
    message = "Are you sure ?",

    confirmText = "Yes",
    cancelText = "No",

    icon = "warning",

    background = "rgba(25,25,28,0.95)",
    textColor = "#fff",

    confirmColor = "#22c55e",
    cancelColor = "#ef4444"
  } = {}) {

    return new Promise((resolve) => {

      const overlay = document.createElement("div");
      overlay.className = "nova-overlay";

      overlay.innerHTML = `
        <div class="nova-modal" style="background:${background};color:${textColor}">
          
          <div class="nova-icon">
            ${Nova.icons[icon] || Nova.icons.warning}
          </div>

          <h2 class="nova-title">${title}</h2>
          <p class="nova-message">${message}</p>

          <div class="nova-confirm-actions">

            <button class="nova-btn nova-cancel" style="background:${cancelColor}">
              ${cancelText}
            </button>

            <button class="nova-btn nova-confirm" style="background:${confirmColor}">
              ${confirmText}
            </button>

          </div>

        </div>
      `;

      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";

      const yes = overlay.querySelector(".nova-confirm");
      const no = overlay.querySelector(".nova-cancel");

      const close = (result) => {
        overlay.classList.add("nova-out");

        setTimeout(() => {
          overlay.remove();
          document.body.style.overflow = "auto";
          resolve(result);
        }, 200);
      };

      yes.onclick = () => close(true);
      no.onclick = () => close(false);
    });
  }

  /* =========================
     🔔 NOTIFICATIONS (TOAST)
  ========================== */

  static notify({
    title = "Notification",
    message = "",
    type = "info",
    duration = 5000
  } = {}) {

    const now = Date.now();
    if (now - Nova.lastNotifyTime < Nova.notifyCooldown) return;
    Nova.lastNotifyTime = now;

    let container = document.querySelector(".nova-toast-container");

    if (!container) {
      container = document.createElement("div");
      container.className = "nova-toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `nova-toast nova-${type}`;

    toast.innerHTML = `
      <div class="nova-toast-icon">
        ${Nova.toastIcons[type] || Nova.toastIcons.info}
      </div>

      <div class="nova-toast-content">
        <strong>${title}</strong>
        <p>${message}</p>
      </div>

      <div class="nova-toast-bar"></div>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    const bar = toast.querySelector(".nova-toast-bar");
    bar.style.animationDuration = duration + "ms";

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 200);
    }, duration);
  }

  /* =========================
     🪟 CLOSE MODAL
  ========================== */

  static close(el) {
    el.classList.add("nova-out");

    setTimeout(() => {
      el.remove();
      document.body.style.overflow = "auto";
    }, 200);
  }

  /* =========================
     🎨 MODAL ICONS (SVG)
  ========================== */

  static icons = {
    success: `
      <svg viewBox="0 0 24 24" class="nova-svg">
        <circle cx="12" cy="12" r="10" class="circle"/>
        <path d="M7 12.5l3 3 7-7" class="check"/>
      </svg>
    `,
    error: `
      <svg viewBox="0 0 24 24" class="nova-svg">
        <circle cx="12" cy="12" r="10" class="circle error"/>
        <path d="M8 8l8 8M16 8l-8 8" class="cross"/>
      </svg>
    `,
    warning: `
      <svg viewBox="0 0 24 24" class="nova-svg">
        <circle cx="12" cy="12" r="10" class="circle warn"/>
        <path d="M12 7v6"/>
        <circle cx="12" cy="16.5" r="1"/>
      </svg>
    `,
    info: `
      <svg viewBox="0 0 24 24" class="nova-svg">
        <circle cx="12" cy="12" r="10" class="circle info"/>
        <path d="M12 11v6"/>
        <circle cx="12" cy="8" r="1"/>
      </svg>
    `
  };

  /* =========================
     🔔 TOAST ICONS (SVG)
  ========================== */

  static toastIcons = {
    success: `
      <svg viewBox="0 0 24 24" class="nova-toast-svg">
        <path d="M20 6L9 17l-5-5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"/>
      </svg>
    `,
    error: `
      <svg viewBox="0 0 24 24" class="nova-toast-svg">
        <path d="M18 6L6 18M6 6l12 12"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"/>
      </svg>
    `,
    info: `
      <svg viewBox="0 0 24 24" class="nova-toast-svg">
        <path d="M12 16v-4m0-4h.01"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"/>
      </svg>
    `,
    warning: `
      <svg viewBox="0 0 24 24" class="nova-toast-svg">
        <path d="M12 9v4m0 4h.01"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"/>
      </svg>
    `
  };
}