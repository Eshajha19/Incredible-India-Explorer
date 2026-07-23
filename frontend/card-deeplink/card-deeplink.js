/* Issue #248 — Shareable Deep Links for Explorer Cards */

(function () {
  "use strict";

  const CONFIG = {
    cardSelector:
      "[data-deeplink-card], [data-recent-item], [data-compare-item], .heritage-card, .wildlife-card, .textile-card, .water-card, .instrument-card, .butterfly-card, .bazaar-card, .script-card, .glossary-card, .destination-card, .festival-card, .cuisine-card, .university-card, .plant-card, .wonder-card, .tree-card, .unesco-card",
    titleSelector: "h1, h2, h3, .card-title, .title",
    buttonMountSelector:
      ".heritage-media, .wildlife-media, .textile-media, .water-media, .instrument-media, .butterfly-media, .bazaar-media, .script-media, .destination-media, .festival-media, .cuisine-media, .media, figure",
    openButtonSelector:
      ".explore-button, [data-open-modal], button[aria-label*='details' i], button[aria-label*='explore' i]",
    modalSelector:
      ".heritage-modal, .wildlife-modal, .textile-modal, .water-modal, .instrument-modal, .butterfly-modal, .bazaar-modal, .script-modal, .modal, [role='dialog']",
  };

  let toastTimer;
  let fallbackTimer;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const slugify = (value) =>
    String(value || "item")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function getCardTitle(card) {
    const explicit =
      card.getAttribute("data-deeplink-title") ||
      card.getAttribute("data-recent-title") ||
      card.getAttribute("data-compare-title");

    if (explicit) return explicit;

    const title = card.querySelector(CONFIG.titleSelector);
    return title ? title.textContent.trim().replace(/\s+/g, " ") : "Explorer card";
  }

  function getPageSlug() {
    const fileName = location.pathname.split("/").pop().replace(".html", "");
    if (fileName) return fileName;

    const title = document.title.replace(" | Incredible India", "").trim();
    return slugify(title || "explorer");
  }

  function ensureCardId(card) {
    if (card.id) {
      card.classList.add("card-deeplink-target");
      return card.id;
    }

    const existing =
      card.getAttribute("data-deeplink-id") ||
      card.dataset.id ||
      card.dataset.recentResolvedId ||
      card.dataset.compareResolvedId;

    const base = slugify(existing || `${getPageSlug()}-${getCardTitle(card)}`);
    let candidate = base || `card-${Math.random().toString(36).slice(2, 8)}`;
    let counter = 2;

    while (document.getElementById(candidate)) {
      candidate = `${base}-${counter}`;
      counter += 1;
    }

    card.id = candidate;
    card.classList.add("card-deeplink-target");
    return candidate;
  }

  function getCardUrl(card) {
    const id = ensureCardId(card);
    return `${location.origin}${location.pathname}${location.search}#${encodeURIComponent(id)}`;
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.append(area);
    area.select();

    const ok = document.execCommand("copy");
    area.remove();

    if (!ok) throw new Error("Copy command failed");
  }

  function showToast(message) {
    let toast = document.querySelector(".card-deeplink-toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.className = "card-deeplink-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.append(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  function showInvalidHashFallback(hash) {
    let fallback = document.querySelector(".card-deeplink-fallback");

    if (!fallback) {
      fallback = document.createElement("div");
      fallback.className = "card-deeplink-fallback";
      fallback.setAttribute("role", "status");
      document.body.append(fallback);
    }

    fallback.innerHTML = `
      <h3>Card link not found</h3>
      <p>The link target <strong>${escapeHtml(hash)}</strong> does not match a card on this page.</p>
      <button type="button">Dismiss</button>
    `;

    fallback.querySelector("button").addEventListener("click", () => fallback.remove());

    clearTimeout(fallbackTimer);
    fallbackTimer = setTimeout(() => {
      fallback.remove();
    }, 7000);
  }

  function highlightCard(card) {
    card.classList.remove("card-deeplink-highlight");
    void card.offsetWidth;
    card.classList.add("card-deeplink-highlight");

    setTimeout(() => {
      card.classList.remove("card-deeplink-highlight");
    }, 2200);
  }

  function scrollToCard(card) {
    card.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });

    highlightCard(card);
  }

  function tryOpenCardModal(card) {
    const openButton = card.querySelector(CONFIG.openButtonSelector);
    if (!openButton) return false;

    const beforeModal = Array.from(document.querySelectorAll(CONFIG.modalSelector))
      .some((modal) => modal.hidden === false || modal.classList.contains("active") || modal.classList.contains("show"));

    openButton.click();

    const afterModal = Array.from(document.querySelectorAll(CONFIG.modalSelector))
      .some((modal) => modal.hidden === false || modal.classList.contains("active") || modal.classList.contains("show"));

    return afterModal || beforeModal;
  }

  function handleHashTarget() {
    if (!location.hash) return;

    const decodedHash = decodeURIComponent(location.hash.slice(1));
    if (!decodedHash) return;

    const target = document.getElementById(decodedHash);

    if (!target) {
      showInvalidHashFallback(`#${decodedHash}`);
      return;
    }

    if (!target.matches(CONFIG.cardSelector) && !target.closest(CONFIG.cardSelector)) {
      target.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
      return;
    }

    const card = target.matches(CONFIG.cardSelector) ? target : target.closest(CONFIG.cardSelector);

    setTimeout(() => {
      scrollToCard(card);
      tryOpenCardModal(card);
    }, 180);
  }

  function injectCopyButtons() {
    const cards = Array.from(document.querySelectorAll(CONFIG.cardSelector));

    cards.forEach((card) => {
      if (card.dataset.deeplinkReady === "true") return;

      ensureCardId(card);
      card.dataset.deeplinkReady = "true";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "card-deeplink-action";
      button.textContent = "🔗 Copy link";
      button.setAttribute("aria-label", `Copy link to ${getCardTitle(card)}`);

      button.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const url = getCardUrl(card);

        try {
          await copyText(url);
          history.replaceState(null, "", `#${card.id}`);
          showToast("Card link copied.");
          button.classList.add("is-copied");
          button.textContent = "✓ Copied";
          setTimeout(() => {
            button.classList.remove("is-copied");
            button.textContent = "🔗 Copy link";
          }, 1600);
        } catch {
          showToast("Copy failed. URL updated in the address bar.");
          location.hash = card.id;
        }
      });

      const mount = card.querySelector(CONFIG.buttonMountSelector) || card;
      mount.append(button);
    });
  }

  function observeNewCards() {
    const observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.addedNodes.length > 0)) {
        injectCopyButtons();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  function initCardDeeplinks() {
    if (document.body.dataset.disableCardDeeplinks === "true") return;

    injectCopyButtons();
    handleHashTarget();
    observeNewCards();

    window.addEventListener("hashchange", handleHashTarget);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCardDeeplinks);
  } else {
    initCardDeeplinks();
  }

  window.CardDeepLinks = {
    refresh: injectCopyButtons,
    openHash: handleHashTarget,
    getUrlForCard: getCardUrl,
  };
})();
