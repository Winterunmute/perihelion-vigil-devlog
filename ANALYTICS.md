# Engagement Tracking

A lightweight, privacy-friendly system that measures **reading behaviour**, not
users. No cookies, no user identification, no cross-site tracking, no cookie
banner. It answers one question:

> Do people actually read these devlogs, or just click and leave?

## How it works

- `assets/js/analytics.js` is the engine. It runs only on devlog posts (pages
  where `window.DEVLOG_ID` is set by the `post` layout — automatically, from the
  Jekyll slug).
- Events are sent to **Umami Cloud** as custom events. Umami also records the
  basic pageview automatically.
- `Do Not Track` is respected — if the browser sets it, no custom events fire.

### Events

| Event                  | When                                   | Data              |
| ---------------------- | -------------------------------------- | ----------------- |
| `devlog_entry_view`    | post opened                            | `id`              |
| `scroll_depth`         | passed 25% / 50% / 90% (once each)     | `id`, `percent`   |
| `engagement_ping`      | 10 / 30 / 60 / 120 / 300 active seconds| `id`, `seconds`   |
| `devlog_read_complete` | end of the post body entered viewport  | `id`              |

`id` is the post slug, e.g. `i-built-an-operating-system-inside-my-rpg`.
Time is **active seconds only** — counting pauses when the tab is hidden.

## Setup (one-time, ~3 minutes)

1. Create a free account at <https://cloud.umami.is> and add a website for
   `winterunmute.github.io`.
2. Copy the **Website ID** (a UUID) from the website's settings / tracking-code
   panel.
3. Paste it into `_config.yml`:
   ```yaml
   analytics:
     umami_website_id: "your-uuid-here"
   ```
4. Commit and push. Done — every current and future post is tracked.

Leaving `umami_website_id` blank disables all analytics (no scripts are emitted),
which keeps local builds clean.

## Phase 2 — Engagement scoring

Once data is flowing, score each post from its Umami event counts to see what's
worth writing more of. Per post:

| Signal                         | Points |
| ------------------------------ | -----: |
| `devlog_read_complete` fired   |   +3   |
| `scroll_depth` ≥ 50%           |   +2   |
| `engagement_ping` ≥ 60s        |   +1   |
| bounce (view, no 10s ping)     |   -2   |

| Score | Meaning             |
| ----: | ------------------- |
|  ≥ 5  | 🔥 highly engaging  |
|  1–4  | ⚡ ok / skimmed     |
|  ≤ 0  | 💀 not read         |

Read these off the Umami dashboard's event breakdown, filtered by post `id`. A
later upgrade can pull the same numbers from the Umami API into a `stats.html`
page on the site.
