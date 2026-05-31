---
status: shaping
topic: graph
---

# Graph authoring cockpit

## Problem

A story graph is useful only if it connects the author, the agent, and the actual story material. A Mermaid overview can show topology, but it does not by itself solve the creative navigation problem: how does the author jump from the big picture into a scene or gist, inspect the current path, ask for a targeted continuation, compare alternatives, or regenerate one branch without losing the larger shape?

This applies beyond reader-facing branching fiction. In linear story development, the graph may represent author-facing possibilities. In interactive fiction, some branches may become reader-facing choices. Either way, the graph should help the writer move through story possibilities without turning the process into bookkeeping.

## Solution

Design a Pi-side authoring cockpit for story graphs. It should let the author move through possible paths, see visual and structural feedback, select specific nodes or edges, and ask the agent to work on the precise part of the story that needs attention.

The cockpit does not have to start as a full graphical editor. A useful first version could combine:

- a concise Mermaid overview for topology
- a Pi TUI graph navigator for path movement and node selection
- a detail panel for the selected story point, active path, summaries, incoming links, outgoing possibilities, notes, and warnings
- gist-like cards that present one possible continuation at a time
- commands or actions that send selected-node context to the agent
- generated reports that preserve the map between graph structure and story material

This makes the graph a shared author/agent workspace. The author can jump around and make taste decisions. The agent gets the exact context needed for safe, targeted story work.

The cockpit may also coordinate Director/Narrator modes. A Director mode can manage graph decisions and author intent, while a Narrator mode focuses on writing a clean story continuation for the selected path. The cockpit should make it possible to inspect Narrator output and bring it back into the Director context before accepting it into durable story state.

## Requirements

- Treat graph visualization as an authoring aid, not a default reader-facing feature.
- Support both author-facing exploratory branches and reader-facing interactive branches.
- Expose story point IDs, titles or gists, summaries, active path, source locations when they exist, incoming links, outgoing possibilities, state, notes, and warnings.
- Let the author select a node or edge and ask the agent to expand, revise, connect, validate, summarize, or regenerate that piece.
- Support a possible Director/Narrator split where story drafting can happen in a cleaner narrative context and return results to the control context.
- Keep Mermaid focused on readable flow, not full prose or complete metadata.
- Provide a path from overview to detail so the author does not have to manually hunt through session history, Markdown, JSONL, or data files.
- Start lighter than a full visual editor, but leave room for an interactive workbench if static artifacts and TUI navigation are not enough.
