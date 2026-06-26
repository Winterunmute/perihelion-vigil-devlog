---
layout: post
title: "Boarding a ship in 150 lines of BASIC"
date: 2026-06-23
tags: [vm, scripting, gameplay]
excerpt: "The boarding action sequence is a program running on the in-game VM. Here's the annotated listing."
---

The boarding sequence in Perihelion Vigil — fly up to a hostile ship, match
position, cycle the airlock, step across — isn't scripted in the engine. It's a
program. A HeliOS program, running on the in-game VM, reacting to real events the
world fires at it. There's no special "boarding mode" in the codebase. There's a
listing, and the listing is the feature.

Here's the heart of it, lightly trimmed:

```basic
10 ALERT "BOARDING COMPUTER ONLINE"
20 ALERT "ADJUST HEADING + THROTTLE PANELS TO FLY"
30 WAIT EVENT
40 IF EVENT.TYPE = "DOCK_RANGE" THEN GOTO 100
50 IF EVENT.TYPE = "AIRLOCK_CYCLED" THEN GOTO 150
55 IF EVENT.TYPE = "BUTTON" THEN GOTO 200
60 IF EVENT.TYPE = "VARIABLE_CHANGED" THEN GOTO 70
65 GOTO 30
70 dest_h = INPUT.GET("INPUT-HEADING")
80 dest_raw = INPUT.GET("INPUT-THROTTLE")
90 dest_thr = dest_raw / 100
91 SHIP.SET_HEADING dest_h
92 SHIP.SET_THROTTLE dest_thr
95 GOTO 30
100 SHIP.STOP
110 ALERT "DOCK RANGE: " + EVENT.SOURCE
120 ALERT "CYCLING AIRLOCK -- STAND CLEAR"
130 AIRLOCK.CYCLE AIRLOCK-1
140 GOTO 30
150 ALERT "AIRLOCK OPEN -- PROCEED TO BOARD"
160 GOTO 30
200 IF EVENT.SOURCE = "BTN-UNDOCK" THEN GOTO 210
205 GOTO 30
210 AIRLOCK.DISCONNECT AIRLOCK-1
220 ALERT "UNDOCKED"
230 GOTO 30
```

<!-- PLACEHOLDER · png · the boarding computer mid-sequence — ALERT lines stacked, "CYCLING AIRLOCK -- STAND CLEAR" -->
![The boarding computer printing its ALERT sequence]({{ "/assets/media/post-5/boarding-computer.png" | relative_url }})
*The listing above, doing its job: each ALERT is a line of the program reacting to a real event.*

## Reading the program

The whole thing is one event loop. Line 30 blocks on `WAIT EVENT` and the program
sleeps until the world has something to say. Everything below it is a dispatch
table — *what kind of event was that, and where do I jump?*

**Flying (70–95).** When the player drags the heading or throttle panel, the VM
fires `VARIABLE_CHANGED`. The script reads the panels with `INPUT.GET`, scales the
throttle from a 0–100 dial into a 0.0–1.0 value, and pushes both into the ship.
The player isn't "controlling the ship" directly — they're editing variables that
a program reads and forwards. That indirection is the entire fiction of the game
in four lines.

**Proximity (100–140).** When the ship drifts inside docking range, the world —
not the script — fires `DOCK_RANGE`. The script stops the ship, names the contact
it's near (`EVENT.SOURCE`), warns the crew, and tells the airlock to cycle. It
does not *decide* it's in range; it's *told*, by the same physics that move
everything else.

**Airlock + undock (150–230).** `AIRLOCK_CYCLED` comes back when the airlock has
actually finished its sequence, and only then does the "proceed to board" prompt
appear. The undock path waits for a specific button (`BTN-UNDOCK`) and disconnects.

## Why do it this way

I could have written this whole sequence in GDScript in an afternoon and no
player would know the difference. But they *would* know the difference, because
in this game you can open the boarding computer and read exactly the listing
above. The thing controlling the moment and the thing you can inspect are the
same thing. That's the rule I hold the whole project to: the script reacts to
genuine VM events and real world data — it never simulates what *should* happen.

<!-- PLACEHOLDER · gif · airlock cycles and the prompt resolves to "AIRLOCK OPEN -- PROCEED TO BOARD" -->
![The airlock cycling through to AIRLOCK OPEN -- PROCEED TO BOARD]({{ "/assets/media/post-5/airlock-cycle.gif" | relative_url }})
*`AIRLOCK OPEN -- PROCEED TO BOARD` only prints because the airlock genuinely cycled.*

So when you board a ship in Perihelion Vigil, you're not triggering a cutscene.
You're running a hundred-and-fifty-ish lines of salvaged BASIC, watching it react
to a world it doesn't control any more than you do. And when it prints `AIRLOCK
OPEN -- PROCEED TO BOARD`, it's because the airlock actually, genuinely, cycled.
