---
status: shaping
topic: branching
---

# Visible graph for branching fiction

## Problem

A choose-your-own-adventure story is easy to describe as a tree, but the interesting version is a graph. Branches can cross, converge, loop, end abruptly, reveal hidden structure, or mutate based on what the reader has already done.

The broader story-graph concept now lives under the `graph-*` ideas. This idea remains focused on the branching-fiction specialization: when some paths become reader-facing choices and the final story must be exportable as a static interactive experience.

If the graph stays hidden inside prose, the writer and agent will lose track of the reader's experience. If the graph becomes too mechanical, the story turns into bookkeeping. `pi-fiction` needs a way to make reader-facing branching structure visible while preserving the feeling of writing fiction.

## Solution

Design branching stories around an inspectable graph of scenes, choices, endings, and state changes. The graph should help the writer see the shape of the reader's journey: where choices split, where they return, where mysteries tighten, where endings live, and where accidental dead ends or orphaned scenes appear.

The graph is primarily an authoring surface, not a default reader-facing feature. In `pi-fiction`, it should expose the structure and scaffolding that the author and agent need. In Elsewhere, the same underlying graph should usually disappear into the finished reader experience.

The graph should help the agent ask better questions and propose useful expansions: a converging clue path, a comic false ending, a loop that becomes meaningful, or a branch that reveals a different side of the world.

## Requirements

- Represent reader-facing scenes as nodes and choices as edges.
- Allow endings, convergence, loops, and crossings.
- Distinguish intentional loops from likely accidents.
- Support static pre-authored output rather than runtime story generation.
- Keep the graph readable enough for a writer to reason about without becoming a game-dev spreadsheet.
- Link graph nodes back to source files, session points, or authoring views so visual structure and story detail stay connected.
- Keep this idea focused on interactive/Elsewhere publishing; use `graph-*` ideas for the broader author-facing story exploration model.
