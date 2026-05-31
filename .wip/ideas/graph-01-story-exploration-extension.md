---
status: shaping
topic: graph
---

# Gist story graph extension

## Problem

Branching structure is useful even when the final story is not choose-your-own-adventure fiction. Writers discover stories by trying paths: alternate openings, different character reactions, earlier or later reveals, changed endings, tonal variants, and branches that are abandoned after they teach something.

In reader-facing branching fiction, the branch choices become part of the published experience. In ordinary linear fiction, the branches are usually author-facing only. The reader sees one selected path, but the writer may need to explore many.

`pi-fiction` needs a graph-oriented authoring extension that treats story development as a living exploration of possible paths, not merely as a linear chat or a static outline. The broader authoring philosophy is captured in `graph-02-story-graphs-as-authoring-tool`; this idea focuses on the first lightweight experiment.

## Solution

Design the first version of a `graph` extension as a **gist story graph**: a lightweight mode for roughing out a story with compact scene/beat gists instead of full prose. The extension should let the author build a story as a graph of possible continuations, move around the graph, fork from earlier points, compare directions, and decide which path is worth continuing.

This first version can lean on Pi's own session history and forking behavior rather than immediately saving records to a separate story file.

In this first mode, the graph is primarily the Pi thread tree:

- assistant messages propose story gists, beats, or next-stage summaries
- user messages choose, redirect, or ask for alternatives
- forks represent alternate possible story paths
- walking back to an earlier message creates a new branch of exploration
- the extension helps summarize the active path and present the next focused option

This makes the graph extension useful before we solve durable storage, export formats, or full branching-fiction publishing. It can teach us how authors actually want to move through a possibility space.

## Gist story graph

A gist story graph should favor speed and discovery over completeness.

The interaction could look like:

1. The author starts with a premise or rough situation.
2. The extension asks for or generates a compact current-story gist.
3. The agent proposes one possible next stage at a time, using a card-like UI inspired by the existing gist TUI.
4. The author can accept, cycle, revise, fork, or walk back.
5. The active path can be summarized as a story-so-far chain.
6. Interesting abandoned paths can remain in session history without becoming canon.

The result is not yet a manuscript or exportable interactive story. It is a navigable exploration of what the story could become.

## Relationship to branching fiction

This prototype supports the broader story graph concept and generalizes the choose-your-own-adventure work.

For linear fiction, branches are author-facing exploration. The final export may choose one path.

For interactive fiction, branches can become reader-facing choices. The final export may include many accepted paths and choice edges.

The same underlying authoring move matters in both cases: create a possible continuation, see where it goes, then decide whether to continue, fork, revise, or abandon.

## Requirements

- Support graph-like story exploration without requiring a separate durable graph file in the first version.
- Allow Director/Narrator modes to be tested lightly without requiring separate threads in the first version.
- Use Pi session history and forking as the initial graph substrate.
- Favor compact gists, scene summaries, or beat-level continuations before full prose drafting.
- Let the author walk backward, fork, and try a different continuation from the same point.
- Present possibilities one focused option at a time rather than overwhelming the author with a giant menu.
- Maintain an active path summary so the author and agent know what story line is currently being explored.
- Keep accepted/canon status lightweight at first; do not require a full persistence model before learning from the interaction.
- Leave room for later promotion into durable event-sourced graph records, validation, Mermaid views, and Elsewhere export.
