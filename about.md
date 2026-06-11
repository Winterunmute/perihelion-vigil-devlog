---
layout: default
title: About
permalink: /about/
---

# ABOUT

**Perihelion Vigil** is a space RPG built by one person. Low-poly ships,
phosphor terminals, and a world you operate rather than watch. You don't pilot
from a god's-eye view — you sit at the console, read the sensors, and type into
the machine that flies the ship.

## The world

It is 2737. Earth is gone.

In 2587 — an event called **The Sundering** — an alien biomass entity known as
**The Mass** consumed the homeworld in a matter of weeks. What remained of
humanity scattered across the Sol system: Mars, the Belt, the outer stations. A
hundred and fifty years later, the system is fractured, scarred, and still
running.

You crew a single vessel somewhere in what's left.

## The game

Navigation, docking, ship combat, and boarding actions are all driven through
**HeliOS** — an in-world operating system running on a custom bytecode VM. Every
terminal you touch is a real program, executed line by line by an interpreter
built from scratch. When something happens in the world, the VM fires an event;
your scripts react to it. Nothing on screen is faked.

You can automate your ship. You can write a script that orbits a target, monitors
incoming fire, reroutes power to shields, and breaks contact when hull integrity
drops below 20%. Or you can do it manually. The machine doesn't care — it just
runs what you give it.

The aesthetic is deliberate. Low-poly isn't a budget compromise — it's the
texture of the thing. The gaps in the fidelity are gaps your imagination fills.

Inspired by Morrowind, System Shock, and Deus Ex.

## The developer

Built by **Crux / Rickard Borchers** — solo developer. Code, systems, design,
art direction, and the words on this log. This devlog documents the build as it
happens — pre-alpha, warts and all.

## Tech stack

- **Engine:** Godot 4
- **In-world runtime:** HeliOS — custom bytecode VM with a BASIC-like scripting language
- **Scripts:** `.hel` files, line-numbered, event-driven

## Links

- [Source / game repo]({{ site.github_repo }})
- [Developer portfolio]({{ site.portfolio_url }})
- [RSS feed]({{ '/feed.xml' | relative_url }})
