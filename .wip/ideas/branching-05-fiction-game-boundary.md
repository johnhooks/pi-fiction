---
status: spark
topic: branching
---

# Boundary between branching fiction and text game

## Problem

As soon as a branching story tracks clues, inventory, health, visited scenes, or prior decisions, it starts to resemble a text game. That may be good. It may also pull the project into engine design before the storytelling problem is solved.

`pi-fiction` needs a clear sense of which game-like mechanics serve fiction authoring and which belong in a separate renderer or game engine.

## Solution

Explore the boundary deliberately. Treat state as a storytelling tool first: memory, pressure, consequence, reveal, misdirection, and reader agency. Add mechanics only when they create better scenes or better choices.

The reusable framework can describe state, conditions, and effects, but it should not become responsible for every possible runtime mechanic. Elsewhere can render a specific experience with whatever client-side behavior it needs.

## Requirements

- Identify useful state types: flags, clues, inventory, progress, health, reputation, visited nodes, or relationship changes.
- Decide which mechanics belong in the authoring graph versus the Elsewhere renderer.
- Keep static publishing possible.
- Make conditional choices understandable to the writer.
- Avoid expanding into a general-purpose game engine unless the story truly demands it.
