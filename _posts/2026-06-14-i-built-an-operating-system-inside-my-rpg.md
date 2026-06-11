---
layout: post
title: "I built an operating system inside my RPG"
date: 2026-06-14
tags: [architecture, vm, design]
excerpt: "Perihelion Vigil runs on a custom bytecode VM. Every terminal is executed by an interpreter I wrote."
---

When you sit at a console in Perihelion Vigil, you are not looking at a menu
dressed up to look like a computer. You're looking at an actual computer. The
terminal is running a program, and that program is being executed — one line at a
time — by a virtual machine I wrote from scratch. I call the whole thing HeliOS.

This sounds like over-engineering. It mostly isn't. Let me explain why I went
this way instead of doing what every sane person does and hardcoding the
interactions.

## Why a VM at all

Two reasons, and they're both about honesty.

**Inspectability.** In this game you can open the program a device is running and
read it. The autopilot, the turret controller, the airlock sequencer — they're
not black boxes with a "USE" prompt. They're listings. If a player wants to
understand *why* the docking computer did something, the answer is right there in
the source. That's only possible if the in-world software is real software.

**No faking.** I have a rule for myself: a HeliOS script must react to real VM
events and real world data. It can't hardcode what *should* happen. If the script
says "when the airlock cycles, do X," then the airlock genuinely has to fire an
`AIRLOCK_CYCLED` event, and the script genuinely has to be listening for it. The
moment I let a script print a fake alert or simulate a state, the world stops
being a world and becomes a stage set. The VM is what keeps me honest.

## What HeliOS looks like

The language is intentionally primitive — BASIC with line numbers. Devices have
namespaced verbs (`SHIP.SET_HEADING`, `AIRLOCK.CYCLE`, `TURRET-1.FIRE`).
Programs block on `WAIT EVENT` and branch on what comes back. Here's a real
fragment from the boarding computer:

```basic
10 ALERT "BOARDING COMPUTER ONLINE"
30 WAIT EVENT
40 IF EVENT.TYPE = "DOCK_RANGE" THEN GOTO 100
50 IF EVENT.TYPE = "AIRLOCK_CYCLED" THEN GOTO 150
70 dest_h = INPUT.GET("INPUT-HEADING")
91 SHIP.SET_HEADING dest_h
95 GOTO 30
```

Line numbers and `GOTO` look archaic, and that's deliberate. The whole fiction is
that this is salvaged, decades-old shipboard software. The syntax sells the
setting, and — conveniently — a flat, line-numbered language is dramatically
easier to write a reliable interpreter for than something with scope and
closures.

## Where the bodies are buried

Scripts don't run on one big global VM. Each CPU node in the world has its own
interpreter state — its own run loop, its own evaluator. That's what lets two
devices run different programs at once and talk to each other through events,
which is how the more interesting machines in the game are built.

It also means the single most common bug I write is adding a new primitive to the
VM and forgetting that the per-CPU executor needs it too. I've lost more time to
that one oversight than to anything else in the project. Worth it, though — the
day I could open a running device and *read what it was thinking* was the day this
stopped feeling like a game and started feeling like a place.
