// Plain JS for the static krisshuman.com site. No build step, no framework.
// Every block below guards for the element existing, since not every page has every component.

document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  document.querySelectorAll("#year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile nav
  var navToggle = document.getElementById("navToggle");
  var navOverlay = document.getElementById("navOverlay");
  var navClose = document.getElementById("navClose");
  if (navToggle && navOverlay) {
    navToggle.addEventListener("click", function () {
      navOverlay.classList.remove("hidden");
    });
  }
  if (navClose && navOverlay) {
    navClose.addEventListener("click", function () {
      navOverlay.classList.add("hidden");
    });
  }
  if (navOverlay) {
    navOverlay.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navOverlay.classList.add("hidden");
      });
    });
  }

  // Back to top
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > window.innerHeight * 0.4) {
          backToTop.classList.remove("hidden");
          backToTop.classList.add("flex");
        } else {
          backToTop.classList.add("hidden");
          backToTop.classList.remove("flex");
        }
      },
      { passive: true }
    );
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Calendly modal
  var calendlyModal = document.getElementById("calendlyModal");
  document.querySelectorAll("[data-open-calendly]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (window.innerWidth < 768) {
        window.location.href = "https://calendly.com/kris-krisshuman/30min";
        return;
      }
      if (calendlyModal) calendlyModal.classList.remove("hidden");
    });
  });
  document.querySelectorAll("[data-close-calendly]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (calendlyModal) calendlyModal.classList.add("hidden");
    });
  });

  // Request materials modal
  var requestModal = document.getElementById("requestModal");
  var requestForm = document.getElementById("requestForm");
  var requestSuccess = document.getElementById("requestSuccess");
  var requestProjectField = document.getElementById("requestProjectField");
  var requestProjectLabel = document.getElementById("requestProjectLabel");

  document.querySelectorAll("[data-open-request]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var project = btn.getAttribute("data-project") || "";
      if (requestProjectField) requestProjectField.value = project;
      if (requestProjectLabel) requestProjectLabel.textContent = project;
      if (requestForm) requestForm.classList.remove("hidden");
      if (requestSuccess) requestSuccess.classList.add("hidden");
      if (requestModal) requestModal.classList.remove("hidden");
    });
  });
  document.querySelectorAll("[data-close-request]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (requestModal) requestModal.classList.add("hidden");
    });
  });
  if (requestForm) {
    requestForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(requestForm);
      fetch(requestForm.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
        .then(function (res) {
          if (res.ok) {
            requestForm.classList.add("hidden");
            if (requestSuccess) requestSuccess.classList.remove("hidden");
          }
        })
        .catch(function () {
          /* fail silently in UI; Formspree also emails on success only */
        });
    });
  }

  // Résumé modal (About page)
  var openResume = document.getElementById("openResume");
  var closeResume = document.getElementById("closeResume");
  var resumeModal = document.getElementById("resumeModal");
  if (openResume && resumeModal) {
    openResume.addEventListener("click", function () {
      resumeModal.classList.remove("hidden");
    });
  }
  if (closeResume && resumeModal) {
    closeResume.addEventListener("click", function () {
      resumeModal.classList.add("hidden");
    });
  }

  // Representation — Contact Rep button (obfuscated email, never in HTML)
  var contactRepBtn = document.getElementById("contactRepBtn");
  if (contactRepBtn) {
    contactRepBtn.addEventListener("click", function () {
      var e = ["info", "middlerockmanagement.com"].join("@");
      window.location.href = "mailto:" + e;
    });
  }

  // Homepage slate search — live dropdown over all 14 projects
  var slateSearch = document.getElementById("slateSearch");
  var slateResults = document.getElementById("slateResults");
  if (slateSearch && slateResults && typeof ALL_PROJECTS !== "undefined") {
    function renderResults(q) {
      q = q.trim();
      if (q.length < 3) { slateResults.classList.add("hidden"); slateResults.innerHTML = ""; return; }
      var re = new RegExp("\\b" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      var hits = ALL_PROJECTS.filter(function (p) {
        return re.test(p.title);
      });
      if (hits.length === 0) {
        slateResults.innerHTML = '<p class="px-4 py-3 text-xs text-zinc-500">No projects found.</p>';
      } else {
        slateResults.innerHTML = hits.map(function (p) {
          return '<a href="' + p.url + '" class="flex flex-col px-4 py-3 border-b border-white/10 last:border-0 hover:bg-white/5 transition">' +
            '<span class="text-sm text-white">' + p.title + '</span>' +
            '<span class="text-[11px] uppercase tracking-[0.15em] text-zinc-500 mt-0.5">' + p.genre + '</span>' +
            '</a>';
        }).join("");
      }
      slateResults.classList.remove("hidden");
    }
    slateSearch.addEventListener("input", function () { renderResults(slateSearch.value); });
    slateSearch.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { slateResults.classList.add("hidden"); slateSearch.value = ""; }
      if (e.key === "Enter") { var first = slateResults.querySelector("a"); if (first) first.click(); }
    });
    document.addEventListener("click", function (e) {
      if (!slateSearch.contains(e.target) && !slateResults.contains(e.target)) {
        slateResults.classList.add("hidden");
      }
    });
  }

  // Full slate page search (work.html) — filters all 14 project cards
  var workSearch = document.getElementById("workSearch");
  if (workSearch) {
    var allCards = Array.prototype.slice.call(document.querySelectorAll("[data-title]"));

    function filterCards(q) {
      q = q.trim().toLowerCase();
      allCards.forEach(function (card) {
        var title = card.getAttribute("data-title") || "";
        var zinger = card.getAttribute("data-zinger") || "";
        var match = !q || title.indexOf(q) !== -1 || zinger.indexOf(q) !== -1;
        card.style.display = match ? "" : "none";
      });
    }

    // Pre-populate from URL param (e.g. work.html?q=ballad)
    var params = new URLSearchParams(window.location.search);
    var initialQ = params.get("q") || "";
    if (initialQ) {
      workSearch.value = initialQ;
      filterCards(initialQ);
    }

    workSearch.addEventListener("input", function () {
      filterCards(workSearch.value);
    });
  }
});
