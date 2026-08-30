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

  // ---------- stills carousel (mobile) ----------
  // The row is a CSS scroll-snap strip; this only adds the affordances - an
  // arrow, dots, and a wrap back to the first frame once you pass the last.
  // Slide count comes from the DOM, so a gallery of any length just works.
  document.querySelectorAll("[data-stills]").forEach(function (wrap) {
    var row = wrap.querySelector("[data-stills-row]");
    var next = wrap.querySelector("[data-stills-next]");
    var dotWrap = wrap.querySelector("[data-stills-dots]");
    if (!row || !dotWrap) return;

    var slides = Array.prototype.slice.call(row.children);
    var dots = Array.prototype.slice.call(dotWrap.children);
    if (slides.length < 2) {
      if (next) next.style.display = "none";
      dotWrap.style.display = "none";
      return;
    }

    function step() {
      return slides[1].offsetLeft - slides[0].offsetLeft;
    }
    function current() {
      var s = step();
      if (!s) return 0;
      return Math.max(0, Math.min(slides.length - 1, Math.round(row.scrollLeft / s)));
    }
    function paint() {
      var i = current();
      dots.forEach(function (d, n) {
        var on = n === i;
        d.classList.toggle("bg-ember", on);
        d.classList.toggle("w-4", on);
        d.classList.toggle("bg-white/25", !on);
        d.classList.toggle("w-1.5", !on);
        d.setAttribute("aria-current", on ? "true" : "false");
      });
    }
    function go(i) {
      row.scrollTo({ left: i * step(), behavior: "smooth" });
    }

    next.addEventListener("click", function () {
      go((current() + 1) % slides.length);
    });
    dots.forEach(function (d, n) {
      d.addEventListener("click", function () { go(n); });
    });

    var queued;
    row.addEventListener("scroll", function () {
      if (queued) return;
      queued = requestAnimationFrame(function () { queued = null; paint(); });
    }, { passive: true });
    window.addEventListener("resize", paint);
    paint();
  });

  /* ---- full-screen still viewer ----------------------------------------
     The stills come off the film at 2.67:1. On a portrait phone that is a
     ~160px strip however wide the slide is, so the carousel is the index and
     this is where the detail lives: the frame fills the screen, one tap takes
     it to 280% with pan, and turning the handset re-fits it far larger. */
  var lb = document.querySelector("[data-lightbox]");
  var openers = Array.prototype.slice.call(document.querySelectorAll("[data-lb-open]"));
  if (lb && openers.length) {
    var stage = lb.querySelector("[data-lb-stage]");
    var lbImg = lb.querySelector("[data-lb-img]");
    var lbCount = lb.querySelector("[data-lb-count]");
    var at = 0;

    function show(i) {
      at = (i + openers.length) % openers.length;
      stage.classList.remove("is-zoom");
      lbImg.src = openers[at].getAttribute("data-lb-src");
      lbImg.alt = openers[at].getAttribute("data-lb-alt") || "";
      lbCount.textContent = at + 1 + " / " + openers.length;
    }
    function close() {
      lb.classList.add("hidden");
      document.body.style.overflow = "";
      lbImg.removeAttribute("src");
    }

    openers.forEach(function (b, i) {
      b.addEventListener("click", function () {
        show(i);
        lb.classList.remove("hidden");
        document.body.style.overflow = "hidden";
      });
    });
    lb.querySelector("[data-lb-close]").addEventListener("click", close);
    lb.querySelector("[data-lb-prev]").addEventListener("click", function () { show(at - 1); });
    lb.querySelector("[data-lb-next]").addEventListener("click", function () { show(at + 1); });

    lbImg.addEventListener("click", function () {
      // Centre the blown-up frame on open, otherwise the pan starts in a corner.
      if (stage.classList.toggle("is-zoom")) {
        stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2;
        stage.scrollTop = (stage.scrollHeight - stage.clientHeight) / 2;
      }
    });
    // Only the mat around the picture closes; a tap on the picture zooms.
    stage.addEventListener("click", function (e) {
      if (e.target === stage) close();
    });
    document.addEventListener("keydown", function (e) {
      if (lb.classList.contains("hidden")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(at + 1);
      else if (e.key === "ArrowLeft") show(at - 1);
    });
  }
});
