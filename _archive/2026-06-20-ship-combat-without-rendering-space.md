---
layout: post
title: "Ship combat without rendering space"
date: 2026-06-20
tags: [design, systems, combat]
excerpt: "You never see your ship from outside. Ship combat is a systems problem, not a rendering problem."
---

Most space games solve combat by putting a camera behind your ship and letting
you watch the dogfight. Perihelion Vigil doesn't have that camera. You never see
your own ship from the outside. During a fight you are exactly where you'd be on
a real warship — inside it, at a console, reading instruments. Combat here is a
systems problem, not a rendering problem, and I made that choice on purpose.

## The constraint

The rule is simple and absolute: **the player's viewpoint never leaves the ship's
interior.** No external chase cam, no tactical god-view of two ships circling.
If you want to know what the enemy is doing, you read it off your sensors, the
same way the ship knows.

This started as a scope decision. Exterior space combat means animating ships in
open space, syncing weapons fire to visible models, selling speed and scale with
a camera — an enormous amount of art and tech for one person. Cutting it saved me
months. But the more I built around the constraint, the more I realized it was
making the game *better*, not just cheaper.

## What you see instead

You see what the crew sees. A contact bearing on the sensor readout. A range
number ticking down. Power draw climbing as the turrets spin up. A hull-integrity
bar that drops when something connects. The turret controller itself is a HeliOS
program — it sweeps, it aims, it fires on events:

<!-- PLACEHOLDER · png · the combat console — sensor readout with contact bearing, range, power draw, hull bar -->
![The combat console: sensor bearing, range, power draw, hull-integrity bar]({{ "/assets/media/post-4/combat-console.png" | relative_url }})
*Everything you get in a fight: a bearing, a closing range, and a hull bar you'd rather not watch.*

```basic
20 TOGGLE TURRET-1 AIM_H 0
30 WAIT 0.6
40 TURRET-1.FIRE
80 TOGGLE TURRET-1 AIM_H 45
100 TURRET-1.FIRE
```

You can open that program. You can read it while it's killing something. You can
rewrite it. The fight isn't a cutscene you survive — it's a machine you operate,
and the machine is legible all the way down.

## Why it works emotionally

Here's the thing I didn't expect. Not seeing the enemy makes the enemy *worse*.

When the contact is just a bearing and a closing range, your brain builds the
threat. The pause between "INCOMING FIRE" on the readout and the hull bar
dropping is longer and heavier than any explosion I could render.

<!-- PLACEHOLDER · gif · "INCOMING FIRE" alert flashes, beat of nothing, then the hull-integrity bar drops -->
![INCOMING FIRE alert, then the hull bar drops]({{ "/assets/media/post-4/incoming-fire.gif" | relative_url }})
*The whole horror movie: the alert, the wait, the bar. You never see the thing shooting at you.* You're leaning
into the instruments, doing the same thing the imaginary crew is doing — trusting
numbers because numbers are all you have. That tension is submarine-movie
tension, and submarine movies almost never show you the other sub. They show you
a face watching a dial.

So the camera that never leaves the ship isn't a thing I'm working around. It's
the whole reason the combat feels the way it does. The fear lives in the gap
between the readout and the consequence — and that gap only exists because I
refused to render space.
