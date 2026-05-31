---
status: shaping
topic: context
---

# Session artifacts for story building

## Problem

The original branching-fiction idea exposed a broader problem in AI-assisted fiction work: story development often gets buried under file management, context loading, and record keeping. The older `../writing` approach created useful Markdown documents for characters, worlds, arcs, and story state, but the agent often had to spend creative attention finding files, reading them, updating them, and reconciling stale context before it could write or think about the story.

That may be the wrong center of gravity for early story building. During premise, character, arc, and storyline discovery, the agent should be focused on the fiction: what is alive, what changes, what pressure appears, what possibility is worth following. It should not be acting primarily as a filing clerk.

We need a way to treat the Pi conversation itself as the first story-building artifact, while still preserving structured decisions that can later become durable project files.

## Solution

Use the Pi session history as the initial authoring substrate. During early story building, commands such as `/gist` and future arc/storyline tools generate structured JSON artifacts, save those artifacts into the session history, and let the visible conversation stay focused on story development.

The core pattern:

1. The writer and agent discuss a story possibility in normal conversation.
2. A focused tool generates a structured option set, such as story gists, character gists, arc options, or possible next storyline stages.
3. The tool stores the full JSON option set in the Pi session as a custom entry that does not enter LLM context.
4. When the writer chooses an option, the tool stores the selected choice, preserving both the chosen path and the alternatives.
5. The agent continues from a compact story-facing prompt rather than from file-management instructions.
6. Later, when the story direction is strong enough, a separate extraction phase walks the session JSONL, collects the important artifacts, and writes durable files or records.

This separates creative development from record keeping. Story planning can happen in the conversation flow; extraction and persistence can happen afterward.

## Context discipline

The agent-visible context should stay tight and story-facing. Instead of asking the agent to search for files or load large documents, the extension can programmatically find relevant session artifacts and inject only the useful pieces before the next creative move.

For example, before continuing an arc, the extension might gather:

- accepted story premise gist
- selected character gists
- accepted arc stages
- unresolved questions
- current storyline stage
- human direction from the latest conversation

The agent sees the story and its evolution, not the bookkeeping process used to find it.

This is especially important for a future Director/Narrator split. The Narrator context should be primed with story material, not instructions about where files live or how to update them.

## Artifact storage

Pi supports custom session entries that persist in the session JSONL but do not participate in LLM context. These are a good fit for full structured artifacts.

Possible custom entries:

```json
{
  "artifactType": "gist.optionSet",
  "id": "gist_abc123",
  "kind": "arc",
  "input": "WordPress murder mystery in wp-admin",
  "optionSet": { "kind": "arc", "options": [] }
}
```

```json
{
  "artifactType": "gist.choice",
  "optionSetId": "gist_abc123",
  "selectedOptionId": "false-suspect-path"
}
```

Saving the whole option set matters because rejected paths are still useful. A later tool can reload the option set, choose differently, fork the session from that point, compare alternatives, or explain how the accepted path emerged.

## Extraction phase

Durable story files should be produced after the creative session has generated enough useful material. The extraction phase can be programmatic, agent-assisted, or both.

It may:

- walk the session JSONL
- collect selected story, character, world, arc, storyline, and scene artifacts
- ignore rejected material unless requested
- preserve useful alternatives as notes or history
- write Markdown, JSON, JSONL, or other project files
- prepare static export data for Elsewhere or other renderers

This phase is intentionally separate from story building. The writer should not have to stop the creative flow so the agent can manage files.

## Relationship to graph ideas

This idea supports the broader story graph direction. Pi's session tree already captures forks and alternate paths. Structured custom entries can mark the meaningful story artifacts within that tree. Later, graph tools can walk the conversation tree and artifact entries to construct a visible story graph, compare paths, or export accepted branches.

For ordinary linear fiction, the graph may remain author-facing exploration. For reader-facing branching fiction, selected paths can later become publishable choices. In both cases, the first source of truth during discovery can be the Pi session history.

## Requirements

- Treat the Pi session as the first story-building artifact during early development.
- Store full generated option sets and selected choices as structured custom entries outside LLM context.
- Keep visible agent prompts focused on story development rather than file management.
- Preserve rejected or unchosen options so they can be revisited, compared, or forked later.
- Provide tools that can walk the current session branch and extract accepted artifacts.
- Programmatically assemble tight story-facing context before continuing story evolution.
- Defer durable file writing until an extraction or consolidation phase.
- Keep the approach experimental; verify that session-centered story building improves flow before making it the only path.
