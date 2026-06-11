---
layout: post
title: "Two weeks from design doc to playable loop"
date: 2026-06-17
tags: [process, solo-dev, milestone]
excerpt: "I had a design document and a deadline I set for myself. Fourteen days later I had a playable loop."
---

Fourteen days ago Perihelion Vigil was a design document and a folder of
half-formed opinions. Today you can sit down, fly the ship to another vessel,
cycle an airlock, and board it. That's a loop. It's a small loop and a rough one,
but it closes, and a loop that closes is the difference between a project and a
daydream.

Here's how the two weeks actually went, including the parts I'm not proud of.

## What "playable" had to mean

I set one rule before I started: at the end of two weeks I had to be able to play
something with my hands, not describe something with my mouth. No "imagine that
this connects to that." A real input, a real consequence, start to finish.

I picked the smallest slice that still felt like *this* game and not some generic
prototype: **navigate, dock, board.** It touches the ship systems, the HeliOS VM,
the event bus, and the player-facing terminals all at once. If that slice worked,
the spine of the game worked.

## Week one — the spine

The first week was all plumbing, none of it visible. The VM had to actually
execute scripts. Devices had to fire real events. The ship had to respond to
`SET_HEADING` and `SET_THROTTLE` and physically move. By the end of week one I had
an ugly terminal that could fly a box through space by typing into it — no
docking, no boarding, no art worth showing. But the spine was real, and that was
the week's job.

## Week two — the loop

Week two was about connecting the spine to something a person does. The docking
computer, the proximity events (`DOCK_RANGE`), the airlock sequencer
(`AIRLOCK.CYCLE` / `AIRLOCK_CYCLED`), and finally the boarding handoff. The
moment it came together I flew to a target, watched `DOCK RANGE` print itself,
heard the airlock cycle, and stepped across. First time through, the whole chain
fired correctly. I sat there for a second. Then I did it four more times to make
sure it wasn't a fluke.

## What got cut

A two-week deadline is a knife, and I used it.

- **Combat** — designed, partially wired, not in the loop. Next milestone.
- **Real UI** — the terminals are functional, not pretty. Phosphor text on black, and that's it.
- **Persistence** — nothing saves yet. Every session starts clean.
- **Content** — one ship, one target, one airlock. The systems are general; the world is a single room.

None of those are gone. They're sequenced. The point of the two weeks wasn't to
build the game — it was to prove the game's core gesture works with my actual
hands on actual inputs. It does. Everything after this is addition, not
invention, and addition is a much calmer place to work from.
