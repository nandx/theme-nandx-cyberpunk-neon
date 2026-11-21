/* ==========================================================================
   NandX Cyberpunk Neon — Minimal Progressive-Enhancement JS
   ========================================================================== */

(function () {
  "use strict";

  // 1. Scanlines FX Toggle (persisted)
  const SCANLINE_KEY = "nx-scanlines";
  const savedScanlines = localStorage.getItem(SCANLINE_KEY);
  if (savedScanlines === "on") {
    document.body.classList.add("nx-scanlines");
  }

  document.querySelectorAll("[data-nx-toggle-scanlines]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const enabled = document.body.classList.toggle("nx-scanlines");
      localStorage.setItem(SCANLINE_KEY, enabled ? "on" : "off");
      btn.setAttribute("aria-pressed", String(enabled));
      if (window.nxToast) {
        window.nxToast(`CRT Scanlines: ${enabled ? "ENABLED" : "DISABLED"}`);
      }
    });
  });

  // 2. Mobile Drawer & Dashboard Sidebar Toggles
  function bindDrawer(triggerSelector, targetSelector) {
    const trigger = document.querySelector(triggerSelector);
    const target = document.querySelector(targetSelector);
    if (!trigger || !target) return;

    trigger.addEventListener("click", () => {
      const isOpen = target.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && target.classList.contains("is-open")) {
        target.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        trigger.focus();
      }
    });
  }

  bindDrawer("[data-nx-nav-toggle]", "[data-nx-mobile-drawer]");
  bindDrawer("[data-nx-sidebar-toggle]", "[data-nx-sidebar]");

  // 3. Tabs
  document.querySelectorAll("[data-nx-tabs]").forEach((tabRoot) => {
    const buttons = tabRoot.querySelectorAll("[data-nx-tab-target]");
    const panels = tabRoot.querySelectorAll("[data-nx-tab-panel]");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-nx-tab-target");
        buttons.forEach((b) => {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        panels.forEach((p) => {
          const match = p.getAttribute("data-nx-tab-panel") === targetId;
          p.classList.toggle("is-active", match);
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
      });
    });
  });

  // 4. Accordion
  document.querySelectorAll("[data-nx-accordion]").forEach((acc) => {
    const triggers = acc.querySelectorAll(".nx-accordion__trigger");
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const expanded = trigger.getAttribute("aria-expanded") === "true";
        const panel = trigger.nextElementSibling;
        trigger.setAttribute("aria-expanded", String(!expanded));
        if (panel) {
          panel.classList.toggle("is-open", !expanded);
        }
      });
    });
  });

  // 5. Modals
  let lastModalOpener = null;

  document.querySelectorAll("[data-nx-modal-open]").forEach((opener) => {
    opener.addEventListener("click", () => {
      const id = opener.getAttribute("data-nx-modal-open");
      const modal = document.getElementById(id);
      if (!modal) return;
      lastModalOpener = opener;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      const closeBtn = modal.querySelector("[data-nx-modal-close]");
      if (closeBtn) closeBtn.focus();
    });
  });

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (lastModalOpener) {
      lastModalOpener.focus();
      lastModalOpener = null;
    }
  }

  document.querySelectorAll("[data-nx-modal-close]").forEach((closer) => {
    closer.addEventListener("click", () => {
      closeModal(closer.closest(".nx-modal"));
    });
  });

  document.querySelectorAll(".nx-modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".nx-modal.is-open").forEach(closeModal);
    }
  });

  // 6. Toast Notifications
  window.nxToast = function (message, durationMs) {
    let container = document.querySelector(".nx-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "nx-toast-container";
      container.setAttribute("aria-live", "polite");
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "nx-toast";
    const text = document.createElement("span");
    text.textContent = message;

    const close = document.createElement("button");
    close.type = "button";
    close.className = "nx-btn nx-btn--ghost nx-btn--sm";
    close.textContent = "OK";
    close.addEventListener("click", () => toast.remove());

    toast.append(text, close);
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.isConnected) toast.remove();
    }, durationMs || 3500);
  };

  document.querySelectorAll("[data-nx-toast]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const msg = btn.getAttribute("data-nx-toast") || "System signal received.";
      window.nxToast(msg);
    });
  });

  // 7. Password Visibility Toggle
  document.querySelectorAll("[data-nx-toggle-password]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-nx-toggle-password");
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      btn.textContent = isPassword ? "HIDE" : "SHOW";
    });
  });

  // 8. Table Search & Select-All
  document.querySelectorAll("[data-nx-table-search]").forEach((input) => {
    const tableId = input.getAttribute("data-nx-table-search");
    const table = document.getElementById(tableId);
    if (!table) return;

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      table.querySelectorAll("tbody tr").forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.hidden = q.length > 0 && !text.includes(q);
      });
    });
  });

  document.querySelectorAll("[data-nx-select-all]").forEach((master) => {
    const table = master.closest("table");
    if (!table) return;
    master.addEventListener("change", () => {
      table.querySelectorAll("tbody input[type='checkbox']").forEach((cb) => {
        cb.checked = master.checked;
      });
    });
  });

  // 9. File Dropzone Preview
  document.querySelectorAll("[data-nx-dropzone]").forEach((zone) => {
    const input = zone.querySelector("input[type='file']");
    const label = zone.querySelector("[data-nx-dropzone-label]");
    if (!input || !label) return;

    input.addEventListener("change", () => {
      if (input.files && input.files.length > 0) {
        const names = Array.from(input.files).map((f) => f.name).join(", ");
        label.textContent = `Selected: ${names}`;
      }
    });
  });

  // 10. Countdown Timer (coming-soon.html)
  const countdownRoot = document.querySelector("[data-nx-countdown]");
  if (countdownRoot) {
    const targetDate = Date.now() + 14 * 24 * 60 * 60 * 1000;
    const updateCountdown = () => {
      const diff = Math.max(0, targetDate - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      const map = { days, hours, mins, secs };
      Object.entries(map).forEach(([key, val]) => {
        const el = countdownRoot.querySelector(`[data-nx-cd="${key}"]`);
        if (el) el.textContent = String(val).padStart(2, "0");
      });
    };
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
  // 11. Dropdowns & Popovers
  document.querySelectorAll("[data-nx-dropdown-toggle]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = btn.nextElementSibling;
      if (!menu) return;
      const open = menu.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  document.querySelectorAll("[data-nx-popover-toggle]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const pop = btn.nextElementSibling;
      if (!pop) return;
      const open = pop.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".nx-dropdown__menu.is-open, .nx-popover.is-open").forEach((el) => {
      el.classList.remove("is-open");
    });
  });

  // 12. Dismissible Alerts
  document.querySelectorAll("[data-nx-dismiss]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.closest(".nx-alert");
      if (target) target.remove();
    });
  });
})();
