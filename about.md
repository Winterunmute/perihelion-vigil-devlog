---
layout: default
title: About
permalink: /about/
---

# ABOUT

**Perihelion Vigil** is a PS1-era space RPG built by one person. Low-poly ships,
phosphor terminals, and a world you operate rather than watch. You don't pilot
from a god's-eye view — you sit at the console, read the sensors, and type into
the machine that flies the ship.

## The game

You crew a single vessel on the edge of an aging system. Navigation, docking,
ship combat, and boarding actions are all driven through **HeliOS** — an in-world
operating system that runs on a custom bytecode VM. Every terminal you touch is
a real program, executed line by line by an interpreter I wrote from scratch.
When something happens in the world, the VM fires an event; your scripts react
to it. Nothing on screen is faked.

The aesthetic is deliberate. Low-poly isn't a budget compromise I'm hiding — it's
the texture of the thing. Gaps in the fidelity are gaps your imagination fills.

## The developer

Built by **Crux / Rickard Borchers** — solo developer. Code, systems, design,
art, and the words on this log. One person keeping a consistent low-poly look
across an entire game's worth of assets.

## Tech stack

- **Engine:** Godot 4 (GDScript)
- **In-world runtime:** HeliOS — custom bytecode VM with a BASIC-like scripting language
- **Scripts:** `.hel` files, line-numbered, event-driven
- **Art:** low-poly, PS1-era constraints

## Links

- [Source / game repo]({{ site.github_repo }})
- [Developer portfolio]({{ site.portfolio_url }})
- [RSS feed]({{ '/feed.xml' | relative_url }})
