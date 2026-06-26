---
layout: post
title: "The line is already running"
date: 2026-06-26
tags: [he-3, gameplay, machines]
excerpt: "You arrive on the regolith next to a helium-3 line that already works — badly. Every machine runs on default firmware at about 60%, and the other 40% is yours to script."
---

The first thing HE-3 Extraktion does is hand you a working factory. You spawn on
the lunar surface — black sky, Earth hanging overhead, a low hard sun throwing
near-black shadows — and right there beside you a helium-3 processing line is
already running. Material is moving through the pipes. The exporter is shipping.
The LEDGER is ticking up.

It's also running at about 60%. Every machine booted its **default firmware** —
stable, safe, deliberately mediocre. Nothing is broken; nothing is optimised
either. That gap is the whole game: walk the line, find where it's leaving
helium-3 on the table, and rewrite the scripts until it doesn't.

![Walking the seeded helium-3 line, machine by machine, under the lunar sky]({{ "/assets/media/post-5/walkthrough.gif" | relative_url }})
*Arrival: a line that already works, badly. Every machine on default firmware, ~60%.*

There are no name tags floating over the machines. Instead, look at any one of
them and a readout appears in the corner — its heat, its rate, its buffers, and
the exact values its script can sense. So the walk above is also how you read the
line: put a machine under the cursor and its panel tells you what it's doing.

## The chain, machine by machine

The line runs west to east, each stage feeding the next through a pipe you can
watch material travel along.

- **Extractor** — claws regolith out of the ground and turns it into raw
  material. It's the head of the line and also where your build economy comes
  from; everything downstream is fed from here, so if it stalls, the whole chain
  starves.
- **Liberator** — bakes the raw material until the volatiles cook off: raw in,
  gas out. The first stage that really runs hot, which makes its duty cycle —
  how hard you push before it has to cool — worth scripting.
- **Separator** — the heart of the whole thing. It splits the volatile stream
  into the **helium-3 fraction** you want and a **helium-4 byproduct** you don't.
  How it splits is set by a single number — the ratio — and the default is
  cautious to a fault, so most of your helium-3 stays bound up in the waste
  stream. This is the one you came to fix.
- **Refiner** — concentrates the fraction into shippable, refined helium-3. The
  hottest stage on the line, so the most sensitive to being pushed: overcook it
  and it trips a forced cooldown and makes nothing until it recovers.
- **Storage** — a buffer tank between making the stuff and shipping it. Nothing
  clever on its own; it just means a hiccup upstream doesn't instantly stall the
  export, and a burst of production has somewhere to go.
- **Exporter** — packs refined helium-3 and ships it off-world to the LEDGER.
  Helium-3 is export-only: never spent inside the base, it just leaves. That
  number going up is the entire job.
- **Generator** — set back from the line, feeding the power grid. Power is a
  budget, not a given: run the line harder than the generator can supply and the
  whole base browns out and every machine throttles at once.
- **HE-4 generator** — wired straight to the separator's waste port. It burns the
  helium-4 byproduct into power *and* drains it before it backs up and chokes the
  separator. A worked example: the waste stream isn't garbage, it's a second
  input if you route it.

## Heat is the catch

None of these machines have a "go faster" slider that's just free. Run one hard
and it heats up; cross its ceiling and it trips into a forced cooldown and makes
nothing until it cools. So throughput isn't a number you crank — it's a **duty
cycle you manage**, and that's exactly what scripts are good at. It's also why a
better script beats a bigger number: the default firmware plays it safe so it
never overheats, and safe is slow.

You can watch all of it live. The visor in the corner runs its own little HeliOS
program — a heat dashboard, one row per machine — that repaints every cycle while
you walk the line. The helmet is just another machine you can reprogram.

## Rewriting the separator

Here's the move the demo is built around. Every machine hosts its own little
processor running a `.hel` script; you edit one by walking to the HeliOS
terminal, connecting to that machine's CPU, and rewriting its program. The
separator is where it pays off first.

![Editing the separator's ratio at the HeliOS terminal]({{ "/assets/media/post-5/separator-edit.gif" | relative_url }})
*One number: the separator's He-3 ratio, raised from the timid default.*

**What it means in practice.** The separator's default firmware sets a cautious
split and then never touches it again — it babysits temperature and nothing else:

```basic
20 TOGGLE SEPARATOR-1 ON
30 TOGGLE SEPARATOR-1 RATIO 0.4      -- conservative: most volatiles become waste
40 TOGGLE SEPARATOR-1 PROFILE 0.45   -- mediocre purity, off the sweet spot
50 TOGGLE SEPARATOR-1 RATE 0.45
```

That `RATIO 0.4` is the whole problem. The ratio is the fraction of the volatile
stream the separator takes as helium-3; the rest is dumped as helium-4 into a
small buffer. At 0.4 you're throwing most of it away — and the helium-4 piles up
faster than it can vent, back-pressures the machine, and throttles everything
upstream of it too. Low ratio means little product *and* a self-inflicted choke.

The fix is one number, plus a small reaction:

```basic
30 TOGGLE SEPARATOR-1 PROFILE 0.6    -- ride the purity sweet spot
40 TOGGLE SEPARATOR-1 RATIO 0.6      -- take more He-3, dump less He-4

-- keep the waste from backing up: open the ratio further if it climbs
60 he4 = SENSOR.GET(SEPARATOR-1, "HE4FILL")
70 IF he4 > 0.5 THEN TOGGLE SEPARATOR-1 RATIO 0.75
80 IF he4 < 0.2 THEN TOGGLE SEPARATOR-1 RATIO 0.6
100 WAIT 1
110 GOTO 60
```

**How it works.** `TOGGLE SEPARATOR-1 RATIO 0.6` is a command to a specific
machine: set your split to 0.6. The separator reads that value every tick and
splits its input accordingly, so the change takes effect immediately. The second
half is what makes it a *program* and not just a setting: `SENSOR.GET` reads the
machine's real state back — here `HE4FILL`, how full the waste buffer is — and the
`IF` lines push the ratio higher whenever helium-4 starts to climb, then ease it
back when it clears. It's a feedback loop, written in about ten lines of BASIC,
reacting to live data from the machine it's controlling.

Raise that ratio and the helium-3 stream multiplies, the helium-4 choke clears,
and the exporter starts shipping in earnest — the quota that looked distant a
minute ago suddenly looks reachable. There's a second lever too, `PROFILE`, that
tunes purity around a sweet spot, for when you want to wring out the last bit.

That's the loop in one scene: arrive to something that works, understand *why*
it's underperforming, and out-script the defaults. The factory was never the
puzzle. The firmware is.
