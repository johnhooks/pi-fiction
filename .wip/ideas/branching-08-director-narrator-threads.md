---
status: parked
topic: branching
---

# Director and narrator threads for branching fiction

## Problem

Branching fiction authoring pulls the agent in two different directions. The story needs immersive continuation, voice, texture, and momentum. The authoring process needs planning, graph navigation, rejected options, state notes, validation warnings, file paths, and human taste decisions.

The broader reusable version of this idea lives in `graph-03-director-narrator-workflow`. This branching-specific version is parked for now; keep it as reference if the general Director/Narrator workflow later needs Elsewhere-specific behavior.

A single conversation mixes those modes together. The agent sees story prose beside scaffolding, corrections, implementation details, and discarded ideas. That can weaken the next story continuation and make the transcript difficult to treat as a clean branch of fiction.

The hunch is that the story may draft better if one thread is allowed to behave like the story itself, while another thread manages direction, structure, and decisions. A lighter first version of the same idea may use Pi's existing thread tree as a gist-level story exploration graph before introducing separate durable graph records.

## Solution

Explore a multi-thread authoring model with at least two roles:

- **Director thread**: the human-facing control conversation. It handles intention, taste, graph decisions, validation, branch summaries, node selection, state, and what should happen next.
- **Narrator thread**: the story-performing conversation. It is primed to continue the current branch as fiction. Assistant messages in this thread are treated as story draft material, not as meta-discussion.

The Director can launch, fork, resume, or steer Narrator threads. A Narrator thread may correspond to a current path through the story graph or to a candidate branch being explored. When the Narrator writes a useful continuation, the result needs to come back into the Director thread as visible material: an excerpt, full scene, choices, summary, graph deltas, or proposed source edits.

This creates a modal workflow:

1. In Director mode, the author chooses what branch, node, tone, clue, or problem to work on.
2. The extension builds a compact direction packet for the Narrator: current path, story-so-far, constraints, state, and desired next move.
3. In Narrator mode, the story is continued with minimal visible scaffolding.
4. The author can inspect the Narrator output, cycle alternatives, or fork a new Narrator attempt.
5. The chosen output is inserted or summarized back into the Director thread so the controlling conversation knows what happened.
6. The durable story graph and files are updated only when the author accepts the result.

## Modal switching

The author should be able to see and move between modes without losing orientation.

Possible Pi interactions:

- `/branching director` returns to the control thread.
- `/branching narrate` opens or resumes the Narrator thread for the selected node/path.
- `/branching fork` creates a new Narrator attempt from the current branch point.
- `/branching bring-back` inserts the latest Narrator output into the Director thread as an excerpt plus summary.
- `/branching accept` promotes Narrator output into the story graph/files.
- `/branching abandon` leaves the Narrator attempt as history but does not update the graph.

The UI should make the active mode obvious. In Director mode, show graph position, branch summary, warnings, and actions. In Narrator mode, show the current story path and the latest prose, with as little meta-noise as practical.

## Requirements

- Keep the Director thread free to discuss structure, taste, validation, and decisions.
- Keep Narrator threads focused on story continuation so assistant messages can function as draft fiction.
- Insert or summarize Narrator output back into the Director thread so the control conversation has awareness of what was written.
- Treat Narrator output as draft material until the author accepts it into durable story artifacts.
- Allow forks for alternate continuations from the same branch point.
- Avoid making Pi session history the only source of truth after consolidation; accepted material should become graph/files that can be validated and exported.
- Preserve author visibility: the human must be able to inspect the Narrator thread, not just receive opaque generated output.
- Keep this model lightweight enough that it supports story flow rather than becoming session-management bureaucracy.
