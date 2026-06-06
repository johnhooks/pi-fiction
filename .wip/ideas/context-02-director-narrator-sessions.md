---
status: shaping
topic: context
---

# Director and narrator sessions

## Problem

Early story building mixes two very different kinds of work. The writer and agent need a place to argue, compare, reject, redirect, and decide what the story might become. The agent also needs a clean place to generate the next piece of story material without being primed by every rejected idea, bookkeeping note, and planning tangent.

The older `../writing` experiment tried to solve this by building Markdown context files, then starting a new thread and asking the agent to load the relevant documents before generating a large episode. That sometimes worked, but it kept record keeping close to the creative act. The agent spent attention finding files, interpreting documents, and managing context before writing.

The new hunch is that planning and generation should be separated earlier and more deliberately. The planning conversation can be messy. The generation conversation should be focused.

## Solution

Use two cooperating session roles:

- **Director session**: the human-facing planning conversation. This is where the writer and agent discuss possibilities, generate options, compare directions, accept or reject ideas, and decide what to ask for next.
- **Narrator session**: the focused generation conversation. This receives a selected context packet and produces the requested story artifact: a character gist, arc option, storyline stage, storyboard beat, scene brief, prose draft, revision pass, or other focused output.

The Director session is the workshop. The Narrator session is the performance space.

The point is not to make the Narrator autonomous. The Director chooses the task, assembles the context, and reviews the result. The Narrator only generates from the crafted packet.

## Workflow

1. The writer and agent discuss story direction in the Director session.
2. Tools generate structured options, such as story gists, character gists, arc possibilities, or scene-board candidates.
3. The Director session stores full JSON artifacts and chosen options as custom entries outside LLM context.
4. When the writer chooses the next creative task, a context builder walks the Director history and selects only relevant accepted artifacts, recent direction, and unresolved questions.
5. The context builder crafts a compact Narrator packet.
6. The Narrator session generates the focused output.
7. The result returns to the Director session for discussion, acceptance, retry, or revision.
8. Durable files are written later during extraction or consolidation, not during the main story-building flow.

## Why this may help

This may reduce contamination between planning and generation. The Director can contain contradictory ideas, discarded options, strategy talk, and record-keeping metadata. The Narrator can receive only the selected story material and the current task.

This may also reduce wasted context. Instead of asking the agent to search files or reread long documents, tools can programmatically select the relevant session artifacts and inject a tight packet.

This is still a hunch. It needs experimentation. The split could be too much ceremony for some writing moments, and some tasks may work better as ordinary conversation.

## Narrator tasks

Narrator does not only mean prose drafting. It means focused generation from a clean packet.

Possible Narrator tasks:

- generate story, character, world, style, arc, or scene options
- develop the next storyline stage
- turn an arc stage into storyboard beats
- draft a scene from a scene brief
- audition dialogue or character voice
- revise a selected passage against a specific direction
- summarize a branch or attempt for the Director

Each task should have a clear expected output shape. Many can use TypeBox schemas so tools can validate and save results without asking the agent to manage records manually.

## Session artifacts

The Director session should store structured artifacts as custom entries that do not automatically enter LLM context. This keeps the planning record durable without stuffing every option into every generation prompt.

Examples:

```json
{
  "artifactType": "gist.optionSet",
  "kind": "arc",
  "input": "The investigation needs a false suspect path",
  "optionSet": { "options": [] }
}
```

```json
{
  "artifactType": "gist.choice",
  "optionSetId": "gist_123",
  "selectedOptionId": "logs-too-neat",
  "status": "accepted"
}
```

The Narrator packet is built from selected artifacts, not from the entire Director transcript.

## Relationship to files

Durable project files still matter. Character records, arc notes, scene briefs, and story exports may eventually need to exist outside the session.

But file writing should be a consolidation step, not the default shape of early story building. First the story develops in conversation and structured session artifacts. Later, a tool or agent-assisted extraction pass walks the session JSONL and writes durable files.

## Relationship to graph ideas

This idea is not a graph feature. A story graph can be built on top of it later.

The graph work may use Director artifacts, Narrator outputs, session forks, and accepted choices to show paths through a story. But the Director/Narrator split is more fundamental: it separates planning context from focused generation context.

## Requirements

- Keep the Director session as the place for human/agent planning, comparison, rejection, and decision-making.
- Keep the Narrator session focused on generating one requested story artifact from a compact context packet.
- Store generated option sets, choices, and outputs as structured custom entries outside default LLM context.
- Build Narrator context packets programmatically from selected Director artifacts.
- Return Narrator output to the Director session for review before treating it as accepted.
- Avoid file reading/writing during early creative flow unless the user explicitly wants consolidation.
- Support ordinary single-thread conversation when a two-session workflow would be too much ceremony.
- Treat this as an experiment, not proof that it produces better fiction.
