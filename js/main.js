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
    // Where a smooth scroll is heading, or null when the row is at rest.
    // Deriving the next slide from scrollLeft mid-animation reads a position
    // the row has not reached yet, so a quick double tap on the arrow lands on
    // the same slide twice and the second tap is swallowed.
    var want = null;
    function go(i) {
      want = i;
      row.scrollTo({ left: i * step(), behavior: "smooth" });
    }
    function settled() {
      if (want !== null && Math.abs(row.scrollLeft - want * step()) < 2) want = null;
    }

    next.addEventListener("click", function () {
      go(((want === null ? current() : want) + 1) % slides.length);
    });
    // A finger on the row always wins over an animation still in flight.
    row.addEventListener("touchstart", function () { want = null; }, { passive: true });
    dots.forEach(function (d, n) {
      d.addEventListener("click", function () { go(n); });
    });

    var queued;
    row.addEventListener("scroll", function () {
      if (queued) return;
      queued = requestAnimationFrame(function () { queued = null; settled(); paint(); });
    }, { passive: true });
    window.addEventListener("resize", paint);
    paint();
  });

  /* ---- full-screen still viewer ----------------------------------------
     Every still on the page is a button into this, on both breakpoints. The
     openers carry data-lb-i, so the viewer walks the gallery by index and does
     not care that each frame exists twice in the DOM - once in the phone
     carousel, once in the desktop grid.

     Zoom is offered only when the screen is actually showing the frame smaller
     than the file, and it zooms to the file's own width rather than a fixed
     factor. On a phone that is a big jump; on a wide monitor, where the frame
     already fits at full resolution, no zoom is offered at all. */
  var lb = document.querySelector("[data-lightbox]");
  var openers = Array.prototype.slice.call(document.querySelectorAll("[data-lb-open]"));
  if (lb && openers.length) {
    var stage = lb.querySelector("[data-lb-stage]");
    var lbImg = lb.querySelector("[data-lb-img]");
    var lbCount = lb.querySelector("[data-lb-count]");
    var lbHint = lb.querySelector("[data-lb-hint]");
    var closeBtn = lb.querySelector("[data-lb-close]");

    // One entry per still, keyed by the gallery index the markup carries.
    var frames = [];
    openers.forEach(function (b) {
      frames[parseInt(b.getAttribute("data-lb-i"), 10)] = {
        src: b.getAttribute("data-lb-src"),
        alt: b.getAttribute("data-lb-alt") || ""
      };
    });
    var at = 0;
    var cameFrom = null;

    function offerZoom() {
      // Only worth a zoom if the file has meaningfully more to give.
      var room = lbImg.naturalWidth > lbImg.clientWidth * 1.15;
      stage.classList.toggle("can-zoom", room);
      lbHint.style.visibility = room ? "" : "hidden";
      stage.style.setProperty("--lb-natural", lbImg.naturalWidth + "px");
    }

    function show(i) {
      at = (i + frames.length) % frames.length;
      stage.classList.remove("is-zoom");
      lbImg.src = frames[at].src;
      lbImg.alt = frames[at].alt;
      lbCount.textContent = at + 1 + " / " + frames.length;
      if (lbImg.complete) offerZoom();
      // Warm the neighbours so prev/next lands instantly.
      [at + 1, at - 1].forEach(function (n) {
        var f = frames[(n + frames.length) % frames.length];
        if (f) new Image().src = f.src;
      });
    }
    function close() {
      lb.classList.add("hidden");
      document.body.style.overflow = "";
      lbImg.removeAttribute("src");
      // Hand focus to the frame you ended on, in the strip you came from - not
      // the one you opened. Returning it to the opener drags the phone carousel
      // backwards to wherever you started, which reads as the thing losing your
      // place. Landing on the current frame keeps carousel, grid and viewer
      // telling the same story.
      var home = cameFrom && cameFrom.parentNode;
      var back = home && home.querySelector('[data-lb-open][data-lb-i="' + at + '"]');
      if (back || cameFrom) (back || cameFrom).focus();
    }

    lbImg.addEventListener("load", offerZoom);
    openers.forEach(function (b) {
      b.addEventListener("click", function () {
        cameFrom = b;
        show(parseInt(b.getAttribute("data-lb-i"), 10));
        lb.classList.remove("hidden");
        document.body.style.overflow = "hidden";
        closeBtn.focus();
      });
    });
    closeBtn.addEventListener("click", close);
    lb.querySelector("[data-lb-prev]").addEventListener("click", function () { show(at - 1); });
    lb.querySelector("[data-lb-next]").addEventListener("click", function () { show(at + 1); });

    lbImg.addEventListener("click", function () {
      if (!stage.classList.contains("can-zoom")) return close();
      // Centre on the blown-up frame, otherwise the pan starts in a corner.
      if (stage.classList.toggle("is-zoom")) {
        stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2;
        stage.scrollTop = (stage.scrollHeight - stage.clientHeight) / 2;
      }
    });
    // Only the mat around the picture closes; the picture itself zooms.
    stage.addEventListener("click", function (e) {
      if (e.target === stage) close();
    });
    window.addEventListener("resize", function () {
      if (!lb.classList.contains("hidden")) offerZoom();
    });
    document.addEventListener("keydown", function (e) {
      if (lb.classList.contains("hidden")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(at + 1);
      else if (e.key === "ArrowLeft") show(at - 1);
    });
  }
});
