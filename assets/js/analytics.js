/*
 * Perihelion Vigil // Engagement Tracking
 * --------------------------------------
 * Measures *reading behaviour*, not users. No cookies, no IDs, no cross-site
 * tracking. Sends event-based signals to Umami so we can answer one question:
 * "Do people actually read these devlogs, or just click and leave?"
 *
 * Events (all carry the per-post `id`):
 *   devlog_entry_view     - a devlog post was opened
 *   scroll_depth          - reader passed 25% / 50% / 90% of the page (once each)
 *   engagement_ping       - reader has spent N active seconds on the page
 *   devlog_read_complete  - reader reached the end of the post body
 *
 * The post id is read from `window.DEVLOG_ID`, which the post layout sets to the
 * Jekyll slug. Pages without a DEVLOG_ID (the index, about, etc.) get only
 * Umami's automatic pageview — no engagement tracking runs.
 */
(function () {
  "use strict";

  var DEVLOG_ID = window.DEVLOG_ID;

  // Only run engagement tracking on devlog posts.
  if (!DEVLOG_ID) return;

  // Respect Do Not Track — privacy-first by design.
  var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  if (dnt === "1" || dnt === "yes") return;

  // --- event sender -------------------------------------------------------
  // Umami loads with `defer`, so window.umami may not exist yet when this runs.
  // Queue events until it's ready, then flush.
  var queue = [];
  var flushing = false;

  function umamiReady() {
    return window.umami && typeof window.umami.track === "function";
  }

  function flush() {
    if (flushing) return;
    flushing = true;
    var tick = function () {
      if (umamiReady()) {
        while (queue.length) {
          var e = queue.shift();
          window.umami.track(e.name, e.data);
        }
        flushing = false;
      } else {
        setTimeout(tick, 300); // wait for the deferred Umami script
      }
    };
    tick();
  }

  function track(name, data) {
    queue.push({ name: name, data: data });
    flush();
  }

  // --- 1. devlog entry view ----------------------------------------------
  track("devlog_entry_view", { id: DEVLOG_ID });

  // --- 2. scroll depth ----------------------------------------------------
  var depthMarks = [25, 50, 90];
  var depthFired = {};

  function scrollPercent() {
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return 100; // short page: fully visible already
    return Math.round((window.scrollY / scrollable) * 100);
  }

  function checkScroll() {
    var pct = scrollPercent();
    for (var i = 0; i < depthMarks.length; i++) {
      var mark = depthMarks[i];
      if (pct >= mark && !depthFired[mark]) {
        depthFired[mark] = true;
        track("scroll_depth", { id: DEVLOG_ID, percent: mark });
      }
    }
  }

  // --- 3. read completion -------------------------------------------------
  // Fired when the end of the post body / footer actually enters the viewport.
  // More meaningful than a raw scroll number: it means they reached the end.
  var readComplete = false;
  var endMarker =
    document.querySelector(".post-footer") ||
    document.querySelector(".post-body");

  function fireReadComplete() {
    if (readComplete) return;
    readComplete = true;
    track("devlog_read_complete", { id: DEVLOG_ID });
  }

  if (endMarker && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            fireReadComplete();
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(endMarker);
  }

  // --- 4. time on page (active seconds, heartbeats) -----------------------
  // Only counts time while the tab is visible, so a post left open in a
  // background tab doesn't inflate engagement.
  var pingMarks = [10, 30, 60, 120, 300];
  var pingFired = {};
  var activeSeconds = 0;
  var visible = document.visibilityState === "visible";

  document.addEventListener("visibilitychange", function () {
    visible = document.visibilityState === "visible";
  });

  setInterval(function () {
    if (!visible) return;
    activeSeconds += 1;
    for (var i = 0; i < pingMarks.length; i++) {
      var mark = pingMarks[i];
      if (activeSeconds >= mark && !pingFired[mark]) {
        pingFired[mark] = true;
        track("engagement_ping", { id: DEVLOG_ID, seconds: mark });
      }
    }
  }, 1000);

  // --- wire up scroll listener (throttled via rAF) ------------------------
  var ticking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        checkScroll();
        ticking = false;
      });
    },
    { passive: true }
  );

  // Run once on load in case the page is short or restored mid-scroll.
  checkScroll();
})();
