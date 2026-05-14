class Nova {

  /* =========================
     🪟 ALERT / MODAL
  ========================== */

  static show({
    title = "Title",
    message = "Message",
    buttonText = "OK",

    icon = "success",

    background = "rgba(25,25,28,0.96)",
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
        inputHTML = `
          <input class="nova-input"
          placeholder="${placeholder}">
        `;
      }

      if (input === "textarea") {
        inputHTML = `
          <textarea class="nova-input"
          placeholder="${placeholder}">
          </textarea>
        `;
      }

      if (input === "select") {
        inputHTML = `
          <select class="nova-input">
            ${options.map(o => `
              <option value="${o.value}">
                ${o.label}
              </option>
            `).join("")}
          </select>
        `;
      }

      overlay.innerHTML = `
        <div class="nova-modal"
          style="background:${background};color:${textColor}">

          <div class="nova-icon-wrapper">
            <div class="nova-icon nova-${icon}">
              ${Nova.icons[icon] || Nova.icons.success}
            </div>
          </div>

          <h2 class="nova-title">${title}</h2>
          <p class="nova-message">${message}</p>

          ${inputHTML}

          <button class="nova-btn"
            style="background:${buttonColor}">
            ${buttonText}
          </button>

        </div>
      `;

      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";

      const btn = overlay.querySelector(".nova-btn");
      const inputEl = overlay.querySelector(".nova-input");

      btn.focus();

      overlay.addEventListener("click", (e) => {

        if (e.target === overlay) {

          Nova.close(overlay);
          resolve(false);

        }

      });

      btn.onclick = () => {

        const value =
          inputEl ? inputEl.value : true;

        Nova.close(overlay);

        resolve(value);
      };

    });
  }

  /* =========================
     ❌ CONFIRM
  ========================== */

  static confirm({
    title = "Confirm",
    message = "Are you sure?",

    confirmText = "Yes",
    cancelText = "No",

    confirmColor = "#22c55e",
    cancelColor = "#ef4444"

  } = {}) {

    return new Promise((resolve) => {

      const overlay = document.createElement("div");
      overlay.className = "nova-overlay";

      overlay.innerHTML = `
        <div class="nova-modal">

          <div class="nova-icon-wrapper">
            <div class="nova-icon nova-warning">
              ${Nova.icons.warning}
            </div>
          </div>

          <h2 class="nova-title">${title}</h2>
          <p class="nova-message">${message}</p>

          <div class="nova-actions">

            <button class="nova-btn"
              style="background:${cancelColor}">
              ${cancelText}
            </button>

            <button class="nova-btn"
              style="background:${confirmColor}">
              ${confirmText}
            </button>

          </div>

        </div>
      `;

      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";

      const [cancelBtn, confirmBtn] =
        overlay.querySelectorAll("button");

      const close = (res) => {

        Nova.close(overlay);
        resolve(res);

      };

      cancelBtn.onclick = () => close(false);
      confirmBtn.onclick = () => close(true);

    });
  }

  /* =========================
     🔔 TOAST
  ========================== */

  static notify({
    title = "Notification",
    message = "",
    type = "info",
    duration = 5000
  } = {}) {

    let container =
      document.querySelector(".nova-toast-container");

    if (!container) {

      container = document.createElement("div");
      container.className = "nova-toast-container";

      document.body.appendChild(container);

    }

    const toast = document.createElement("div");

    toast.className =
      `nova-toast nova-${type}`;

    toast.innerHTML = `

      <div class="nova-toast-inner">

        <div class="nova-toast-icon">
          ${Nova.toastIcons[type] || Nova.toastIcons.info}
        </div>

        <div class="nova-toast-content">

          <strong>${title}</strong>

          <p>${message}</p>

        </div>

      </div>

      <div class="nova-progress"></div>
    `;

    container.appendChild(toast);

    const progress =
      toast.querySelector(".nova-progress");

    progress.style.animationDuration =
      `${duration}ms`;

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {

      toast.classList.remove("show");

      setTimeout(() => {
        toast.remove();
      }, 300);

    }, duration);
  }

  /* =========================
     🧹 CLOSE
  ========================== */

  static close(el) {

    el.classList.add("nova-out");

    setTimeout(() => {

      el.remove();
      document.body.style.overflow = "auto";

    }, 250);
  }

  /* =========================
     🎨 MODAL ICONS
  ========================== */

  static icons = {

    success: `
      <svg class="nova-svg-success"
        viewBox="0 0 52 52">

        <circle
          class="nova-circle-success"
          cx="26"
          cy="26"
          r="25"/>

        <path
          class="nova-check-success"
          d="M14 27l7 7 16-16"/>

      </svg>
    `,

    error: `
      <svg class="nova-svg-error"
        viewBox="0 0 52 52">

        <circle
          class="nova-circle-error"
          cx="26"
          cy="26"
          r="25"/>

        <path
          class="nova-x-error"
          d="M16 16 36 36"/>

        <path
          class="nova-x-error"
          d="M36 16 16 36"/>

      </svg>
    `,

    warning: `
      <svg class="nova-svg-warning"
        viewBox="0 0 52 52">

        <circle
          class="nova-circle-warning"
          cx="26"
          cy="26"
          r="25"/>

        <path
          class="nova-warning-line"
          d="M26 14v16"/>

        <circle
          class="nova-warning-dot"
          cx="26"
          cy="38"
          r="2"/>

      </svg>
    `,

    info: `
      <svg class="nova-svg-info"
        viewBox="0 0 52 52">

        <circle
          class="nova-circle-info"
          cx="26"
          cy="26"
          r="25"/>

        <line
          class="nova-info-line"
          x1="26"
          y1="22"
          x2="26"
          y2="34"/>

        <circle
          class="nova-info-dot"
          cx="26"
          cy="16"
          r="2.2"/>

      </svg>
    `
  };

  /* =========================
     🔔 TOAST ICONS
  ========================== */

  static toastIcons = {

    success: `
      <svg viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    `,

    error: `
      <svg viewBox="0 0 24 24">
        <path d="M18 6L6 18"/>
        <path d="M6 6l12 12"/>
      </svg>
    `,

    warning: `
      <svg viewBox="0 0 24 24">
        <path d="M12 7v7"/>
        <circle cx="12" cy="17" r="1"/>
      </svg>
    `,

    info: `
      <svg viewBox="0 0 24 24">
        <path d="M12 11v5"/>
        <circle cx="12" cy="7.5" r="1"/>
      </svg>
    `
  };

}

window.Nova = Nova;
window.NovaUI = Nova;
