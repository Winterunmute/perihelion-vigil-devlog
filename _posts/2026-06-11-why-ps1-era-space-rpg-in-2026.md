---
layout: post
title: "Why I'm making a PS1-era space RPG in 2026"
date: 2026-06-11
tags: [design, aesthetic, solo-dev]
excerpt: "Low-poly isn't a limitation I'm working around. It's the point."
---

Every few months someone announces a game with skin pores you can count and
reflections that resolve individual rivets. They look incredible in a trailer
and forgettable in memory. I've been thinking about why, and I keep landing on
the same answer: the more a render fills in for you, the less of it is yours.

Perihelion Vigil is a PS1-era space RPG. Low-poly ships, flat-shaded hulls,
texture work measured in kilobytes. And I want to be clear up front — this isn't
nostalgia, and it isn't a budget I'm apologizing for. The low fidelity is the
design.

## Gaps are where the imagination lives

A PS1 model of a frigate is maybe four hundred triangles. It gives you a
silhouette, a couple of strong shapes, a suggestion of scale — and then it stops
and lets your brain do the rest. The ship you remember from a 1998 game is
sharper in your memory than it ever was on screen, because you finished it
yourself. That collaboration between the screen and the player is the thing I'm
chasing. You can't get it by rendering harder. You get it by rendering *less*
and rendering the *right* less.

That's a real design constraint, not a vibe. Every asset has to read at a glance.
Every shape has to earn its triangles. When you can't lean on detail, you have to
lean on composition, color, and motion — and those are the things that actually
stay with people.

## The solo-dev math

There's a practical half to this too. I'm one person. A photoreal space RPG is a
hundred-person project and a five-year calendar, and I have neither. The PS1
constraint isn't just aesthetically honest — it's the only way the scope closes.

The thing that makes it closeable is a pipeline I built called FORGE: a way to
keep a consistent low-poly look across an entire game's worth of assets without
hand-touching every one of them. Consistency is what sells a stylized world.
One off-model asset and the spell breaks. FORGE is what lets a single developer
hold that line across hundreds of objects.

So when you see a four-hundred-triangle ship in this game, it isn't there because
I couldn't afford more. It's there because more would be worse — for the feel, for
the memory, and for the one-person calendar that has to ship it.

Next entry: the part of this project that has nothing to do with looks at all —
the operating system running underneath the whole thing.
