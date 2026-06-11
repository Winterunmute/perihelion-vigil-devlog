# Media notes — devlog screenshots & gifs

Working notes for the images that go in the drafted posts. Not published (excluded
in `_config.yml`). Drop captured files into the matching `assets/media/post-N/`
folder using the **exact filenames** below — the placeholders are already wired
into the drafts, so no markdown edits are needed.

---

## Shot list

Two slots per post. `png` = single frame, `gif` = short loop. The HTML comment
above each placeholder in the draft repeats the capture note.

### Post 2 — *I built an operating system inside my RPG*
`_drafts/2026-06-14-...md` → `assets/media/post-2/`

| File | Type | Shot |
|------|------|------|
| `helios-console.png` | png | Hero: player seated at a HeliOS console in-world, CRT glowing. Sets up "this is a real machine." |
| `helios-listing-run.gif` | gif | A `.hel` listing executing — `ALERT` lines printing to the CRT one at a time. Sells "real interpreter." |

### Post 3 — *Two weeks from design doc to playable loop*
`_drafts/2026-06-17-...md` → `assets/media/post-3/`

| File | Type | Shot |
|------|------|------|
| `week-one-prototype.png` | png | The deliberately ugly week-one build: bare terminal + a primitive box "ship." The post describes this exact thing. |
| `playable-loop.gif` | gif | The full loop end to end: fly in → `DOCK RANGE` prints → airlock cycles → board. The money shot. |

### Post 4 — *Ship combat without rendering space*
`_drafts/2026-06-20-...md` → `assets/media/post-4/`

| File | Type | Shot |
|------|------|------|
| `combat-console.png` | png | The combat console: contact bearing, closing range, power draw, hull-integrity bar. Shows "what you see instead." |
| `incoming-fire.gif` | gif | `INCOMING FIRE` flashes → a beat of nothing → the hull bar drops. Emotional core; only reads in motion. |

### Post 5 — *Boarding a ship in 150 lines of BASIC*
`_drafts/2026-06-23-...md` → `assets/media/post-5/`

| File | Type | Shot |
|------|------|------|
| `boarding-computer.png` | png | The boarding computer mid-sequence, `ALERT` lines stacked (e.g. "CYCLING AIRLOCK -- STAND CLEAR"). |
| `airlock-cycle.gif` | gif | Airlock cycling through to `AIRLOCK OPEN -- PROCEED TO BOARD`. Proves the payoff line. |

---

## Capture tips

- **Consistency sells it.** Same CRT shader / scanline, same window size on every
  shot. Makes the posts feel like one series and matches the site aesthetic.
- **Gifs: keep them short** — 3–6 seconds, loop cleanly, crop tight to the
  terminal. File size matters; GitHub Pages serves them raw (no optimization).
- **Dimensions.** The content column is ~860px wide. Capture at ~1720px (2×) for
  crispness; images auto-scale and already get the phosphor border from the CSS.
- **Reuse.** One combat recording can yield both the post-4 `.png` (a single
  frame) and the `.gif`.
- **Naming.** Stick to the filenames above — they're already referenced in the
  drafts. New images beyond these: add a markdown tag in the draft pointing at
  `{{ "/assets/media/post-N/your-file.png" | relative_url }}`.

## Tools

- **ScreenToGif** (Windows) — best for tight-cropped, short terminal gifs.
- **ShareX** — screenshots + gif/video capture, good region selection.
- **OBS** — if you want higher-quality video to convert to gif later.

## Workflow once you have files

1. Drop file into `assets/media/post-N/` with the exact name.
2. Preview locally: `bundle exec jekyll serve --drafts --future`
   (`--drafts` shows the unpublished posts, `--future` shows future dates).
3. When the post's date arrives, move it from `_drafts/` to `_posts/` and push.
