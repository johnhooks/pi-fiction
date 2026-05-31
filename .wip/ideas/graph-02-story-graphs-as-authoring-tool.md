---
status: shaping
topic: graph
---

# Story graphs as an authoring tool

## Problem

The story graph idea is larger than choose-your-own-adventure fiction. Branching is part of how writers discover stories even when the final work is linear. A writer may try several openings, alternate character reactions, different reveal timing, parallel scene endings, or whole possible plot routes before choosing the path that becomes the finished story.

In interactive fiction, some branches become reader-facing choices. In ordinary fiction, most branches remain author-facing exploration. The reader sees one selected line, but the writer and agent may need a graph of possibilities to find it.

The risk is overgeneralizing. A graph is a tool, not the best shape for every writing moment. Some scenes need immersion, voice, and uninterrupted drafting. Some problems need a simple conversation, a list, or a direct revision pass. The graph should create freedom and visibility when branching possibilities matter, not impose structure on all fiction work.

## Solution

Treat the story graph as a reusable authoring pattern: a way to explore possible paths, compare directions, walk backward, fork, continue, abandon, or accept. It can support both linear and branching outcomes.

The core idea is:

- branches are **author-facing possibilities** by default
- branches become **reader-facing choices** only for interactive stories
- accepted paths can become canon, manuscript, or published graph
- rejected paths can remain useful history without polluting the final story
- the author can move through possibility space rather than relying on one linear chat thread

This makes the graph extension a story-development tool before it is a CYOA builder. The first implementation might be a lightweight gist story graph using Pi session history and forks. Later implementations might add durable event-sourced records, validation, Mermaid views, exports, and reader-facing Elsewhere stories.

## When a graph helps

A graph is promising when the author wants to:

- explore alternate continuations from the same moment
- test different emotional or plot consequences
- compare multiple possible story lines
- preserve abandoned attempts as useful history
- develop interactive fiction with real reader choices
- see where a story path loops, converges, stalls, or opens up
- separate exploratory drafts from accepted canon

## When a graph may be wrong

A graph may be unnecessary or harmful when the author needs:

- uninterrupted prose drafting
- a focused line edit
- a single direct answer
- emotional immersion rather than structural navigation
- a small scene repair that does not involve alternate paths
- fast creative momentum without managing branches

The framework should invite graph thinking when it helps and stay out of the way when it does not.

## Relationship to other ideas

- `graph-01-story-exploration-extension` is the lightweight first experiment: a gist-level graph using Pi thread history and forking.
- Branching fiction ideas are a specialized export/use case where some graph branches become reader-facing choices.
- Director/Narrator threads may provide a cleaner way to separate control decisions from story continuation.
- Event-sourced graph records may later preserve accepted story state and the history of how it got there.

## Requirements

- Keep the graph concept broader than choose-your-own-adventure publishing.
- Support author-facing branches for ordinary linear story development.
- Allow interactive fiction to promote selected branches into reader-facing choices.
- Make accepted/canon status explicit when durable artifacts exist.
- Preserve abandoned or rejected paths as optional creative history, not clutter.
- Avoid forcing graph structure onto writing tasks that are better served by direct drafting, conversation, or revision.
- Let early versions learn from Pi session history before committing to heavier storage or visualization.
